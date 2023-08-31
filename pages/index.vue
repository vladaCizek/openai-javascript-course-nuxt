<template>
  <div class="container mx-auto flex-col my-6">
    <h1 class="text-center">The Home of Your AI-JS Toolkit</h1>
    <div class="flex flex-row justify-start">
      <div
        class="flex flex-col items-start justify-center w-6 min-h-screen mt-6 text-gray-800 py-4 px-4 sm:px-6 lg:px-8"
      >
        <h2 class="w-12 text-left mr-6">Your AI-JS Bootcamp Starts Here</h2>
        <p class="text-center sm:text-left">
          <span class="font-bold">
            Throughout this course, you'll be building stunning AI projects that
            are not only impressive but also have real-world applications.
          </span>
          Whether you're aiming to generate a passive income, create a personal
          assistant to streamline your work, or simply to enhance your
          portfolio, the skills and knowledge you acquire here will be
          instrumental in achieving your goals.
        </p>
      </div>
      <div class="w-6">
        <div class="gallery-grid">
          <div
            v-for="(item, i) in navItems"
            :key="`item-${i}`"
            class="relative h-9rem gallery_image border-round-3xl"
            :class="`w-${item.grid} bg_image_${i + 1}`"
          >
            <NuxtLink
              class="gallery_link no-underline font-secondary uppercase text-xs hover:text-900 text-white"
              :to="item.to"
            >
              <span>{{ item.label }}</span>
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { navItems } from "@/constants";
export default {
  name: "Home",
  data() {
    return {
      navItems: navItems.filter((item, i) => {
        if (i) {
          return item;
        }
      }),
    };
  },
};
</script>
