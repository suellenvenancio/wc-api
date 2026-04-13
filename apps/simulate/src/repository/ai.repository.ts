import { GoogleGenerativeAI } from "@google/generative-ai"
import dotenv from "dotenv"

dotenv.config()
const API_KEY = process.env.GEMINI_API_KEY
console.log(API_KEY)
const genAI = new GoogleGenerativeAI(API_KEY!)

async function getByPrompt(prompt: string) {
  const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" })

  const result = await model.generateContent(prompt)

  return result.response
}

const aiRepository = {
  getByPrompt,
}

export default aiRepository
