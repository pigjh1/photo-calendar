<template>
  <div class="calendar">
    <div class="calendar-header">
      <button class="calendar-btn" @click="onClickYearPrev()">
        <img src="@/assets/icon/first-arrow.svg" alt="">
        <span class="a11y">이전 연도</span>
      </button>
      <button class="calendar-btn" @click="onClickMonthPrev(currentMonth)">
        <img src="@/assets/icon/left-arrow.svg" alt="">
        <span class="a11y">이전 달</span>
      </button>
      <div class="calendar-label">
        {{ currentYear }}년 {{ currentMonth }}월
      </div>
      <button class="calendar-btn" @click="onClickMonthNext(currentMonth)">
        <img src="@/assets/icon/right-arrow.svg" alt="">
        <span class="a11y">다음 달</span>
      </button>
      <button class="calendar-btn" @click="onClickYearNext()">
        <img src="@/assets/icon/last-arrow.svg" alt="">
        <span class="a11y">다음 연도</span>
      </button>
      <button class="btn btn--sm" @click="onClickToday()"><span>오늘</span></button>
    </div>

    <div class="calendar-week">
      <span v-for="(weekName, index) in weekNames" v-bind:key="index">
        {{ weekName }}
      </span>
    </div>

    <div class="calendar-body" :class="posterTypeClass">
      <div v-for="(day, index) in calendarMatrix" :key="index" class="item" :style="isFirst(day)">
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
import UtilDate from '@/assets/js/utilDate.js';

export default {
  data() {
    return {
      weekNames: this.$store.state.weekNames,
      currentYear: new Date().getFullYear(),
      currentMonth: new Date().getMonth() + 1,
      currentDay: new Date().getDate(),
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
    sortItems() {
      return this.$store.getters.sortItems;
    },
    userItems() {
      const data = this.sortItems,
        diffMonth = parseInt(this.currentMonth) < 10 ? '0' + this.currentMonth : this.currentMonth,
        diffCurrent = `${this.currentYear}-${diffMonth}`;

      return data.filter(post => {
        return post.date.substr(0, 7).includes(diffCurrent);
      });
    },
    posterTypeClass() {
      let type = this.$store.state.design.posterType;
      type = type ? `calendar-body--${type}` : '';
      return type;
    }
  },
  methods: {
    userdataDay(day) {
      const data = this.userItems,
        diffday = parseInt(day) < 10 ? '0' + day : day;

      return data.filter(post => {
        return post.date.substr(8, 2) === diffday;
      });
    },
    onClickToday() {
      const date = new Date();
      this.currentYear = date.getFullYear();
      this.currentMonth = date.getMonth() + 1;
    },
    onClickYearPrev() {
      this.currentYear -= 1;
    },
    onClickYearNext() {
      this.currentYear += 1;
    },
    onClickMonthPrev(month) {
      month--;
      if (month <= 0) {
        this.currentMonth = 12;
        this.currentYear -= 1;
      } else {
        this.currentMonth -= 1;
      }
    },
    onClickMonthNext(month) {
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
      const date = new Date();
      let firstDate, margin;

      date.setFullYear(this.currentYear);
      date.setMonth(this.currentMonth - 1);
      date.setDate(this.currentDay);

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
