<template>
  <div>
    <NuxtLink
      v-if="Object.keys(detectedLocationCurrent).length !== 0"
      :to="`/weather/${detectedLocationCurrent.name}?lat=${detectedLocationCurrent.coord.lat}&long=${detectedLocationCurrent.coord.lon}`"
    >
      <LocationCard
        current
        :name="detectedLocationCurrent.name"
        :country="detectedLocationCurrent.sys.country"
        :icon="detectedLocationCurrent.weather[0].icon"
        :temp="detectedLocationCurrent.main.temp"
      />
    </NuxtLink>
    <div v-else class="px-4">
      <button
        @click="detectLocation()"
        :disabled="loading"
        class="bg-gray-100 text-gray-900 text-xs md:text-sm rounded md:rounded-lg px-4 py-1 md:py-2 w-fit md:w-full flex items-center justify-center space-x-2"
      >
        <p>Detect Location</p>
        <Icon v-if="loading" name="spinner" />
      </button>
      <p class="hidden md:block text-xs mt-2">{{ message }}</p>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      loading: false,
      message: "Click 'Allow' to enable location detect",
    };
  },

  computed: {
    ...mapState(["detectedLocationCurrent"]),
  },

  methods: {
    detectLocation() {
      // detect current location with geolocation
      this.loading = true;
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const pos = {
            lat: position.coords.latitude,
            long: position.coords.longitude,
          };

          this.$store.dispatch("fetchDetectedLocationDetails", {
            lon: pos.long,
            lat: pos.lat,
          });

          this.loading = false;
        },

        (error) => {
          // Error callback: Handle location error
          this.loading = false;
          if (error.code === error.PERMISSION_DENIED) {
            this.message = "Access Denied. Please Allow to location detection.";
          } else if (error.code === error.POSITION_UNAVAILABLE) {
            this.message = "Location information is unavailable.";
          } else if (error.code === error.TIMEOUT) {
            this.message = "The request to get user location timed out.";
          } else {
            console.log(error);
            this.$router.push("/error?q=undefined");
          }
        }
      );
    },
  },
};
</script>

<style>
</style>
