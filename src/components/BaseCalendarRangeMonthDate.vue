<template>
  <div
    :class="classes"
    :style="styleObj"
    @click="handleClick"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
  >
    {{ date | formatDateName }}
  </div>
</template>

<script>
import { areDatesEqual, debounce } from './utils';

export default {
  name: 'BaseCalendarRangeMonthDate',

  filters: {
    formatDateName(date) {
      return date.toLocaleDateString(undefined, {
        day: 'numeric',
      });
    },
  },

  props: {
    date: {
      type: Date,
      default() {
        return new Date();
      },
    },
    start: {
      type: Date,
      default: undefined,
    },
    end: {
      type: Date,
      default: undefined,
    },
    enter: {
      type: Date,
      default: undefined,
    },
  },

  inject: ['bus'],

  data() {
    return {
      isBetween: false,
    };
  },

  computed: {
    classes() {
      const day = this.date.getDay();
      const date = this.date.getDate();
      const isFirstWeek = date <= day + 1;
      const isFirstDay = !day || date === 1;

      const bufDate = new Date(
        this.date.getFullYear(),
        this.date.getMonth() + 1,
        0,
      );
      const endDate = bufDate.getDate();
      const isLastDay = day === 6 || date === endDate;

      return {
        'month-date': true,
        'month-date--first-week': isFirstWeek,
        'month-date--first-day': isFirstDay,
        'month-date--last-day': isLastDay,
        'month-date--selected': this.isSelected,
        'month-date--between': this.isBetween,
      };
    },

    styleObj() {
      return {
        '--week-position': this.date.getDay() + 1,
      };
    },

    isSelected() {
      return areDatesEqual(this.date, this.start)
        || areDatesEqual(this.date, this.end);
    },
  },

  mounted() {
    this.calculateBetweenCondition();
  },

  watch: {
    start() {
      this.calculateBetweenCondition();
    },
    end() {
      this.calculateBetweenCondition();
    },
    enter() {
      if (this.start && !this.end) {
        debounce(this.calculateBetweenCondition, 10);
      }
    },
  },

  methods: {
    handleClick() {
      this.bus.$emit('pick', this.date);
    },

    handleMouseEnter() {
      this.bus.$emit('enter', this.date);
    },

    handleMouseLeave() {
      this.bus.$emit('enter', undefined);
    },

    calculateBetweenCondition() {
      const endDate = this.end || this.enter;

      this.isBetween = !this.isSelected
        && this.date > this.start
        && this.date < endDate;
    },
  },
};
</script>

<style lang="scss" scoped>
$base-color: #eee;
$selected-color: #c5cece;
$between-color: #cdcdcd;
$hover-color: #e7eced;

.month-date {
  grid-column: var(--week-position);
  border: 1px solid $base-color;
  border-width: 1px 1px 0 0;
  cursor: pointer;
  user-select: none;

  &:hover:not(&--selected) {
    background-color: $hover-color;
    border-color: $hover-color;
  }

  &--first-day {
    border-left-width: 0;
  }

  &--last-day {
    border-right-width: 0;
  }

  &--first-week {
    border-top-width: 0;
  }

  &--last-week {
    border-bottom-width: 0;
  }

  &--selected {
    background-color: $selected-color;
    border-color: $selected-color;
  }

  &--between {
    background-color: $between-color;
    border-color: $between-color;
  }
}
</style>
