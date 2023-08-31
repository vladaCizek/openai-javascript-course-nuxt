<template>
  <section class="container mx-auto py-7">
    <TwoLayout>
      <template #left>
        <div class="text-left">
          <h1 class="mb-6">Memory: I rememeber everything</h1>
          <p class="mb-4 font-bold">
            Let's see if it can remember your name and your favourite food. This
            tool will let you ask anything contained in a PDF document.
          </p>
          <p>
            This tool uses Buffer Memory and Conversation Chain. Head over to
            the Module X to get started!
          </p>
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
export default {
  mixins: [promptBoxMixin],
  data() {
    return {
      firstMessage: true,
      messages: [],
    };
  },
  methods: {
    async handleSubmit() {
      try {
        this.addMessage(this.prompt, "user");
        const { response: text } = await $fetch("/api/memory", {
          method: "POST",
          body: { prompt: this.prompt, firstMessage: this.firstMessage },
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
