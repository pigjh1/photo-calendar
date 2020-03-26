<template>
  <div class="turning-cal">
    <div v-for="(value, index) in calDate" :key="index" >
      <Calendar :start="calDate[index]" />
    </div>
  </div>
</template>

<script>
import UtilDate from '@/assets/js/utilDate.js';
import Calendar from '@/components/turning/Calendar';

export default {
  components: {
    Calendar
  },
  computed: {
    turningItems() {
      return this.$store.getters.turningItems;
    },
    turningItemsFirst() {
      return this.turningItems[this.turningLen - 1];
    },
    turningItemsLast() {
      return this.turningItems[0];
    },
    turningLen() {
      return this.turningItems.length;
    },
    turningGap() {
      const a = this.turningItemsFirst.date.split('-'),
        b = this.turningItemsLast.date.split('-'),
        aYear = parseInt(a[0]),
        bYear = parseInt(b[0]),
        aMonth = parseInt(a[1]),
        bMonth = parseInt(b[1]);
      let diff = 5;

      if (aYear < bYear) {
        diff = ((bYear - aYear) * 12) + bMonth - aMonth;
      } else {
        diff = bMonth - aMonth;
      }

      return diff + 1;
    },
    calDate() {
      const date = this.turningItemsFirst.date,
        newDate = [];

      for (let i = 0; i < this.turningGap; i++) {
        const year = date.substr(0, 4),
          month = date.substr(5, 2),
          day = date.substr(8, 2),
          newDateMonth = parseInt(month) + i;
        let newYear = parseInt(year),
          newMonth = newDateMonth > 0 ? newDateMonth : 12 - newDateMonth;

        if (newMonth > 12) {
          newMonth = newMonth - 12;
          newYear = newYear + 1;
        }

        newDate[i] = UtilDate.getDateFormat(newYear, newMonth, day);
      }

      return newDate;
    }
  }
};
</script>
