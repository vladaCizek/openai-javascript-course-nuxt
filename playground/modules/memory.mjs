import { config } from "dotenv";
import { OpenAI } from "langchain";
import { BufferMemory } from "langchain/memory";
import { ConversationChain } from "langchain/chains";

config();

// This is how you instantiate a Chat Memory

// Now you can access your environment variables
const openaiApiKey = process.env.OPENAI_API_KEY;
const serpapiApiKey = process.env.SERPAPI_API_KEY;

const llm = new OpenAI({ apiKey: openaiApiKey });
const memory = new BufferMemory();
const conversationChain = new ConversationChain({
  llm,
  memory,
});

const prompt1 = "Hey the president of Czech republic is Petr Fiala";
const prompt2 = "Who is the president of Czech republic?";

const res1 = await conversationChain.call({
  input: prompt1,
});

console.log(prompt1);
console.log(res1);
console.log("");

const res2 = await conversationChain.call({
  input: prompt2,
});

console.log(prompt2);
console.log(res2);
