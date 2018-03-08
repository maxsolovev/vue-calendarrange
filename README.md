# vue-calendar-range

> This is a calendar range which is based on VueJs 2.5+ and requires modern browsers.

## Installation

Install npm package
`npm install vue-calendar-range --save`

Declare dependency in main.js

``` js
import VueCalendarRange from 'vue-calendar-range';
Vue.use(VueCalendarRange);
```

## Usage
When user picks date, calendar will dispatch input event. Event will contain start and end dates.
``` vue
<template>
  <div id="app">
    <calendar-range
      v-model="calendarValues"
      class="calendar-range"
      :range-start="from"
      :range-end="to"
      :monday-first="mondayFirst"
    ></calendar-range>
  </div>
</template>

<script>
export default {
  name: 'App',

  data() {
    return {
      // calendarValues will consist of start and end dates
      // @param {Date} start
      // @param {Date} end
      calendarValues: undefined,

      // if value is undefined, calendar will use date 6 months before current
      from: new Date(2018, 0, 1),

      // if value is undefined, calendar will use date 6 months after current
      to: new Date(2019, 0, 1),

      // if value is undefined, calendar will use false
      // if value equals true, calendar will place monday as a first week day
      mondayFirst: true,
    };
  },
};
</script>

<style scoped>
.calendar-range {
  /* override base border color */
  --day-base-color: green;

  /* it will be override background and border colors if cursor hovers date */
  --day-hover-color: green;

  /* overide background and border colors of selected start and end dates */
  --day-select-color: green;

  /* override background and border colors of a range between start and end dates */
  --day-between-color: green;
}
</style>
```
