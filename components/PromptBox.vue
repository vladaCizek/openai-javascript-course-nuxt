<template>
  <div>
    <div class="flex items-center mb-4">
      <input
        type="text"
        :value="prompt"
        @input="handlePromptChange"
        @keydown.enter="handleSubmit"
        :placeholder="placeHolderText || 'Enter your prompt'"
        class="w-full mr-4 py-3 px-4 bg-white text-gray-900 placeholder-gray-500 border-none focus:outline-none focus:ring-2 focus:ring-blue-500 border-round-sm shadow-2"
      />

      <Button
        v-if="!disableButton"
        :label="buttonText || 'Enter'"
        class="py-3"
        severity="help"
        @click="handleSubmit"
      />
    </div>
    <p v-if="error" class="text-red-500">{{ error }}</p>
  </div>
</template>

<script>
export default {
  props: {
    prompt: String,
    placeHolderText: String,
    buttonText: String,
    error: String,
    disableButton: Boolean,
  },
  data() {
    return {
      localPrompt: this.prompt,
    };
  },
  watch: {
    prompt(newValue) {
      this.localPrompt = newValue;
    },
  },
  methods: {
    handleSubmit() {
      this.$emit("submit");
    },
    handlePromptChange(e) {
      this.$emit("udpate", e.target.value);
    },
  },
};
</script>
