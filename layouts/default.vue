<template>
  <!-- lg:, md: prefixes in classes are for various screen sizes-->
  <div
    :class="[
      'h-screen overflow-auto',
      $route.name === 'error' ? '' : 'flex flex-col lg:flex-row',
    ]"
  >
    <!-- Show sidebar except on error page -->
    <SideBar v-if="$route.name !== 'error'" class="sticky top-0 z-10" />
    <Nuxt class="bg-gradient-to-br from-gray-700 to-gray-950 z-0" />
    <!-- dont show footer on large screens and in error page -->
    <Footer v-if="$route.name !== 'error'" class="lg:hidden z-10" />
  </div>
</template>

<script>
export default {};
</script>

<style>
</style>
