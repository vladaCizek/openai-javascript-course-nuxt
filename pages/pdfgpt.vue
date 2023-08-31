<template>
  <section class="container mx-auto py-7">
    <TwoLayout>
      <template #left>
        <div class="text-left">
          <h1 class="mb-6">PDF: I rememeber everything</h1>
          <p class="mb-4 font-bold">
            Let's see if it can remember your name and your favourite food. This
            tool will let you ask anything contained in a PDF document.
          </p>
          <p>
            This tool uses Buffer Memory and Conversation Chain. Head over to
            the Module X to get started!
          </p>

          <Button
            label="Upload a book"
            class="mt-4"
            icon="pi pi-file-pdf"
            severity="secondary"
            outlined
            rounded
            @click="uploadPdf"
          />
        </div>
      </template>
      <template #right>
        <ResultWithSources :messages="messages" />
        <PromptBox
          :prompt="prompt"
          :error="error"
          @udpate="updatePrompt"
          @submit="handleSubmit"
        />
      </template>
    </TwoLayout>
  </section>
</template>

<script>
import promptBoxMixin from "@/mixins/promptBox";
import { PineconeClient } from "@pinecone-database/pinecone";

export default {
  mixins: [promptBoxMixin],
  data() {
    return {
      messages: [],
      firstMessage: true,
    };
  },
  methods: {
    // This function handles the submission of the form when the user hits 'Enter' or 'Submit'
    // It sends a GET request to the provided endpoint with the current prompt as the query
    async handleSubmit() {
      try {
        this.addMessage(this.prompt, "user");
        const { text, sourceDocuments } = await $fetch("/api/pdf-query", {
          method: "POST",
          body: { input: this.prompt, firstMessage: this.firstMessage },
        });
        this.addMessage(text, "bot", sourceDocuments);
        this.resetPrompt();
      } catch (error) {
        console.log(error);
        this.error = error?.data?.message;
      }
    },
    // This function handles the submission of the user's prompt when the user hits 'Enter' or 'Submit'
    // It sends a POST request to the provided endpoint with the current prompt in the request body
    async uploadPdf() {
      try {
        const prompt = "";
        const response = await $fetch(`/api/pdf-upload`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: { input: prompt },
        });
      } catch (error) {
        console.log(error);
      }
    },

    addMessage(text, type = "bot", sourceDocuments = null) {
      this.messages.push({
        text,
        sourceDocuments,
        type,
      });
    },
  },
};
</script>
