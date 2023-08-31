import { OpenAI } from "langchain/llms/openai";
import { BufferMemory } from "langchain/memory";
import { ConversationChain } from "langchain/chains";

let model, memory, chain;

const initChain = () => {
  console.log("Initializing chain");
  model = new OpenAI({});
  memory = new BufferMemory();
  chain = new ConversationChain({ llm: model, memory });
};

// The point of a memory is to initialize chain when receiving first prompt
// but than just reuse the instance

export default defineEventHandler(async (event) => {
  if (event.node.req.method === "POST") {
    const { prompt, firstMessage } = await readBody(event);

    if (!prompt) {
      throw createError({
        statusCode: 400,
        statusMessage: "No input!",
      });
    }

    if (firstMessage) {
      initChain();
    }

    const { response } = await chain.call({ input: prompt });
    return {
      response,
    };
  }
  throw createError({
    statusCode: 500,
    statusMessage: "Only POST are allowed",
  });
});
