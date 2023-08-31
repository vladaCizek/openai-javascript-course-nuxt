export default {
  data() {
    return {
      prompt: "",
      error: null,
    };
  },
  methods: {
    updatePrompt(value = "") {
      this.prompt = value;
    },
    resetPrompt() {
      this.prompt = "";
    },
  },
};
