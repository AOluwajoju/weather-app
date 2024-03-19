<template>
  <div
    class="w-full h-screen flex flex-col items-center justify-center text-white overflow-auto"
  >
    <Icon name="error" :size="50" />
    <p class="text-center text-4xl font-bold">Something went wrong.</p>
    <p class="text mt-3 text-center">
      {{ errorMessage }}
    </p>

    <NuxtLink
      to="/"
      class="px-4 py-2 mt-8 backdrop-blur-sm bg-gradient-to-tr hover:bg-gradient-to-tl from-gray-600 to-black rounded-lg"
    >
      Back to Home Page
    </NuxtLink>
  </div>
</template>

<script>
export default {
  computed: {
    // error message based on parameter (query)
    errorMessage() {
      if (this.$route.query.q === "400") {
        return "We can't find the page you're looking for now.";
      } else if (this.$route.query.q === "undefined") {
        return "A network error occurred.";
      } else {
        return "";
      }
    },
  },
};
</script>
