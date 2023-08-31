<template>
  <div class="flex flex-column h-full font-instrument text-800">
    <header class="flex items-center justify-between">
      <div>
        <h4 class="font-secondary">Langchain Udemy Course</h4>
      </div>
      <div class="flex">
        <div v-for="(item, i) in items" :key="'nav' + i" class="mr-2">
          <span>
            <NuxtLink
              class="no-underline text-900 font-secondary uppercase text-xs hover:text-500"
              :to="item.to"
              >{{ item.label }}</NuxtLink
            >
            <span v-if="items.length - 1 !== i" class="ml-2 text-300">|</span>
          </span>
        </div>
      </div>
    </header>
    <main>
      <NuxtPage />
    </main>
    <footer class="mt-auto text-center">
      <p class="text-xs py-2">© 2023 My Awesome Nuxt App</p>
    </footer>
  </div>
</template>

<script>
import { navItems } from "@/constants";
export default {
  data() {
    return {
      items: navItems,
    };
  },
};
</script>
