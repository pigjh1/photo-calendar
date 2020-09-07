<template>
  <div class="turningview-cal">
    <div class="opt">
      <label for="mode" class="toggle">
        <input type="checkbox" id="mode" v-model="turningBlackMode">
        <span class="toggle-slider"></span>
      </label>
      <span class="t">빈 캘린더 제외</span>
    </div>
    <div v-for="(value, index) in calDate" :key="index">
      <Calendar :start="calDate[index]" calType="dot" calSize="sm" />
    </div>
  </div>
</template>

<script>
import UtilDate from '@/assets/js/utilDate.js';
import Calendar from '@/components/Calendar';

export default {
  props: {
    start: String,
    end: String
  },
  components: {
    Calendar
  },
  computed: {
    turningBlackMode: {
      get() {
        return this.$store.state.turning.blackMode;
      },
      set(value) {
        this.$store.commit('changeTurningBlackMode', value);
      }
    },
    turningGap() {
      const a = this.start.split('.'),
        b = this.end.split('.'),
        aYear = parseInt(a[0]),
        bYear = parseInt(b[0]),
        aMonth = parseInt(a[1]),
        bMonth = parseInt(b[1]);
      let diff = 0;

      if (aYear < bYear) {
        diff = ((bYear - aYear) * 12) + bMonth - aMonth;
      } else {
        diff = bMonth - aMonth;
      }

      return diff + 1;
    },
    calDate() {
      const date = this.start,
        newDate = [];

      for (let i = 0; i < this.turningGap; i++) {
        const year = date.substr(0, 4),
          month = date.substr(5, 2),
          day = date.substr(8, 2);
        let newYear = parseInt(year),
          newMonth = parseInt(month) + i;

        newMonth = newMonth > 0 ? newMonth : 12 - newMonth;

        if (newMonth > 12) {
          newYear = newYear + Math.ceil(newMonth / 12) - 1;
        }

        newMonth = newMonth % 12;
        newMonth = newMonth === 0 ? 12 : newMonth;

        newDate[i] = UtilDate.getDateFormat(newYear, newMonth, day).replace(/\./g, '-');
      }

      return newDate;
    }
  }
};
</script>
