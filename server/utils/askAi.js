import axios from "axios";

const apiKey = process.env.OPENROUTER_API_KEY;

export const askAi = async (messages) => {
  try {
    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      throw new Error("messages array is empty");
    }

    if (!apiKey) {
      throw new Error("OPENROUTER_API_KEY is missing. Check your server/.env file.");
    }

    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "openai/gpt-4o-mini",
        messages: messages,
      },
      {
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
      }
    );

    const content = response?.data?.choices?.[0]?.message?.content;

    if (!content || !content.trim()) {
      throw new Error("AI returned empty response");
    }

    return content;
  } catch (error) {
    console.error("askAi error:", error?.response?.data || error.message);
    throw error;
  }
};