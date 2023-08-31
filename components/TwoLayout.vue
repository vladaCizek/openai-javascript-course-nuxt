<template>
  <div class="flex gap-x-8">
    <div class="w-6">
      <slot name="left" />
    </div>
    <div class="w-6">
      <slot name="right" />
    </div>
  </div>
</template>

<script>
export default {
  name: "TwoLayout",
};
</script>
