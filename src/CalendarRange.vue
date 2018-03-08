<template>
  <base-calendar
    v-model="inputPeriod"
    class="calendar-range"
    :range-start="rangeStart"
    :range-end="rangeEnd"
  >
    <calendar-month
      slot="month"
      slot-scope="params"
      :date="params.date"
    >
      <month-date
        slot="date"
        slot-scope="dateParams"
        class="calendar-range__date"
        :monday-first="mondayFirst"
        :date="dateParams.date"
        :start="params.start"
        :end="params.end"
        :enter="params.enter"
      ></month-date>
    </calendar-month>
  </base-calendar>
</template>

<script>
import BaseCalendar from './components/BaseCalendarRange';
import CalendarMonth from './components/BaseCalendarRangeMonth';
import MonthDate from './components/BaseCalendarRangeMonthDate';

export default {
  name: 'CalendarRange',

  components: {
    BaseCalendar,
    CalendarMonth,
    MonthDate,
  },

  props: {
    period: {
      type: Object,
      default() {
        return {};
      },
    },
    rangeStart: {
      type: Date,
      default: undefined,
    },
    rangeEnd: {
      type: Date,
      defualt: undefined,
    },
    mondayFirst: {
      type: Boolean,
      default: false,
    },
  },

  computed: {
    inputPeriod: {
      get() {
        return this.period;
      },
      set(value) {
        this.$emit('input', value);
      },
    },
  },
};
</script>

<style scoped>
.calendar-range {
  width: 14em;
}

.calendar-range__date {
  text-align: right;
  padding: .5em;
}
</style>
