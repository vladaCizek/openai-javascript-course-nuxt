// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  head: {
    title: "Learning Langchain",
  },
  css: [
    "primevue/resources/themes/saga-blue/theme.css",
    "primevue/resources/primevue.css",
    "primeicons/primeicons.css",
    "primeflex/primeflex.css",
    "@/assets/css/main.css",
  ],
  build: {
    transpile: ["primevue"],
    postcss: {
      postcssOptions: {
        plugins: {
          tailwindcss: {},
          autoprefixer: {},
        },
      },
    },
  },
  runtimeConfig: {
    openaiApiKey: process.env.OPENAI_API_KEY,
    serpapiApiKey: process.env.SERPAPI_API_KEY,
    pineconeApiKey: process.env.PINECONE_API_KEY,
    pineconeEnvironment: process.env.PINECONE_ENVIRONMENT,
    pineconeIndex: process.env.PINECONE_INDEX,
  },
  ssr: false,
});
