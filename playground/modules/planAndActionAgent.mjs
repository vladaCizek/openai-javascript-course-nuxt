import { config } from "dotenv";
import { SerpAPI } from "langchain/tools";
import { Calculator } from "langchain/tools/calculator";
import { initializeAgentExecutorWithOptions } from "langchain/agents";
import { ChatOpenAI } from "langchain/chat_models/openai";
import { PlanAndExecuteAgentExecutor } from "langchain/experimental/plan_and_execute";
config();

// This one is great, because we don't have to tell them how to do it

// Now you can access your environment variables
const openaiApiKey = process.env.OPENAI_API_KEY;
const serpapiApiKey = process.env.SERPAPI_API_KEY;

// Define agent's model
const chatModel = new ChatOpenAI({
  temperature: 0,
  modelName: "gpt-3.5-turbo",
  verbose: true,
  maxRetries: 3,
});

// define agent's tools
const tools = [
  new SerpAPI(serpapiApiKey, {
    location: "Dallas,Texas,United States",
    hl: "en",
    gl: "us",
  }),
  new Calculator(),
];

const executor = PlanAndExecuteAgentExecutor.fromLLMAndTools({
  llm: chatModel,
  tools,
});

const result = await executor.call({
  input:
    "Who is the current president of Czech republic and what is their age raised to second power?",
});

console.log({ result });
