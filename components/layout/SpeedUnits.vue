<template>
  <div class="flex items-center space-x-1 md:space-x-3 p-1 md:p-4">
    <div
      @click="setSpeedUnit('km/h')"
      :class="[
        'px-3 py-2 rounded-full flex items-center justify-center text-xs md:text-sm border border-white cursor-pointer',
        speedUnit === 'km/h' ? 'text-gray-900 bg-gray-100' : 'text-white',
      ]"
    >
      <p>KM/H</p>
    </div>
    <div
      @click="setSpeedUnit('mph')"
      :class="[
        'px-3 py-2 rounded-full flex items-center justify-center text-xs md:text-sm border border-white cursor-pointer',
        speedUnit === 'mph' ? 'text-gray-900 bg-gray-100' : 'text-white',
      ]"
    >
      <p>MPH</p>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";

export default {
  computed: {
    ...mapState(["speedUnit"]),
  },

  methods: {
    ...mapMutations(["setSpeedUnit"]),
  },
};
</script>

<style>
</style>
