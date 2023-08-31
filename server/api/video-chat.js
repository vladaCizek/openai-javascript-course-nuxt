import { YoutubeTranscript } from "youtube-transcript";
import { ChatOpenAI } from "langchain/chat_models/openai";
import { HNSWLib } from "langchain/vectorstores/hnswlib";
import { ChatMessage } from "langchain/schema";

// local imports
import { throwError } from "../helpers/throwError";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { ConversationalRetrievalQAChain } from "langchain/chains";

// constants
import { ROLES } from "../../constants";

// Global variables
let chain;
let chatHistory = [];

// DO THIS SECOND
const initializeChain = async (initialPrompt, transcript) => {
  try {
    const model = new ChatOpenAI({
      temperature: 0.8,
      modelName: "gpt-3.5-turbo",
    });

    // HNSWLib
    const vectorStore = await HNSWLib.fromDocuments(
      [{ pageContent: transcript }],
      new OpenAIEmbeddings()
    );

    // const directory = "./db"; // this saves relative to root

    // await vectorStore.save(directory);

    // const loadedVectorStore = await HNSWLib.load(
    //   directory,
    //   new OpenAIEmbeddings()
    // );

    chain = ConversationalRetrievalQAChain.fromLLM(
      model,
      vectorStore.asRetriever(),
      {
        verbose: true,
      }
    );

    const response = await chain.call({
      question: initialPrompt,
      chat_history: chatHistory,
    });

    const message = new ChatMessage(response.text, ROLES.AI);
    chatHistory.push(message);

    return response;
  } catch (error) {
    return throwError({ statusMessage: "Error" });
  }
};

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const body = await readBody(event);

  const req = event.node.req;
  const res = event.node.res;
  const { input, firstMessage } = body;

  if (req.method !== "POST") {
    return throwError({ statusMessage: "Method not allowed" });
  }

  if (!input?.length) {
    return throwError({ statusMessage: "Input cannot be empty" });
  }

  if (firstMessage) {
    const initialPrompt = `Give me a summary of the transcript of : ${input}`;

    const message = new ChatMessage(initialPrompt, ROLES.HUMAN);
    chatHistory.push(message);

    // Youtube Transcipt API
    try {
      const transcriptResponse = await YoutubeTranscript.fetchTranscript(input);
      let transcript = "";
      transcriptResponse.forEach((element, index) => {
        // add spaces
        transcript += index ? ` ${element?.text}` : `${element?.text}`;
      });
      const response = initializeChain(initialPrompt, transcript);
      return response;
    } catch (error) {
      return throwError({ statusMessage: "Youtube api call error" });
    }
  } else {
    try {
      console.log("Received a question");
      // get the question and add it to history
      const message = new ChatMessage(input, ROLES.HUMAN);
      chatHistory.push(message);

      const response = await chain.call({
        question: input,
        chat_history: chatHistory,
      });

      chatHistory.push({
        role: ROLES.AI,
        content: response.text,
      });

      return response;
    } catch (error) {
      return throwError({ statusMessage: "Youtube api call error" });
    }
  }
});
