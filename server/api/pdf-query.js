// local imports
import { OpenAI } from "langchain/llms/openai";
import { pineconeClientInit } from "../helpers/pineconeClient";
import { VectorDBQAChain } from "langchain/chains";
import { PineconeStore } from "langchain/vectorstores/pinecone";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const body = await readBody(event);

  const req = event.node.req;
  const res = event.node.res;
  const { input } = body;

  if (req.method !== "POST") {
    throw new Error({
      statusCode: 500,
      statusMessage: "Method not allowed",
    });
  }

  if (!input?.length) {
    throw new Error({
      statusCode: 500,
      statusMessage: "Input cannot be empty",
    });
  }

  try {
    // initiate database client: Pinecone
    const { pineconeClient, pineconeIndex } = await pineconeClientInit(
      config.pineconeApiKey,
      config.pineconeEnvironment,
      config.pineconeIndex
    );

    // Search
    const vectorStore = await PineconeStore.fromExistingIndex(
      new OpenAIEmbeddings(),
      {
        pineconeIndex,
      }
    );
    const model = new OpenAI();
    const chain = VectorDBQAChain.fromLLM(model, vectorStore, {
      k: 1,
      returnSourceDocuments: true,
    });

    const results = await chain.call({ query: input });
    console.log(results);
    return results;
  } catch (error) {
    throw new Error({
      statusCode: 500,
      statusMessage: error,
    });
  }
});
