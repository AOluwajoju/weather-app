<template>
  <div
    to="/"
    :class="[
      'text-white text-xs rounded py-2 cursor-pointer px-4 flex flex-col items-center justify-center ',
      opened
        ? 'w-full bg-gradient-to-tr from-gray-600 to-black'
        : 'w-20 bg-gray-800 hover:bg-gray-700',
    ]"
    @click="$emit('daySelected')"
  >
    <p class="text-center">
      {{ getDayOfWeek(data.dt_txt) }} ({{ getTime(data.dt_txt) }})
    </p>

    <div v-if="!opened" class="flex flex-col items-center justify-center">
      <!-- weather Icon from openweatherapi -->
      <img
        :src="`https://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png`"
      />

      <p class="text-xs">
        {{ $store.getters.tempConvert(data.main.temp) }}
        &deg;{{ computedTempUnit }}
      </p>
    </div>
    <DetailsDisplay
      v-else
      :temp="data.main.temp"
      :feels_like="data.main.feels_like"
      :description="data.weather[0].description"
      :wind_dir="data.wind.deg"
      :wind_speed="data.wind.speed"
      :humidity="data.main.humidity"
      :visibility="data.visibility"
      :pressure="data.main.pressure"
      :icon="data.weather[0].icon"
    />
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  props: {
    data: {
      type: Object,
      default: () => ({}),
    },
    opened: {
      type: Boolean,
      default: false,
    },
  },

  methods: {
    getDayOfWeek(dateString) {
      const date = new Date(dateString);
      // Get the day of the week (0 = Sunday, 1 = Monday, ..., 6 = Saturday)
      const dayOfWeek = date.getDay();
      const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"];

      // return the name of the day using the day index
      return dayNames[dayOfWeek];
    },

    getTime(dateString) {
      //get time substring from date string
      const time = dateString.split(" ")[1];
      let hour = parseInt(time.split(":")[0]);

      const amOrPm = hour >= 12 ? "pm" : "am";

      // Convert hours to 12-hour format
      hour = hour % 12;
      hour = hour ? hour : 12; // Handle midnight (0 hours)

      return hour + amOrPm;
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

<style>
</style>
