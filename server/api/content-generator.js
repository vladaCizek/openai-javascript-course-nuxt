import extractVideoId from "../helpers/extractVideoId";

// Global variables
let chain, research;
const chatHistory = [];
let transcript = "";
let metadataString = "";
const YOUTUBE_URL_SKELETON = "youtube.com/watch?v=";

export default eventHandler(async (event) => {
  if (event.node.req.method === "POST") {
    const { topic, prompt, firstMessage } = await readBody(event);

    if (!topic) {
      throw createError({
        statusCode: 400,
        statusMessage: "No topic!",
      });
    } else if (!prompt) {
      throw createError({
        statusCode: 400,
        statusMessage: "No input!",
      });
    }
    console.log(`Topic: ${topic}, Prompt: ${prompt}`);

    // check if the chain is defined
    if (chain === undefined && !prompt.includes(YOUTUBE_URL_SKELETON)) {
      throw new Error({
        statusCode: 500,
        statusMessage:
          "Chain not initialized. Please send YouTube URL to initialize the chain.",
      });
    }

    // start conversation
    chatHistory.push({
      role: "user",
      content: prompt,
    });

    // if first message, intialize the chain
    if (firstMessage) {
      console.log("Received URL: ", prompt.url);

      try {
        // get context
        const videoId = extractVideoId(prompt);
        console.log(`videoId: ${videoId}.`);

        // return response
        return {
          output: response,
          chatHistory,
          transcript,
          metadataString,
        };
      } catch (error) {
        throw createError({
          statusCode: 500,
          statusMessage: error.message,
        });
      }
    }

    return {
      text: "Good",
    };
  }
  throw createError({
    statusCode: 500,
    statusMessage: "Only POST are allowed",
  });
});
