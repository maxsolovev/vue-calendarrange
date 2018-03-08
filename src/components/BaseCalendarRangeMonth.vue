<template>
  <section class="range-month">
    <!-- month title -->
    <h3 class="range-month__title">
      <slot name="title">
        {{ date | formatMonthName }}
      </slot>
    </h3>

    <!-- days of month -->
    <slot
      v-for="date of dates"
      name="date"
      :date="date"
    ></slot>
  </section>
</template>

<script>
export default {
  name: 'BaseCalendarRangeMonth',

  filters: {
    formatMonthName(date) {
      return date.toLocaleDateString(undefined, {
        year: 'numeric',
        month: 'long',
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
  },

  computed: {
    dates() {
      const dates = [];
      const month = new Date(this.date);
      const currentMonthIndex = month.getMonth();
      month.setDate(1);

      while (month.getMonth() === currentMonthIndex) {
        dates.push(new Date(month));
        month.setDate(month.getDate() + 1);
      }

      return dates;
    },
  },
};
</script>

<style lang="scss" scoped>
.range-month {
  display: grid;
  grid-template: auto / repeat(7, 1fr);

  &__title {
    grid-row: 1 / 2;
    grid-column: 1 / -1;
    font-weight: normal;
    margin: 0 0 .5em 0;
  }

  &:not(:last-of-type) {
    margin: 0 0 1em 0;
  }

  &--title-align-right {
    text-align: right;
  }
}
</style>
