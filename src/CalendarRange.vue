<template>
  <base-calendar
    v-model="inputPeriod"
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
        class="range-date"
        :monday-first="mondayFirst"
        :date="dateParams.date"
        :start="params.start"
        :end="params.end"
        :enter="params.enter"
        :range-start="params.rangeStart"
        :range-end="params.rangeEnd"
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

  model: {
    prop: 'period',
    event: 'input',
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
.range-date {
  text-align: right;
  padding: .5em;
}
</style>
