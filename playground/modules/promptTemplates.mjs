import { config } from "dotenv";
import { PromptTemplate } from "langchain/prompts";
import { OpenAI } from "langchain/llms/openai";
import { LLMChain } from "langchain/chains";

config();

// Now you can access your environment variables
const openaiApiKey = process.env.OPENAI_API_KEY;

// 1. Prompt templates
const template =
  "You are a director of social media with 30 years of experience. Please give me some ideas for a content I should write about regarding {topic}. The content is for {socialplatform}. Translate to {language}.";

const prompt = new PromptTemplate({
  template,
  inputVariables: ["topic", "socialplatform", "language"],
});

const formattedPromptTemplate = await prompt.format({
  topic: "artificial intelligence",
  socialplatform: "twitter",
  language: "czech",
});

console.log({ formattedPromptTemplate });

const model = new OpenAI({ temperature: 0.9, apiKey: openaiApiKey });
const chain = new LLMChain({ prompt, llm: model });

const resChain = await chain.call({
  topic: "artificial intelligence",
  socialplatform: "twitter",
  language: "czech",
});

console.log({ resChain });

export default resChain;
