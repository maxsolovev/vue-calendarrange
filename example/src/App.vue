<template>
  <div
    ref="container"
    class="app"
  >
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
import { CalendarRange } from '../..';

const start = new Date(2018, 0, 1);
const end = new Date(2018, 3, 14);

let positionY;

function scroll() {
  const diff = Math.ceil((positionY - window.scrollY) / 20);

  if (diff > 0) {
    window.scrollBy(0, diff);
    requestAnimationFrame(scroll);
  }
}

export default {
  name: 'App',

  components: {
    CalendarRange,
  },

  data() {
    return {
      // calendarValues will consist of start and end dates
      // @param {Date} start
      // @param {Date} end
      calendarValues: {
        start,
        end,
      },

      // if value is undefined, calendar will use date 6 months before current
      from: new Date(2018, 1, 14),

      // if value is undefined, calendar will use date 6 months after current
      to: new Date(2018, 2, 14),

      // if value is undefined, calendar will use false
      // if value equals true, calendar will place monday as a first week day
      mondayFirst: true,
    };
  },

  mounted() {
    const startTime = start.getTime();
    const endTime = end.getTime();

    const dayFrom = this.$refs.container
      .querySelector(`[data-time="${startTime}"]`);
    const dayTo = this.$refs.container
      .querySelector(`[data-time="${endTime}"]`);

    if (dayFrom && dayTo) {
      const { top: firstTop } = dayFrom.getBoundingClientRect();
      const {
        top: secondTop,
        height: secondHeight,
      } = dayTo.getBoundingClientRect();

      const height = firstTop - secondTop - secondHeight;
      const diff = Math.trunc((window.innerHeight - height) / 4);

      positionY = window.scrollY + firstTop - diff;
      scroll();
    }
  },
};
</script>

<style scoped>
.app {
  text-align: center;
}

.calendar-range {
  /* override base border color */
  --day-base-color: #558C89;

  /* it will be override background and border colors if cursor hovers date */
  --day-hover-color: #74AFAD;

  /* overide background and border colors of selected start and end dates */
  --day-select-color: #D9853B;

  /* override background and border colors of a range between start and end dates */
  --day-between-color: #ECECEA;
}
</style>
