<template>
  <div
    :class="classes"
    :style="styleObj"
    :data-time="time"
    @click="handleClick"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
  >
    {{ date | formatDateName }}
  </div>
</template>

<script>
import { areDatesEqual, debounce, createDate } from './utils';

const currentDateTime = createDate().getTime();

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
        return createDate();
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
    mondayFirst: {
      type: Boolean,
      default: false,
    },
    rangeStart: {
      type: Date,
      default: undefined,
    },
    rangeEnd: {
      type: Date,
      default: undefined,
    },
  },

  inject: ['bus'],

  data() {
    return {
      isBetween: false,
      isCurrent: this.date.getTime() === currentDateTime,
    };
  },

  computed: {
    day() {
      let day = this.date.getDay();

      if (this.mondayFirst) {
        day -= 1;
      }

      return day < 0
        ? 6
        : day;
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

    isDisabled() {
      return this.rangeStart && this.date < this.rangeStart
        || this.rangeEnd && this.date > this.rangeEnd;
    },

    classes() {
      if (this.isDisabled) {
        return {
          'month-date': true,
          'month-date--disabled': this.isDisabled,
        };
      }
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
        'month-date--current': this.isCurrent,
      };
    },

    time() {
      return this.date.getTime();
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
      if (!this.isDisabled) {
        this.bus.$emit('pick', this.date);
      }
    },

    handleMouseEnter() {
      this.bus.$emit('enter', this.date);
    },

    handleMouseLeave() {
      this.bus.$emit('enter', undefined);
    },

    calculateBetweenCondition() {
      let { start, end, enter, date, isSelected } = this;

      if (!end && enter < start) {
        end = start;
        start = enter;
      }

      if (!end && enter >= start) {
        end = enter;
      }

      this.isBetween = !isSelected
        && date > start
        && date < end;
    },
  },
};
</script>

<style scoped>
.month-date {
  grid-column: var(--week-position);
  border: 1px solid var(--day-base-color, #eee);
  border-width: 1px 1px 0 0;
  cursor: pointer;
  user-select: none;
}

.month-date--disabled {
  border-color: var(--day-disabled-color, #F6F6F6);
  color: var(--day-disabled-color, #F6F6F6);
  cursor: not-allowed;
}

/* mods */
.month-date:hover:not(.month-date--selected):not(.month-date--disabled) {
  background-color: var(--day-hover-color, #e7eced);
  border-color: var(--day-hover-color, #e7eced);
}

.month-date--first-day {
  border-left-width: 0;
}

.month-date--last-day {
  border-right-width: 0;
}

.month-date--first-week {
  border-top-width: 0;
}

.month-date--last-week {
  border-bottom-width: 0;
}

.month-date--selected {
  background-color: var(--day-select-color, #c5cece);
  border-color: var(--day-select-color, #c5cece);
  color: black;
}

.month-date--between {
  background-color: var(--day-between-color, #cdcdcd);
  border-color: var(--day-between-color, #cdcdcd);
  color: black;
}

.month-date--current {
  background-color: var(--day-current-color, #7E8F7C);
  border-color: var(--day-current-color, #7E8F7C);
  color: black;
}

.month-date--disabled + .month-date + .month-date + .month-date + .month-date
  + .month-date + .month-date + .month-date {
    border-top-color: var(--day-disable-color, #F6F6F6);
  }
</style>
