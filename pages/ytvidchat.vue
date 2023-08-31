<template>
  <section class="container mx-auto py-7">
    <TwoLayout>
      <template #left>
        <div class="text-left">
          <h1 class="mb-6">Youtube: - Talk to your videos.</h1>
          <p class="mb-4 font-bold">
            This tool let's you chat with your Youtube videos.
          </p>
          <p>
            ThThis tool uses the YouTube API, Text Splitters a and the
            Conversational Retrieval QZ Chain. Head over to the module to get
            started.
          </p>
        </div>
      </template>
      <template #right>
        <ResultWithSources :messages="messages" />
        <PromptBox
          :prompt="prompt"
          :error="error"
          placeHolderText="Paste YouTube link"
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
  created() {
    this.addMessage(
      "Hi there! I'm YT chatbot. Please provide a YouTube video URL and I'll answer any questions you have."
    );
  },
  data() {
    return {
      data: null,
      source: null,
      messages: [],
      firstMessage: true,
    };
  },
  methods: {
    async handleSubmit() {
      try {
        this.clearData();
        const url = "/api/video-chat";
        const { text } = await $fetch(url, {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: { input: this.prompt, firstMessage: this.firstMessage },
        });
        if (this.firstMessage) {
          this.firstMessage = false;
        }
        this.resetPrompt();
        this.addMessage(text, "user");
      } catch (error) {
        console.log(error);
        this.error = error?.data?.message;
      }
    },
    clearData() {
      this.data = null;
    },
    addMessage(text, type = "bot") {
      this.messages.push({
        text,
        type,
      });
    },
  },
};
</script>
