import { GoogleGenerativeAI } from "@google/generative-ai"
import "dotenv/config"

const API_KEY = process.env.API_KEY
console.log(API_KEY)
const genAI = new GoogleGenerativeAI(API_KEY!)

const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash-preview-tts" })

async function run() {
  const response = await model.generateContent("atual tecnico da seleção brasileira de futebol? nao e o carlo ancelotti?")
  console.log(response.response.text())
}

run()