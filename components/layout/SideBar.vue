<template>
  <!-- tailwind classes to turn it to navbar on smaller screens -->
  <div
    class="bg-gray-700 px-2 md:px-6 py-4 flex items-center w-full text-white justify-between lg:block lg:py-10 lg:w-80"
  >
    <NuxtLink to="/" class="lg:hidden flex items-center space-x-4">
      <p
        class="hidden md:inline-block text-center text-2xl lg:text-7xl font-bold"
      >
        Weather App
      </p>
      <Icon name="clouds" :size="20" />
    </NuxtLink>
    <SearchBar />
    <div
      class="hidden absolute lg:static lg:flex flex-col justify-between h-4/5"
    >
      <div>
        <p class="font-semibold mt-6 mb-2">Current Location</p>
        <CurrentLocationDisplay />
      </div>

      <div>
        <p class="font-semibold mt-4">Temperature Unit</p>
        <TempUnits />
        <p class="font-semibold mt-2">Speed Unit</p>
        <SpeedUnits />
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>
