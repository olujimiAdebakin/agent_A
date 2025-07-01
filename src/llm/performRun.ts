// import OpenAI from "openai";
// import { Run } from "openai/resources/beta/threads/runs/runs";
// import { Thread } from "openai/resources/beta/threads/threads";
// import { handleRunToolCall } from "./handleRunToolCall.js";


// export async function performRun(run: Run, client: OpenAI, thread: Thread) {
//     console.log(`🚀 Performing run ${run.id}`);
  
//     while (run.status === "requires_action") {
//       run = await handleRunToolCall(run, client, thread); // ✅ Fixed here
//     }
  
//     if (run.status === "in_progress" || run.status === "queued") {
//       await new Promise(resolve => setTimeout(resolve, 1000));
//     }
  
//     if (run.status === "failed") {
//       const errorMessage = `I encountered an error: ${run.last_error?.message || "Unknown error"}`;
//       console.error('Run failed:', run.last_error?.message || "Unknown error");
  
//       await client.beta.threads.messages.create(thread.id, {
//         role: "assistant",
//         content: errorMessage,
//       });
  
//       return {
//         type: 'text',
//         text: {
//           value: errorMessage,
//           annotations: [],
//         },
//       };
//     }
  
//     const messages = await client.beta.threads.messages.list(thread.id); // ✅ thread.id is correct here

//     messages.data.forEach(msg => {
//         console.log(`[${msg.role}]: ${msg.content.map(c => ('text' in c ? c.text.value : '')).join(' ')}`);
//       });
      
//     const assistantMessage = messages.data.find(
//       (message) => message.role === "assistant"
//     );
  
//     console.log(`🚀 Assistant message: ${assistantMessage?.content[0]}`);
  
//     return (
//       assistantMessage?.content[0] || {
//         type: "text",
//         text: { value: "No response from assistant", annotations: [] },
//       }
//     );
//   }
  