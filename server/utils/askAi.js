
// server/utils/askAi.js
//
// Simple helper that sends chat-style messages to OpenRouter and returns
// the AI's text response as a string (used by JSON.parse(...) in the
// interview controller, so the prompt must instruct the model to return
// raw JSON only).

const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;
const MODEL = process.env.OPENROUTER_MODEL || "openai/gpt-4o-mini";

export const askAi = async (messages) => {
  if (!OPENROUTER_API_KEY) {
    throw new Error(
      "OPENROUTER_API_KEY is missing. Check your server/.env file."
    );
  }

  const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${OPENROUTER_API_KEY}`,
    },
    body: JSON.stringify({
      model: MODEL,
      messages,
      temperature: 0.7,
    }),
  });

  if (!response.ok) {
    const errText = await response.text();
    throw new Error(`OpenRouter API error (${response.status}): ${errText}`);
  }

  const data = await response.json();
  let content = data?.choices?.[0]?.message?.content;

  if (!content) {
    throw new Error("OpenRouter returned no content.");
  }

  // Models sometimes wrap JSON in ```json fences despite instructions — strip them.
  content = content.replace(/```json|```/g, "").trim();

  return content;
};