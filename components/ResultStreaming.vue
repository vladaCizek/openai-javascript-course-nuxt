<template>
  <div class="bg-gray-100 p-6 rounded shadow-6 mb-4">
    <!-- If data is a string -->
    <pre
      v-if="isString"
      class="text-black-500 mb-4"
      style="white-space: break-spaces"
      >{{ data }}</pre
    >
    <!-- If data is an object -->
    <p v-if="data" class="text-black-500 mb-4">{{ data.output }}</p>

    <!-- If data has source documents (e.g. when querying from a VectorDBQAChain and returnSourceDocuments is true) -->
    <div
      v-for="(doc, index) in sourceDocuments"
      :key="index"
      class="bg-grey-100 p-1 rounded shadow-lg mb-2"
    >
      <p>Source {{ index }}: {{ doc.pageContent }}</p>
      <p class="text-gray-700">From: {{ doc.metadata.source }}</p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: [String, Object],
      default: null,
    },
  },
  computed: {
    isString() {
      return typeof this.data === "string";
    },
    sourceDocuments() {
      return this.data && this.data.sourceDocuments
        ? this.data.sourceDocuments
        : [];
    },
  },
};
</script>
