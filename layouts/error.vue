<template></template>

<script>
export default {
  props: ["error"],

  mounted() {
    if (this.error.statusCode === 404) {
      this.$router.push("/error?q=400");
    } else {
      this.$router.push("/error");
    }
  },
};
</script>

<style>
</style>
