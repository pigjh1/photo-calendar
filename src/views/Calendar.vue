<template>
  <div class="calendar">
    <div class="calendar-header">
      <button class="btn btn--sm" @click="onClickToday()"><span>오늘</span></button>
      <button class="calendar-prev" @click="onClickPrev(currentMonth)">
        <img src="@/assets/icon/left-arrow.svg" alt="">
        <span class="a11y">이전 달</span>
      </button>
      <button class="calendar-next" @click="onClickNext(currentMonth)">
        <img src="@/assets/icon/right-arrow.svg" alt="">
        <span class="a11y">다음 달</span>
      </button>
      <div class="calendar-label">
        {{ currentYear }}년 {{ currentMonth }}월
      </div>
    </div>

    <div class="calendar-week">
      <span v-for="(weekName, index) in weekNames" v-bind:key="index">
      {{ weekName }}
      </span>
    </div>

    <div class="calendar-body" :class="posterTypeClass">
      <div v-for="(day, index) in currentCalendarMatrix" :key="index" class="item" :style="isFirst(day)">
        <span class="item-txt" :class="{ 'is-today': isToday(currentYear, currentMonth, day) }">{{ day }}</span>

        <div class="item-img">
          <router-link :to="`/view/${ item.id }`" v-for="(item, index) in userdataDay(day)" :key="index">
            <img src="@/assets/noimage.png" alt="" v-if="item.img === ''">
            <img :src="item.img" :alt="item.title" v-if="item.img !== ''">
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userdata: this.$store.state.userdata,
      weekNames: ['월', '화', '수', '목', '금', '토', '일'],
      rootYear: 1904,
      rootDayOfWeekIndex: 4, // 2000년 1월 1일은 토요일
      currentYear: new Date().getFullYear(),
      currentMonth: new Date().getMonth() + 1,
      currentDay: new Date().getDate(),
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
    userItems() {
      const userdata = this.userdata,
        diffMonth = parseInt(this.currentMonth) < 10 ? '0' + this.currentMonth : this.currentMonth,
        diffCurrent = `${this.currentYear}-${diffMonth}`,
        sortData = userdata.sort((a, b) => a.date > b.date ? -1 : 1),
        searchData = sortData.filter(post => {
          return post.date.substr(0, 7).includes(diffCurrent);
        });

      return searchData;
    },
    posterTypeClass() {
      let type = this.$store.state.design.posterType;
      type = type ? `calendar-body--${type}` : '';
      return type;
    }
  },
  methods: {
    userdataDay(day) {
      const userdata = this.userItems,
        diffday = parseInt(day) < 10 ? '0' + day : day,
        searchData = userdata.filter(post => {
          return post.date.substr(7, 9).includes(diffday);
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
    onClickToday() {
      const date = new Date();
      this.currentYear = date.getFullYear();
      this.currentMonth = date.getMonth() + 1;
    },
    onClickPrev(month) {
      month--;
      if (month <= 0) {
        this.currentMonth = 12;
        this.currentYear -= 1;
      } else {
        this.currentMonth -= 1;
      }
    },
    onClickNext(month) {
      month++;
      if (month > 12) {
        this.currentMonth = 1;
        this.currentYear += 1;
      } else {
        this.currentMonth += 1;
      }
    },
    isToday(year, month, day) {
      const date = new Date();
      return year === date.getFullYear() && month === date.getMonth() + 1 && parseInt(day) === date.getDate();
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
    },
    getDateFormat(year, month, day) {
      const newMonth = parseInt(month) < 10 ? '0' + month : month,
        newDay = parseInt(day) < 10 ? '0' + day : day;

      return `${year}-${newMonth}-${newDay}`;
    }
  }
};
</script>
