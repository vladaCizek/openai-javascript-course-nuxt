<template>
  <section class="container mx-auto py-7">
    <TwoLayout>
      <template #left>
        <div class="text-left">
          <h1 class="mb-6">Streaming - Spit a Rap.</h1>
          <p class="mb-4 font-bold">
            Nobody likes waiting for APIs to load. Use streaming to improve the
            user experience of chat bots.
          </p>
          <p>
            This tutorial uses streaming. Head over to module X to get started!
          </p>
        </div>
      </template>
      <template #right>
        <ResultStreaming :data="data" />
        <PromptBox
          :prompt="prompt"
          :error="error"
          placeHolderText="Enter your name and city"
          @udpate="updatePrompt"
          @submit="handleSubmit"
        />
      </template>
    </TwoLayout>
  </section>
</template>

<script>
import promptBoxMixin from "@/mixins/promptBox";
export default {
  name: "streaming",
  mixins: [promptBoxMixin],
  data() {
    return {
      data: null,
      source: null,
    };
  },
  methods: {
    async handleSubmit() {
      try {
        this.clearData();
        this.registerSourceEvent();
        const res = await $fetch("api/streaming", {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: { prompt: this.prompt },
        });
        console.log(res);
      } catch (error) {
        this.error = error?.data?.message;
      }
    },
    processToken(token = "") {
      return token.replace(/\\n/g, "\n").replace(/\"/g, "");
    },
    registerSourceEvent() {
      // create new eventSource
      this.source = new EventSource("/api/streaming");
      this.source.addEventListener("newToken", (event) => {
        const token = this.processToken(event.data);
        this.data = this.data + token;
      });
      this.source.addEventListener("end", () => {
        this.source.close();
      });
    },
    clearData() {
      this.data = null;
    },
  },
};
</script>
