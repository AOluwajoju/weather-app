export const state = () => ({
  selectedLocationCurrent: {}, //current weather data of selected location
  selectedLocationForecast: {}, //forecast weather data of selected location
  detectedLocationCurrent: {}, //current weather data of DETECTED location
  tempUnit: "celcius",
  speedUnit: "km/h",
});

export const getters = {
  // convert temperature (in kelvin) to Celcius/Fahrenheit
  tempConvert: (state) => (temp) => {
    if (state.tempUnit === "celcius") {
      return (temp - 273.15).toFixed(1); // Kelvin to Celsius formula
    } else if (state.tempUnit === "fahrenheit") {
      return (((temp - 273.15) * 9) / 5 + 32).toFixed(1); // Kelvin to Fahrenheit formula
    }
  },

  // convert speed (in m/s) to kmph/mph
  speedConvert: (state) => (speed) => {
    if (state.speedUnit === "km/h") {
      return (speed * 3.6).toFixed(1); // m/s to km/h conversion factor
    } else if (state.speedUnit === "mph") {
      return (speed * 2.23694).toFixed(1); // m/s to mph conversion factor
    }
  },

  // rightsize forecast list to 12-hour intervals(from 3-hour)
  rightSizedForecast(state) {
    let list = state.selectedLocationForecast.list;
    return list ? list.filter((forecast, index) => index % 4 === 0) : [];
  },
};

export const mutations = {
  // set current weather of selected location
  setSelectedLocationCurrent(state, location) {
    state.selectedLocationCurrent = location;
  },

  // set forecast of selected location
  setSelectedLocationForecast(state, forecast) {
    state.selectedLocationForecast = forecast;
  },

  // set current weather of DETECTED location
  setDetectedLocationCurrent(state, forecast) {
    state.detectedLocationCurrent = forecast;
  },

  setTempUnit(state, unit) {
    state.tempUnit = unit;
  },

  setSpeedUnit(state, unit) {
    state.speedUnit = unit;
  },
};

export const actions = {
  async fetchLocationDetails({ commit }, coordinates) {
    // axios API call error handling done in plugins/axios.js
    await this.$axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=19fef8f69376cb9a0d07795caa4ff663`
      )
      .then((response) => {
        commit("setSelectedLocationCurrent", response.data);
      });
  },

  async fetchForecastDetails({ commit }, coordinates) {
    await this.$axios
      .get(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=19fef8f69376cb9a0d07795caa4ff663`
      )
      .then((response) => {
        commit("setSelectedLocationForecast", response.data);
      });
  },

  // the weather of the current DETECTED location
  async fetchDetectedLocationDetails({ commit }, coordinates) {
    await this.$axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=19fef8f69376cb9a0d07795caa4ff663`
      )
      .then((response) => {
        commit("setDetectedLocationCurrent", response.data);
      });
  },
};
