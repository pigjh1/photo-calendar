<template>
  <div class="calendar" :class="calSizeClass" v-if="isShow">
    <div class="calendar-header" v-if="!calSize">
      <button class="calendar-btn" @click="onClickYearPrev()">
        <img src="@/assets/icon/first-arrow.svg" alt="">
        <span class="a11y">이전 연도</span>
      </button>
      <button class="calendar-btn" @click="onClickMonthPrev(nowMonth)">
        <img src="@/assets/icon/left-arrow.svg" alt="">
        <span class="a11y">이전 달</span>
      </button>
      <div class="calendar-label">
        {{ nowYear }}년 {{ nowMonth }}월
      </div>
      <button class="calendar-btn" @click="onClickMonthNext(nowMonth)">
        <img src="@/assets/icon/right-arrow.svg" alt="">
        <span class="a11y">다음 달</span>
      </button>
      <button class="calendar-btn" @click="onClickYearNext()">
        <img src="@/assets/icon/last-arrow.svg" alt="">
        <span class="a11y">다음 연도</span>
      </button>
      <button class="btn btn--sm" @click="onClickToday()"><span>오늘</span></button>
    </div>

    <div class="calendar-header" v-if="calSize">
      <div class="calendar-label">
        {{ currentYear }}년 {{ currentMonth }}월
      </div>
    </div>

    <div class="calendar-week">
      <span v-for="(weekName, index) in weekNames" v-bind:key="index">{{ weekName }}</span>
    </div>

    <div class="calendar-body"
      v-touch:swipe.left="swipePrev"
      v-touch:swipe.right="swipeNext"
      :class="posterTypeClass">
      <div v-for="(day, index) in calendarMatrix" :key="index" class="item" :style="isFirst(day)">
        <span class="item-txt" :class="{ 'is-today': isToday(day) }">{{ day }}</span>

        <div class="item-img" v-if="calType === 'img'">
          <router-link :to="`/view/${ item.id }`" v-for="(item, index) in userItemsDay(day)" :key="index">
            <img src="@/assets/noimage.png" alt="" v-if="!item.img">
            <img :src="item.img" alt="" v-if="item.img">
          </router-link>
        </div>

        <div class="item-dot" v-if="calType === 'dot'">
          <span v-for="(item, index) in userItemsDay(day)" :key="index"></span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import UtilDate from '@/assets/js/utilDate.js';

export default {
  props: {
    start: String,
    calType: String,
    calSize: String,
    calStatic: String
  },
  data() {
    return {
      weekNames: this.$store.state.weekNames,
      nowYear: new Date(this.start).getFullYear(),
      nowMonth: new Date(this.start).getMonth() + 1,
      nowDay: new Date(this.start).getDate(),
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
    currentYear() {
      return new Date(this.start).getFullYear();
    },
    currentMonth() {
      return new Date(this.start).getMonth() + 1;
    },
    currentDay() {
      return new Date(this.start).getDate();
    },
    userItems() {
      return this.$store.state.userItems;
    },
    turningItems() {
      return this.$store.getters.turningItems;
    },
    turningItemsLen() {
      const data = this.turningItems,
        diffMonth = parseInt(this.currentMonth) < 10 ? '0' + this.currentMonth : this.currentMonth,
        arr = data.filter(obj => {
          return obj.date.includes(`${this.currentYear}.${diffMonth}`);
        });

      return arr.length;
    },
    posterTypeClass() {
      const type = this.$store.state.design.posterType;
      return type ? `calendar-body--${type}` : '';
    },
    calSizeClass() {
      return this.calSize ? `calendar--${this.calSize}` : '';
    },
    isShow() {
      const type = this.$store.state.turning.blackMode;
      if (this.calType === 'img') return true;
      return type ? this.turningItemsLen > 0 : true;
    }
  },
  methods: {
    onClickToday() {
      const date = new Date();
      this.nowYear = date.getFullYear();
      this.nowMonth = date.getMonth() + 1;
    },
    onClickYearPrev() {
      this.nowYear -= 1;
    },
    onClickYearNext() {
      this.nowYear += 1;
    },
    onClickMonthPrev(month) {
      month--;
      if (month <= 0) {
        this.nowMonth = 12;
        this.nowYear -= 1;
      } else {
        this.nowMonth -= 1;
      }
    },
    onClickMonthNext(month) {
      month++;
      if (month > 12) {
        this.nowMonth = 1;
        this.nowYear += 1;
      } else {
        this.nowMonth += 1;
      }
    },
    swipePrev() {
      if (!this.calSize) {
        this.onClickMonthPrev(this.nowMonth);
      }
    },
    swipeNext() {
      if (!this.calSize) {
        this.onClickMonthNext(this.nowMonth);
      }
    },
    userItemsDay(day) {
      const data = this.calType === 'img' ? this.userItems : this.turningItems,
        year = (this.calStatic) ? this.nowYear : this.currentYear,
        month = (this.calStatic) ? this.nowMonth : this.currentMonth;

      return data.filter(obj => {
        return obj.date === UtilDate.getDateFormat(year, month, day);
      });
    },
    isToday(day) {
      const date = new Date(),
        year = (this.calStatic) ? this.nowYear : this.currentYear,
        month = (this.calStatic) ? this.nowMonth : this.currentMonth;
      return year === date.getFullYear() && month === date.getMonth() + 1 && parseInt(day) === date.getDate();
    },
    isFirst(index) {
      const date = new Date();
      let firstDate, margin;

      if (this.calStatic) {
        date.setFullYear(this.nowYear);
        date.setMonth(this.nowMonth - 1);
      } else {
        date.setFullYear(this.currentYear);
        date.setMonth(this.currentMonth - 1);
      }
      date.setDate(1);

      firstDate = new Date(date).getDay() - 1;
      firstDate = firstDate === -1 ? 6 : firstDate;

      if (firstDate === 0) {
        margin = '0%';
      } else {
        margin = (firstDate * 14.28) + '%';
      }

      return index === '1' ? `margin-left: ${margin}` : '';
    }
  }
};
</script>
