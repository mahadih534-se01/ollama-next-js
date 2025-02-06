import ollama from "ollama";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { message } = req.body;

    const response = await ollama.chat({
      model: "llama3.2",
      messages: [{ role: "user", content: message }],
    });

    return res.status(200).json({ message: response.message.content });
  } catch (error) {
    console.error("Ollama API error:", error);
    return res.status(500).json({ error: "Failed to get response from LLM" });
  }
}
