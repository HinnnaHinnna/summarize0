export default async function handler(req, res) {
  const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

  if (!OPENAI_API_KEY) {
    return res.status(500).json({ error: 'API key not found' });
  }

  const { inputText, prompt } = req.body;

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo", // 또는 'gpt-4' 가능
        messages: [
          { role: "system", content: prompt },
          { role: "user", content: inputText }
        ],
        max_tokens: 600,
        temperature: 0.7,
      }),
    });

    const data = await response.json();
    res.status(200).json({ result: data.choices?.[0]?.message?.content });

  } catch (error) {
    res.status(500).json({ error: error.toString() });
  }
}
