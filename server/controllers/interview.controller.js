// ⚠️ CHECK THESE IMPORT PATHS match your actual project structure
import User from "../models/user.model.js";
import Interview from "../models/interview.model.js";
import { askAi } from "../utils/askAi.js"; // adjust path/name if different

// ---------------------------------------------------------------
// POST /api/interview/generate-questions
// ---------------------------------------------------------------
export const generateQuestion = async (req, res) => {
  try {
    let { role, experience, mode, resumeText, projects, skills } = req.body;
    role = role?.trim();
    experience = experience?.trim();
    mode = mode?.trim();

    if (!role || !experience || !mode) {
      return res
        .status(400)
        .json({ message: "Role, Experience and mode are required." });
    }

    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    const messages = [
      {
        role: "system",
        content: `You are an expert technical interviewer.
Generate a list of interview questions based on the candidate's role, experience level, and interview mode.

Return strictly JSON in this format (an array of question objects, no extra text):
[
  {
    "question": "string",
    "difficulty": "easy" | "medium" | "hard",
    "timeLimit": number (in seconds)
  }
]

Guidelines:
- Generate 5 questions relevant to the given role and experience level.
- Difficulty progression across the 5 questions: easy, easy, medium, medium, hard.
- If mode is "technical", focus on technical/domain-specific questions.
- If mode is "behavioral" or "hr", focus on behavioral/soft-skill questions.
- If resume details, projects, or skills are provided, incorporate relevant context into the questions.`,
      },
      {
        role: "user",
        content: `Role: ${role}
Experience: ${experience}
Mode: ${mode}
Skills: ${Array.isArray(skills) ? skills.join(", ") : skills || "N/A"}
Projects: ${Array.isArray(projects) ? projects.join(", ") : projects || "N/A"}
Resume Summary: ${resumeText || "N/A"}`,
      },
    ];

    const aiResponse = await askAi(messages);
    const questionsArray = JSON.parse(aiResponse);

    const safeResume = resumeText || "";

    const interview = await Interview.create({
      user: user._id, // ✅ fixed: was "userId", schema field is "user"
      role,
      experience,
      mode,
      resumeText: safeResume,
      questions: questionsArray.map((q) => ({
        question: q.question,
        difficulty: q.difficulty,
        timeLimit: q.timeLimit,
      })),
    });

    user.credits -= 50;
    await user.save();

    return res.json({
      interviewId: interview._id,
      questions: interview.questions,
      creditsleft: user.credits,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message });
  }
};

// ---------------------------------------------------------------
// POST /api/interview/submit-answer
// ---------------------------------------------------------------
export const submitAnswer = async (req, res) => {
  try {
    const { interviewId, questionIndex, answer, timeTaken } = req.body;

    const interview = await Interview.findById(interviewId);
    if (!interview) {
      return res.status(404).json({ message: "Interview not found." });
    }

    const question = interview.questions[questionIndex];
    if (!question) {
      return res.status(400).json({ message: "Invalid question index." });
    }

    // If no answer submitted
    if (!answer) {
      question.score = 0;
      question.feedback = "You did not submit an answer.";
      question.answer = "";
      await interview.save();

      return res.json({ feedback: question.feedback });
    }

    const messages = [
      {
        role: "system",
        content: `You are a professional human interviewer evaluating a candidate's answer in a real interview.

Evaluate naturally and fairly, like a real person would.

Score the answer in these areas (0 to 10):
1. Confidence — Does the answer sound clear, confident, and well-presented?
2. Communication — Is the language simple, clear, and easy to understand?
3. Correctness — Is the answer accurate, relevant, and complete?

Rules:
- Be realistic and unbiased.
- Do not give random high scores.
- If the answer is weak, score low.
- If the answer is strong and detailed, score high.
- Consider clarity, structure, and relevance.

Calculate:
finalScore = average of confidence, communication, and correctness (rounded to nearest whole number).

Feedback Rules:
- Write natural human feedback.
- 10 to 15 words only.
- Sound like real interview feedback.
- Can suggest improvement if needed.
- Do NOT repeat the question.
- Do NOT explain scoring.
- Keep tone professional and honest.

Return ONLY valid JSON in this format:
{
  "confidence": number,
  "communication": number,
  "correctness": number,
  "finalScore": number,
  "feedback": "short human feedback"
}`,
      },
      {
        role: "user",
        content: `Question: ${question.question}
Candidate's Answer: ${answer}
Time Taken: ${timeTaken ?? "N/A"} seconds`,
      },
    ];

    const aiResponse = await askAi(messages);
    const evaluation = JSON.parse(aiResponse);

    question.answer = answer;
    question.timeTaken = timeTaken;
    question.confidence = evaluation.confidence;
    question.communication = evaluation.communication;
    question.correctness = evaluation.correctness;
    question.score = evaluation.finalScore;
    question.feedback = evaluation.feedback;

    await interview.save();

    return res.json({
      score: question.score,
      feedback: question.feedback,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message });
  }
};

// ---------------------------------------------------------------
// POST /api/interview/finish
// ---------------------------------------------------------------
export const finishInterview = async (req, res) => {
  try {
    const { interviewId } = req.body;

    const interview = await Interview.findById(interviewId);
    if (!interview) {
      return res.status(400).json({ message: "Failed to find interview." });
    }

    const totalQuestions = interview.questions.length;

    let totalScore = 0;
    let totalConfidence = 0;
    let totalCommunication = 0;
    let totalCorrectness = 0;

    interview.questions.forEach((q) => {
      totalScore += q.score || 0;
      totalConfidence += q.confidence || 0;
      totalCommunication += q.communication || 0;
      totalCorrectness += q.correctness || 0;
    });

    const finalScore = totalQuestions ? totalScore / totalQuestions : 0;
    const avgConfidence = totalQuestions ? totalConfidence / totalQuestions : 0;
    const avgCommunication = totalQuestions
      ? totalCommunication / totalQuestions
      : 0;
    const avgCorrectness = totalQuestions
      ? totalCorrectness / totalQuestions
      : 0;

    interview.finalScore = finalScore;
    interview.avgConfidence = avgConfidence;
    interview.avgCommunication = avgCommunication;
    interview.avgCorrectness = avgCorrectness;
    interview.status = "completed";

    await interview.save();

    return res.json({
      finalScore,
      avgConfidence,
      avgCommunication,
      avgCorrectness,
      status: interview.status,
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "An error occurred while finishing the interview." });
  }
};

// ---------------------------------------------------------------
// POST /api/interview/analyze-resume
// ---------------------------------------------------------------
// Requires: npm install pdf-parse multer
export const analyzeResume = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No resume file uploaded." });
    }

    let extractedText = "";

    if (req.file.mimetype === "application/pdf") {
      const pdfParse = (await import("pdf-parse")).default;
      const data = await pdfParse(req.file.buffer);
      extractedText = data.text;
    } else {
      // .doc/.docx not handled here — add mammoth or similar if needed
      return res.status(400).json({
        message: "Only PDF resumes are supported right now.",
      });
    }

    return res.json({
      text: extractedText,
      fileName: req.file.originalname,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message });
  }
};