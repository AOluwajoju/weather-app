<template>
  <div class="p-10 md:p-20 w-full text-white h-screen overflow-auto">
    <!-- Loading state -->
    <div
      v-if="Object.keys(selectedLocationCurrent).length === 0"
      class="flex items-center justify-center h-full"
    >
      <Icon name="spinner" :size="40" />
    </div>

    <!-- Page display -->
    <div v-else>
      <p class="font-bold capitalize">
        {{ selectedLocationCurrent.name }},
        {{ selectedLocationCurrent.sys.country }}
      </p>

      <DetailsDisplay
        :temp="selectedLocationCurrent.main.temp"
        :feels_like="selectedLocationCurrent.main.feels_like"
        :description="selectedLocationCurrent.weather[0].description"
        :wind_dir="selectedLocationCurrent.wind.deg"
        :wind_speed="selectedLocationCurrent.wind.speed"
        :humidity="selectedLocationCurrent.main.humidity"
        :visibility="selectedLocationCurrent.visibility"
        :pressure="selectedLocationCurrent.main.pressure"
        :icon="selectedLocationCurrent.weather[0].icon"
      />

      <!--forecast cards -->
      <div
        class="backdrop-blur-sm bg-gradient-to-tl from-gray-600/20 to-black/20 mt-10 p-4 rounded-lg w-fit"
      >
        <p class="text-sm font-semi-bold">5-Day Forecast (12-hour intervals)</p>

        <div
          class="p-1 sm:p-3 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-7 gap-3 w-fit"
        >
          <DayCard
            tabindex="0"
            v-for="(forecast, i) in rightSizedForecast"
            :key="i"
            class="focus:col-span-2 sm:focus:col-span-3 md:focus:col-span-5 lg:focus:col-span-7"
            @focus.native="opened = i"
            @blur.native="opened = null"
            :opened="opened === i"
            :data="forecast"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";

export default {
  data() {
    return {
      opened: null,
    };
  },

  async mounted() {
    this.$store.dispatch("fetchLocationDetails", {
      lon: this.$route.query.long,
      lat: this.$route.query.lat,
    });

    this.$store.dispatch("fetchForecastDetails", {
      lon: this.$route.query.long,
      lat: this.$route.query.lat,
    });
  },

  computed: {
    ...mapState(["selectedLocationCurrent"]),
    ...mapGetters(["rightSizedForecast"]),
  },
};
</script>

<style>
</style>
