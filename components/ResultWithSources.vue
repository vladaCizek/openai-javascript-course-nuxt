<template>
  <div
    ref="messagesContainerRef"
    class="relative flex flex-column w-full px-4 py-4 mb-4 bg-white overflow-y-auto border-round-xl shadow-6 overflow-auto surface-overlay line-height-3"
    style="height: 500px; min-height: 500px"
  >
    <MessageItem
      v-for="(message, index) in messages"
      :key="index"
      :message="message"
      :pngFile="pngFile"
      :class="index ? '' : 'mt-auto'"
    />
  </div>
</template>

<script>
import MessageItem from "./MessageItem.vue";

export default {
  name: "ResultWithSources",
  components: {
    MessageItem,
  },
  props: {
    messages: Array,
    pngFile: String,
    maxMsgs: Number,
  },
  data() {
    return {
      maxMsgToScroll: this.maxMsgs || 5,
    };
  },
  watch: {
    messages: {
      immediate: true,
      handler() {
        this.$nextTick(() => {
          if (this.$refs.messagesContainerRef) {
            const element = this.$refs.messagesContainerRef;
            element.scrollTop = element.scrollHeight;
          }
        });
      },
    },
  },
};
</script>
