import { PineconeClient } from "@pinecone-database/pinecone";

export const pineconeClientInit = async (apiKey, environment, index) => {
  const client = new PineconeClient();

  await client.init({
    apiKey,
    environment,
  });
  const clientIndex = client.Index(index);

  return {
    pineconeClient: client,
    pineconeIndex: clientIndex,
  };
};
