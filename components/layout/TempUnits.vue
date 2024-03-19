<template>
  <div class="flex items-center space-x-1 md:space-x-3 p-1 md:p-4">
    <div
      @click="setTempUnit('celcius')"
      :class="[
        'px-3 md:px-5 py-2 rounded-full flex items-center justify-center text-xs md:text-sm border border-white cursor-pointer',
        tempUnit === 'celcius' ? 'text-gray-900 bg-gray-100' : 'text-white',
      ]"
    >
      <p>&deg;C</p>
    </div>
    <div
      @click="setTempUnit('fahrenheit')"
      :class="[
        'px-3 md:px-5 py-2 rounded-full flex items-center justify-center text-xs md:text-sm border border-white cursor-pointer',
        tempUnit === 'fahrenheit' ? 'text-gray-900 bg-gray-100' : 'text-white',
      ]"
    >
      <p>&deg;F</p>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";

export default {
  computed: {
    ...mapState(["tempUnit"]),
  },

  methods: {
    ...mapMutations(["setTempUnit"]),
  },
};
</script>

<style>
</style>
