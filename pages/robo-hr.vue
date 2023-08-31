<template>
  <section class="about-section font-instrument">
    <h1>About Us</h1>
    <p>
      We are a passionate team of developers and designers dedicated to creating
      the best web experiences.
    </p>
    <p>
      Founded in 2023, our mission is to make the web a better place, one app at
      a time.
    </p>
    <NuxtLink to="/">Return to Home</NuxtLink>
  </section>
</template>

<script>
export default {
  // Any local data, computed properties, methods, etc. for the About page
  data() {
    return {
      // Example data properties
    };
  },
  methods: {
    // Example methods
  },
};
</script>

<style scoped>
.about-section {
  padding: 2rem;
  max-width: 800px;
  margin: 0 auto;
  text-align: center;
}

.about-section h1 {
  font-size: 2.5rem;
  margin-bottom: 1rem;
}

.about-section p {
  margin-bottom: 1rem;
}
</style>
