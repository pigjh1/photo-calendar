<template>
  <div class="calendar">
    <div class="calendar-header">
      <div class="calendar-label">
        {{ currentYear }}년 {{ currentMonth }}월
      </div>
    </div>

    <div class="calendar-week">
      <span v-for="(weekName, index) in weekNames" v-bind:key="index">
      {{ weekName }}
      </span>
    </div>

    <div class="calendar-body">
      <div v-for="(day, index) in calendarMatrix" :key="index" class="item" :style="isFirst(day)">
        <span class="item-txt">{{ day }}</span>

        <div class="item-dots">
          <span v-for="(item, index) in userdataDay(day)" :key="index"></span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import UtilDate from '@/assets/js/utilDate.js';

export default {
  props: {
    start: String
  },
  data() {
    return {
      userdata: this.$store.getters.sortItems,
      weekNames: this.$store.state.weekNames,
      calendarMatrix: [],
      endOfDay: null
    };
  },
  mounted() {
    this.endOfDay = UtilDate.getEndOfDay(this.currentYear, this.currentMonth);
    this.calendarMatrix = [];
    for (let i = 1; i < 32; i++) {
      let calendarRow = [];

      if (i <= this.endOfDay) {
        calendarRow = calendarRow + '' + i;
        this.calendarMatrix.push(calendarRow);
      }
    }
  },
  computed: {
    turningItems() {
      return this.$store.getters.turningItems;
    },
    currentYear() {
      return new Date(this.start).getFullYear();
    },
    currentMonth() {
      return new Date(this.start).getMonth() + 1;
    },
    currentDay() {
      return new Date(this.start).getDate();
    },
    turningItemsLen() {
      const data = this.turningItems,
        diffdMonth = parseInt(this.currentMonth) < 10 ? '0' + this.currentMonth : this.currentMonth,
        arr = data.filter(obj => {
          return obj.date.includes(`${this.currentYear}-${diffdMonth}`);
        });

      return arr.length;
    }
  },
  methods: {
    userdataDay(day) {
      const data = this.turningItems;

      return data.filter(obj => {
        return obj.date === UtilDate.getDateFormat(this.currentYear, this.currentMonth, day);
      });
    },
    isFirst(index) {
      const date = new Date(this.current);
      let firstDate, margin;

      firstDate = new Date(date.setDate(1)).getDay() - 1;
      firstDate = firstDate === -1 ? 6 : firstDate;

      if (firstDate === 1) {
        margin = '0%';
      } else {
        margin = (firstDate * 14.28) + '%';
      }

      return index === '1' ? `margin-left: ${margin}` : '';
    }
  }
};
</script>
