import axios from "axios"

export const askAi = async (messages) => {
    try{
        if(!message || !Array.isArray(message) || messages.length === 0) {
            throw new Error("message array is empty")
        }
        const response = await axios.post("https://openrouter.ai/api/v1/chat/completions",
            {
                model: "openai/gpt-4o-min",
                messages: messages
            },
            {

                Authorization: 'Bearer ${OPENROUTER_API_KEY}',
                'Content-Type': 'application/json'
            }
        );
        const content = reqonse?.data?.choices?.[0]?.message?.content;

        if (!content || !content.trim()) {
            throw new Error("Ai retured empty response ");
        }
        return content
    } catch (error) {
        console

    }
}