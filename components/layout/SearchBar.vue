<template>
  <div>
    <div class="rounded-lg border pr-4 mt-4 flex space-x-1 items-center">
      <input
        type="text"
        v-model="input"
        class="w-full text-xs p-4 h-full"
        placeholder="Search for Location..."
        @input="getLocationList(input)"
      />
      <div class="cursor-pointer" @click="clearInput()">
        <Icon :name="input ? 'close' : 'search'" />
      </div>
    </div>
    <div
      v-if="input"
      class="mt-2 absolute border py-2 bg-gray-100 rounded-lg text-gray-900 text-xs"
    >
      <NuxtLink
        v-for="(location, i) in locationList"
        :to="`/weather/${location.name}?lat=${location.lat}&long=${location.lon}`"
        @click.native="input = ''"
        :key="i"
        class="px-4 py-2 w-full rounded-lg hover:bg-gray-200 cursor-pointer flex items-center justify-between"
      >
        <p class="capitalise">{{ location.name }}, {{ location.country }}</p>
        <p class="capitalise text-gray-600 font-semibold uppercase text-right">
          {{ location.state }}
        </p>
      </NuxtLink>
      <p class="p-4" v-if="locationList.length === 0">
        Not found. To make search more precise, please enter the correct
        <span class="font-semibold">city's</span> name
      </p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return { input: "", locationList: [] };
  },
  methods: {
    // get location list as user types
    async getLocationList(input) {
      if (input) {
        // axios API call error handling done in plugins/axios.js
        await this.$axios
          .get(
            `https://api.openweathermap.org/geo/1.0/direct?q=${input}&limit=5&appid=19fef8f69376cb9a0d07795caa4ff663`
          )
          .then((response) => {
            this.locationList = response.data;
          });
      }
    },

    clearInput() {
      if (this.input) {
        this.input = "";
      }
    },
  },
};
</script>

<style>
</style>
