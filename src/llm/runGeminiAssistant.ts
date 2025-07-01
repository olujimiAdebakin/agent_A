// src/llm/runGeminiAssistant.ts
// import { geminiModel } from "./geminiClient";
import { tools } from "../tools/allTools";
import { geminiModel } from "./geminiClient";

export async function runGeminiAssistant(message: string) {
  const prompt = `
You are Olujimi Adebakin, an onchain AI assistant. You have access to the following tools:
- get_balance(wallet: Address): returns ETH balance.

Given the message: "${message}"

Respond only with a JSON object like:
{
  "tool": "get_balance",
  "args": { "wallet": "0x..." }
}
`;

  const result = await geminiModel.generateContent(prompt);
  const response = await result.response.text();

  try {
    const parsed = JSON.parse(response);
    const tool = tools[parsed.tool];
    if (!tool) throw new Error("Tool not found");

    const output = await tool.handler(parsed.args);
    return output;
  } catch (err) {
    return `❌ Failed to execute tool: ${err}`;
  }
}
