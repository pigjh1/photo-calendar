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
      <div v-for="(day, index) in currentCalendarMatrix" :key="index" class="item" :style="isFirst(day)">
        <span class="item-txt">{{ day }}</span>

        <div class="item-dots">
          <span v-for="(item, index) in userdataDay(day)" :key="index"></span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    start: String
  },
  data() {
    return {
      userdata: this.$store.getters.sortItems,
      weekNames: ['월', '화', '수', '목', '금', '토', '일'],
      rootYear: 1904,
      rootDayOfWeekIndex: 4, // 2000년 1월 1일은 토요일
      currentMonthStartWeekIndex: null,
      currentCalendarMatrix: [],
      endOfDay: null,
      memoDatas: []
    };
  },
  mounted() {
    this.currentMonthStartWeekIndex = this.getStartWeek(this.currentYear, this.currentMonth);
    this.endOfDay = this.getEndOfDay(this.currentYear, this.currentMonth);
    this.currentCalendarMatrix = [];
    for (let i = 1; i < 32; i++) {
      let calendarRow = [];

      if (i <= this.endOfDay) {
        calendarRow = calendarRow + '' + i;
        this.currentCalendarMatrix.push(calendarRow);
      }
    }
  },
  computed: {
    current() {
      const date = new Date();
      date.setFullYear(this.currentYear);
      date.setMonth(this.currentMonth - 1);
      date.setDate(this.currentDay);
      return date;
    },
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
    }
  },
  methods: {
    userdataDay(day) {
      const userdata = this.turningItems,
        diffYear = this.currentYear.toString(),
        diffdMonth = parseInt(this.currentMonth) < 10 ? '0' + this.currentMonth : this.currentMonth,
        diffday = parseInt(day) < 10 ? '0' + day : day,
        searchData = userdata.filter(post => {
          const year = post.date.substr(0, 4),
            month = post.date.substr(5, 2),
            day = post.date.substr(8, 2);

          return year === diffYear && month === diffdMonth && day === diffday;
        });

      return searchData;
    },
    getEndOfDay(year, month) {
      switch (month) {
      case 1:
      case 3:
      case 5:
      case 7:
      case 8:
      case 10:
      case 12:
        return 31;
      case 4:
      case 6:
      case 9:
      case 11:
        return 30;
      case 2:
        if (((year % 4 === 0) && (year % 100 !== 0)) || (year % 400 === 0)) {
          return 29;
        } else {
          return 28;
        }
      default:
        console.log('unknown month ' + month);
        return 0;
      }
    },
    getStartWeek(targetYear, targetMonth) {
      let year = this.rootYear,
        month = 1,
        sumOfDay = this.rootDayOfWeekIndex;

      while (true) {
        if (targetYear > year) {
          for (let i = 0; i < 12; i++) {
            sumOfDay += this.getEndOfDay(year, month + i);
          }
          year++;
        } else if (targetYear === year) {
          if (targetMonth > month) {
            sumOfDay += this.getEndOfDay(year, month);
            month++;
          } else if (targetMonth === month) {
            return (sumOfDay) % 7;
          }
        }
      }
    },
    isFirst(index) {
      const date = new Date(this.current);
      let firstDate, margin, style = '';

      firstDate = new Date(date.setDate(1)).getDay() - 1;
      firstDate = firstDate === -1 ? 6 : firstDate;

      if (firstDate === 1) {
        margin = '0%';
      } else {
        margin = (firstDate * 14.28) + '%';
      }

      if (index === '1') {
        style = `margin-left: ${margin}`;
      }
      return style;
    }
  }
};
</script>
