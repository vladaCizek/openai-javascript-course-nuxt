import { OpenAI } from "langchain/llms/openai";
import SSE from "express-sse";

const sse = new SSE();

export default defineEventHandler(async (event) => {
  const req = event.node.req;
  const res = event.node.res;

  res.flush = () => {};
  if (req.method === "GET") {
    sse.init(req, res); // Ensure you pass req and res
    return;
  }
  if (req.method === "POST") {
    const { prompt: input } = await readBody(event);

    if (!input) {
      throw createError({
        statusCode: 400,
        statusMessage: "No input!",
      });
    }

    // initialize model
    const chat = new OpenAI({
      streaming: true,
      verbose: true,
      callbacks: [
        {
          handleLLMNewToken(token) {
            sse.send(token, "newToken");
          },
        },
      ],
    });
    // create prompt
    const prompt = `Napis rap pisnicku o osobe, co se jmenuje: ${input}.`;

    // call frontend to backend
    chat.call(prompt).then(() => {
      sse.send(null, "end");
    });
    return {
      result: "Streaming complete",
    };
  }
  throw createError({
    statusCode: 405,
    statusMessage: "Method not allowed",
  });
});
