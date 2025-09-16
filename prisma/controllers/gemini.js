/** @type {import('@google/generative-ai').GoogleGenerativeAI} */
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export const gemini = async (req, res) => {
  const { title } = req.body;
  if (!title) return res.status(400).json({ error: "Title is required" });

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
    const result = await model.generateContent(
      `Generate a task description for: "${title}"`
    );
    const response = await result.response;
    const description = response.text();
    res.json({ description });
  } catch (err) {
    console.error("Gemini API Error:", err);
    res
      .status(500)
      .json({ error: err.message || "Failed to generate description" });
  }
};
