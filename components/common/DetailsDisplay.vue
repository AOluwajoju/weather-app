<template>
  <div>
    <div class="flex justify-center mt-8">
      <div
        class="flex flex-col justify-center space-y-4 items-start md:flex-row md:space-x-4"
      >
        <div class="flex items-start space-x-2 sm:space-x-4">
          <!-- weather Icon from openweatherapi -->
          <img
            :src="`https://openweathermap.org/img/wn/${icon}@4x.png`"
            class="w-20 sm:w-24 md:w-40"
          />
          <div class="w-40">
            <div class="flex items-start">
              <p class="text-2xl sm:text-4xl md:text-6xl font-bold">
                {{ $store.getters.tempConvert(temp) }}
              </p>
              <p class="text-xs">&deg;{{ computedTempUnit }}</p>
            </div>
            <p class="font-bold text-xs">
              <span class="text-gray-500 uppercase">Feels Like </span>
              {{ $store.getters.tempConvert(feels_like) }}
              &deg; {{ computedTempUnit }}
            </p>
            <p class="text-xs mt-3 capitalize">
              {{ description }}
            </p>

            <p class="text-gray-500 text-xs uppercase mt-3">Wind</p>
            <p class="sm:text-lg md:text-2xl font-bold">
              {{
                degreesToCardinal(wind_dir) +
                " " +
                $store.getters.speedConvert(wind_speed)
              }}{{ speedUnit }}
            </p>
          </div>
        </div>
        <!-- cards on the right -->
        <div class="grid grid-cols-2 gap-2">
          <div class="bg-gray-900 p-5 rounded-lg">
            <p class="text-gray-500 text-xs uppercase">Humidity</p>
            <p class="sm:text-lg md:text-2xl font-bold">
              {{ humidity }}&percnt;
            </p>
          </div>
          <div class="bg-gray-900 p-5 rounded-lg">
            <p class="text-gray-500 text-xs uppercase">Visibility</p>
            <p class="sm:text-lg md:text-2xl font-bold">
              {{ visibility / 1000 }}km
              <!-- converted meters to kilometers -->
            </p>
          </div>
          <div class="bg-gray-900 p-5 rounded-lg">
            <p class="text-gray-500 text-xs uppercase">Pressure</p>
            <p class="sm:text-lg md:text-2xl font-bold">{{ pressure }}hPa</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";

export default {
  props: {
    temp: {
      type: Number,
      required: true,
    },
    feels_like: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    wind_dir: {
      type: Number,
      required: true,
    },
    wind_speed: {
      type: Number,
      required: true,
    },
    humidity: {
      type: Number,
      required: true,
    },
    visibility: {
      type: Number,
      required: true,
    },
    pressure: {
      type: Number,
      required: true,
    },
    icon: {
      type: String,
      required: true,
    },
  },

  computed: {
    ...mapState(["tempUnit", "speedUnit"]),
    computedTempUnit() {
      return this.tempUnit === "celcius" ? "C" : "F";
    },
  },

  methods: {
    // to get wind cardinal direction
    degreesToCardinal(degrees) {
      const cardinals = ["N", "NE", "E", "SE", "S", "SW", "W", "NW", "N"];

      // Calculate index for cardinal direction
      const index = Math.round(degrees / 45);

      // Return cardinal direction
      return cardinals[index];
    },
  },
};
</script>

<style>
</style>
