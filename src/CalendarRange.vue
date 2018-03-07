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
      :mods="monthMods"
      :date="params.date"
    >
      <month-date
        slot="date"
        slot-scope="dateParams"
        class="calendar-range__date"
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

const monthMods = ['title-align-right'];

export default {
  name: 'CalendarRange',

  components: {
    BaseCalendar,
    CalendarMonth,
    MonthDate,
  },

  props: {
    rangeStart: {
      type: Date,
      default: undefined,
    },
    rangeEnd: {
      type: Date,
      defualt: undefined,
    },
    period: {
      type: Object,
      default() {
        return {};
      },
    },
  },

  data() {
    return {
      monthMods,
    };
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

<style lang="scss" scoped>
.calendar-range {
  width: 14em;

  &__date {
    text-align: right;
    padding: .5em;
  }
}
</style>
