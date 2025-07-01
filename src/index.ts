// src/index.ts
import "dotenv/config";
import { runGeminiAssistant } from "./llm/runGeminiAssistant";


async function main() {
  const message = "Hello, Olujimi. What is the balance of 0xAbC123456789...?";

  try {
    const result = await runGeminiAssistant(message);
    console.log("🧠 Final response:", result);
  } catch (err) {
    console.error("❌ Error running Gemini assistant:", err);
  }
}

main();
