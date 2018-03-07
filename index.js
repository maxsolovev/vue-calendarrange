import CalendarRange from './src/CalendarRange';
import BaseCalendarRange from './src/components/BaseCalendarRange';
import BaseCalendarRangeMonth from './src/components/BaseCalendarRangeMonth';
import BaseCalendarRangeMonthDate
  from './src/components/BaseCalendarRangeMonthDate';

export {
  CalendarRange,
  BaseCalendarRange,
  BaseCalendarRangeMonth,
  BaseCalendarRangeMonthDate,
};

export default {
  install(Vue, options) {
    Vue.component('calendar-range', CalendarRange);
  },
};
