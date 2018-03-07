import Vue from 'vue';
import CalendarRange from '@/src/CalendarRange';

describe('CalendarRange.vue', () => {
  it('should render correct months', () => {
    const Constructor = Vue.extend(CalendarRange);
    const vm = new Constructor().$mount();
    console.log(vm.$el.children.length);
    expect(vm.$el.children.length)
      .toBeGreaterThan(0);
  });
});
