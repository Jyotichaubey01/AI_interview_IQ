import mongoose from "mongoose";

const answerSchema = new mongoose.Schema(
  {
    question: {
      type: String,
      required: true,
    },
    answer: {
      type: String,
      default: "",
    },
    aiFeedback: {
      type: String,
      default: "",
    },
    score: {
      type: Number,
      default: 0,
    },
  },
  { _id: false }
);

const questionSchema = new mongoose.Schema(
  {
    question: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      default: "Technical",
    },
  },
  { _id: false }
);

const interviewSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    role: {
      type: String,
      required: true,
      trim: true,
    },

    experience: {
      type: String,
      required: true,
    },

    interviewType: {
      type: String,
      enum: [
        "Technical Interview",
        "HR Interview",
        "Behavioural Interview",
        "System Design Interview",
      ],
      default: "Technical Interview",
    },

    resumeUrl: {
      type: String,
      default: "",
    },

    resumeName: {
      type: String,
      default: "",
    },

    questions: [questionSchema],

    answers: [answerSchema],

    totalScore: {
      type: Number,
      default: 0,
    },

    overallFeedback: {
      type: String,
      default: "",
    },

    status: {
      type: String,
      enum: ["Pending", "In Progress", "Completed"],
      default: "Pending",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Interview", interviewSchema);