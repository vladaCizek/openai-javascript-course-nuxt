import { config } from "dotenv";
import { OpenAI } from "langchain/llms/openai";
import { SerpAPI } from "langchain/tools";
import { Calculator } from "langchain/tools/calculator";
import { initializeAgentExecutorWithOptions } from "langchain/agents";

config();

// Now you can access your environment variables
const openaiApiKey = process.env.OPENAI_API_KEY;
const serpapiApiKey = process.env.SERPAPI_API_KEY;

// Agents
// Agent = taks + tools => it figures out what to do

// Define agent's model
const agentModel = new OpenAI({
  temperature: 0,
  modelName: "gpt-3.5-turbo",
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

// Then our agents needs an executor
const executor = await initializeAgentExecutorWithOptions(tools, agentModel, {
  agentType: "zero-shot-react-description", // default model
  verbose: true, // see the log of what the agent is thinking
  maxIterations: 5,
});

const input = "What is langchain";

const result = await executor.call({ input });
console.log({ result });
