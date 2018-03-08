import Vue from 'vue';
import CalendarRange from '@/src/CalendarRange';

describe('CalendarRange.vue', () => {
  it('should render correct', () => {
    const Constructor = Vue.extend(CalendarRange);
    const vm = new Constructor().$mount();

    expect(vm.$el.children.length)
      .toBeGreaterThan(0);
  });
});
