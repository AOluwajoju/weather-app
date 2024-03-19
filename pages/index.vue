<template>
  <div
    class="w-full h-screen flex flex-col items-center justify-center text-white overflow-auto"
  >
    <div class="hidden lg:flex items-center space-x-4">
      <p class="text-center text-2xl lg:text-7xl font-bold">Weather App</p>
      <Icon name="clouds" :size="50" />
    </div>
    <div
      class="p-20 mt-8 backdrop-blur-sm bg-gradient-to-tl from-gray-700 to-gray-950 rounded-lg md:w-2/3 lg:w-1/2"
    >
      <p class="text-3xl font-bold text-center">Welcome!</p>
      <p class="text mt-3 text-center">
        Explore Weather Conditions Around the World!
      </p>
      <SearchBar />
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "IndexPage",
  data() {
    return {
      location: "",
    };
  },

  methods: {
    setLocation(value) {
      this.location = value;
      console.log(this.location);
    },
  },

  computed: {
    ...mapState(["detectedLocationCurrent"]),
  },

  async mounted() {
    // detect current location with geolocation
    navigator.geolocation.getCurrentPosition((position) => {
      const pos = {
        lat: position.coords.latitude,
        long: position.coords.longitude,
      };

      this.$store.dispatch("fetchDetectedLocationDetails", {
        lon: pos.long,
        lat: pos.lat,
      });
    });
  },
};
</script>
