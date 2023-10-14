export default {
  data() {
    return {
      prompt: "",
      error: null,
    };
  },
  methods: {
    updatePrompt(value = "", promptName = "prompt") {
      this[promptName] = value;
    },
    resetPrompt(promptName = "prompt") {
      this[promptName] = "";
    },
  },
};
