import "dotenv/config";


import OpenAI from "openai";
import {createAssistant} from "./openai/createAssistant";
import {createRun} from "./openai/createRun";
import { createThread } from "./openai/createThread";
import { performRun} from "./openai/performRun";


async function main() {
  try {
    const client = new OpenAI();
    const message = "Hello, Olujimi";

    const assistant = await createAssistant(client);
    const thread = await createThread(client, message);
    const run = await createRun(client, thread, assistant.id);
    const result = await performRun(run, client, thread);

    console.log("🧠 Final response:", result);
  } catch (err) {
    console.error("❌ Error running assistant:", err);
  }
}

main()