<template>
  <div
    to="/"
    class="text-xs md:text-sm text-white rounded py-2 cursor-pointer items-center px-2 md:px-4 flex justify-between bg-gray-900 hover:bg-gray-800"
    @click="$emit('locationSelected')"
  >
    <p>{{ name }}, {{ country }}</p>

    <div class="flex items-center">
      <!-- weather Icon from openweatherapi -->
      <img
        :src="`https://openweathermap.org/img/wn/${icon}@4x.png`"
        class="w-12"
      />
      <p class="text-xs hidden md:inline-block">
        {{ $store.getters.tempConvert(temp) }} &deg;{{ computedTempUnit }}
      </p>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  props: {
    name: {
      type: String,
      default: "",
    },
    icon: {
      type: String,
      default: "",
    },
    temp: {
      type: Number,
      default: 0.0,
    },
    country: {
      type: String,
      default: "",
    },
  },
  computed: {
    ...mapState(["tempUnit"]),
    computedTempUnit() {
      return this.tempUnit === "celcius" ? "C" : "F";
    },
  },
};
</script>
