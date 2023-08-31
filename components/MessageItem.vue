<template>
  <div
    class="w-full flex flex-column mb-2"
    :class="[isLast ? 'flex-grow-1 mb-0' : '']"
  >
    <div class="flex">
      <div
        class="mr-3 border-round-md overflow-hidden"
        style="height: 32px; width: 32px; min-width: 32px; margin-top: 1px"
      >
        <img
          :src="message.type === 'user' ? userImage : botImage"
          :alt="`${message.type}'s profile`"
          class="w-full"
        />
      </div>
      <p class="inline-block mt-1" :class="message.type">
        {{ message.text }}
      </p>
    </div>

    <div v-if="message.sourceDocuments">
      <button
        class="text-gray-600 text-sm font-bold mt-2"
        @click="showSources = !showSources"
      >
        Source Documents {{ showSources ? "(Hide)" : "(Show)" }}
      </button>
      <div
        v-if="showSources"
        v-for="(document, docIndex) in message.sourceDocuments"
        :key="docIndex"
      >
        <p class="text-gray-600 text-sm font-semibold my-2">
          Source {{ docIndex + 1 }}:
        </p>
        <p class="text-gray-800 text-sm mt-2">
          {{ document.pageContent }}
        </p>
        <pre class="text-xs text-gray-500 mt-2 text-left">
          {{ JSON.stringify(document.metadata, null, 2) }}
        </pre>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    message: Object,
    pngFile: String,
    isLast: Boolean,
  },
  data() {
    return {
      userImage: "/assets/images/green-square.png",
      botImage: `/assets/images/brain.png`,
      showSources: false,
    };
  },
};
</script>
