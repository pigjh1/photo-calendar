<template>
  <div class="turning-cal">
    <Calendar :start="calDate[2]" />
    <Calendar :start="calDate[1]" />
    <Calendar :start="calDate[0]" />
  </div>
</template>

<script>
import Calendar from '@/components/turning/CalendarChild';

export default {
  components: {
    Calendar
  },
  computed: {
    start() {
      return this.$store.state.turning.caldate;
    },
    turningItems() {
      return this.$store.getters.turningItems;
    },
    turningItemsLast() {
      return this.turningItems[0];
    },
    calDate() {
      const date = this.turningItemsLast.date,
        newDate = [];

      for (let i = 0; i < 3; i++) {
        const year = date.substr(0, 4),
          month = date.substr(5, 2),
          day = date.substr(8, 2),
          newDateMonth = parseInt(month) - i,
          newYear = newDateMonth > 0 ? year : parseInt(year) - 1;
        let newMonth = newDateMonth > 0 ? newDateMonth : 12 - newDateMonth;

        if (newMonth === 13) newMonth = 11;

        newDate[i] = this.getDateFormat(newYear, newMonth, day);
      }

      return newDate;
    }
  },
  methods: {
    getDateFormat(year, month, day) {
      const newMonth = parseInt(month) < 10 ? '0' + month : month,
        newDay = parseInt(day) < 10 ? '0' + day : day;

      return `${year}-${newMonth}-${newDay}`;
    }
  }
};
</script>
