<template>
  <div>
    <!-- month slot -->
    <slot
      v-for="date of months"
      name="month"
      :date="date"
      :start="start"
      :end="end"
      :enter="enter"
    ></slot>
  </div>
</template>

<script>
import Vue from 'vue';
import { createDate } from './utils';

/**
 * makeDate
 * return normalized date or undefined
 *
 * @param  {*} date
 * @return {Date | undefined}
 */
function makeDate(date) {
  return date instanceof Date
    ? createDate(date)
    : undefined;
}

/**
 * createMonths
 * create months
 *
 * @param  {Date} from
 * @param  {Date} to
 * @return {Date}
 */
function createMonths(from = createDate(), to = createDate()) {
  const months = [];
  from.setDate(1);

  while(from.valueOf() <= to.valueOf()) {
    const month = createDate(from);
    months.push(month);
    from.setMonth(from.getMonth() + 1);
  }

  return months;
}

export default {
  name: 'BaseCalendarRange',

  filters: {
    formatMonthName(date) {
      return date.toLocaleDateString(undefined, {
        month: 'long',
        year: 'numeric',
      });
    },
  },

  model: {
    prop: 'period',
    event: 'input',
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
      start: makeDate(this.period.start),
      end: makeDate(this.period.end),
      enter: undefined,
      bus: new Vue(),
    };
  },

  computed: {
    from() {
      const { from } = this.period;
      let fromDate = makeDate(this.rangeStart);

      if (!fromDate || isNaN(fromDate.getTime())) {
        fromDate = createDate();
        fromDate.setMonth(fromDate.getMonth() - 6);
      }

      if (from instanceof Date && !isNaN(from.getTime()) && from < fromDate) {
        fromDate = createDate(from);
        fromDate.setDate(1);
      }

      return fromDate;
    },

    to() {
      const { to } = this.period;
      let toDate = makeDate(this.rangeEnd);

      if (!toDate || isNaN(toDate.getTime())) {
        toDate = createDate();
        toDate.setMonth(toDate.getMonth() + 6);
      }

      if (to instanceof Date && !isNaN(to.getTime()) && to > toDate) {
        toDate = createDate(to);
        toDate.setDate(1);
        toDate.setMonth(toDate.getMonth() + 1);
      }

      return toDate;
    },

    months() {
      return createMonths(this.from, this.to);
    },
  },

  mounted() {
    this.bus.$on('pick', this.handleDatePick);
    this.bus.$on('enter', this.handleDateEnter);
  },

  beforeDestroy() {
    this.bus.$off('pick', this.handleDatePick);
    this.bus.$off('enter', this.handleDateEnter);
  },

  watch: {
    period() {
      const { start, end } = this.period;
      this.start = start;
      this.end = end;
    },
  },

  methods: {
    handleDatePick(date) {
      switch (true) {
        case !this.start:
          this.start = date;
          break;

        case this.start instanceof Date && this.end instanceof Date:
          this.start = date;
          this.end = undefined;
          break;

        case this.start instanceof Date && date > this.start:
          this.end = date;
          break;

        case this.start instanceof Date && date <= this.start:
          this.end = this.start;
          this.start = date;
      }

      this.$emit('input', {
        start: this.start,
        end: this.end,
      });
    },

    handleDateEnter(date) {
      this.enter = date;
    }
  },

  provide() {
    return {
      bus: this.bus,
    };
  },
};
</script>
