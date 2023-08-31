import { PDFLoader } from "langchain/document_loaders/fs/pdf";
import { Document } from "langchain/document";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { CharacterTextSplitter } from "langchain/text_splitter";
import { PineconeStore } from "langchain/vectorstores/pinecone";
// local imports
import { pineconeClientInit } from "../helpers/pineconeClient";

const prepareDocument = async (document) => {
  // chunk it
  const splitter = new CharacterTextSplitter({
    separator: " ",
    chunkSize: 250, // how big the context is on the page
    chunkOverlap: 10, // how much to overlap from prev page to next page
  });

  const splitDocs = await splitter.splitDocuments(document);

  // reduce size of metadata
  return splitDocs.map((doc) => {
    const reducedMetadata = { ...doc.metadata };
    delete reducedMetadata.pdf;
    return new Document({
      pageContent: doc.pageContent,
      metadata: reducedMetadata,
    });
  });
};

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const req = event.node.req;
  const res = event.node.res;

  if (req.method !== "POST") {
    throw new Error({
      statusCode: 500,
      statusMessage: "Method not allowed",
    });
  }

  // load document
  const bookPath =
    "/udemy/langchain_1/data/document_loaders/naval-ravikant-book.pdf";
  const loader = new PDFLoader(bookPath);
  const docs = await loader.load();

  if (!docs?.length) {
    console.log("Document not found.");
    return;
  }

  const documents = await prepareDocument(docs);

  // initiate database client: Pinecone
  const { pineconeClient, pineconeIndex } = await pineconeClientInit(
    config.pineconeApiKey,
    config.pineconeEnvironment,
    config.pineconeIndex
  );

  // upload documents to database
  const embeddings = new OpenAIEmbeddings();
  await PineconeStore.fromDocuments(documents, embeddings, {
    pineconeIndex,
  });
  return "All good.";
});
