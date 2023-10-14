<template>
  <section class="container mx-auto py-7">
    <TwoLayout>
      <template #left>
        <div class="text-left">
          <h1 class="mb-6">Automated Content Generator</h1>
          <p class="mb-4 font-bold">
            Doing your own manual research is so 2022. Let's automate it.
          </p>
          <p>
            This tool uses the agents to create a unique video script for you.
            Head over to Module X to get started!
          </p>
        </div>
      </template>
      <template #right>
        <ResultWithSources :messages="messages" />
        <PromptBox
          :prompt="topic"
          :error="topicError"
          placeHolderText="Enter a topic"
          :disableButton="true"
          @udpate="updateTopicPrompt"
          @submit="handleSubmit"
        />
        <PromptBox
          :prompt="prompt"
          :error="error"
          :placeHolderText="promptPlaceholder"
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
  mixins: [promptBoxMixin],
  // Any local data, computed properties, methods, etc. for the About page
  created() {
    this.topic = "Pedro Pascal";
    this.prompt = "https://www.youtube.com/watch?v=O_9JoimRj8w";
    this.addMessage(
      "Hi there! I'm your personal YouTube video script generator. If you give me a YouTube URL and topic, I can transform it into a unique video script. Send me a YouTube URL to get started."
    );
  },
  data() {
    return {
      firstMessage: true,
      topic: "",
      topicError: null,
      messages: [],
    };
  },
  computed: {
    promptPlaceholder() {
      return this.messages.length <= 1
        ? "Enter a youtube url, e.g., https://www.youtube.com/watch?v=O_9JoimRj8w"
        : "Ask a follow up question";
    },
  },
  methods: {
    async handleSubmit() {
      try {
        this.addMessage(this.prompt, "user");
        const { response: text } = await $fetch("/api/content-generator", {
          method: "POST",
          body: {
            prompt: this.prompt,
            topic: this.topic,
            firstMessage: this.firstMessage,
          },
        });
        this.resetPrompt();
        this.addMessage(text);
        if (this.firstMessage) {
          this.firstMessage = false;
        }
      } catch (error) {
        console.log(error);
        this.error = error?.data?.message;
      }
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
