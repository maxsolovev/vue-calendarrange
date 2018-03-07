<template>
  <div id="app">
    <calendar-range
      v-model="period"
      class="app-calendar"
    ></calendar-range>
  </div>
</template>

<script>
import CalendarRange from '../../';

export default {
  name: 'App',

  components: {
    CalendarRange,
  },

  data() {
    return {
      period: undefined,
    };
  },

  watch: {
    period(value) {
      console.log('period', value);
    },
  },
};
</script>

<style lang="scss" scoped>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;
}

.app-calendar {
  margin: 0 auto;
}
</style>
