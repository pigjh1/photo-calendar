<template>
  <div class="home">
    <button class="home-type btn btn--sm" @click="onClickType()">
      <span v-if="yearType">월별보기</span>
      <span v-if="!yearType">연도별보기</span>
    </button>

    <div class="home-btngroup" v-if="yearType">
      <button class="calendar-btn" @click="onClickYearPrev()">
        <img src="@/assets/icon/left-arrow.svg" alt="">
        <span class="a11y">이전 연도</span>
      </button>
      <div class="calendar-label">
        {{ nowYear }}년
      </div>
      <button class="calendar-btn" @click="onClickYearNext()">
        <img src="@/assets/icon/right-arrow.svg" alt="">
        <span class="a11y">다음 연도</span>
      </button>
      <button class="btn btn--sm" @click="onClickToday()"><span>오늘</span></button>
    </div>

    <div class="home-year" v-if="yearType">
      <div v-for="(value, index) in calDate" :key="index" >
        <Calendar :start="calDate[index]" calType="img" calSize="md" />
      </div>
    </div>

    <div class="home-cal" v-if="!yearType">
      <Calendar :start="today" calType="img" />
    </div>
  </div>
</template>

<script>
import UtilDate from '@/assets/js/utilDate.js';
import Calendar from '@/components/Calendar';

export default {
  components: {
    Calendar
  },
  data() {
    return {
      today: new Date().toString(),
      nowYear: new Date().getFullYear(),
      yearType: false
    };
  },
  computed: {
    posterType: {
      get() {
        return this.$store.state.design.posterType;
      },
      set(value) {
        this.$store.commit('changePost', value);
      }
    },
    calDate() {
      const newDate = [];

      for (let i = 0; i < 12; i++) {
        newDate[i] = UtilDate.getDateFormat(this.nowYear, i + 1, 1);
      }

      return newDate;
    }
  },
  methods: {
    onClickType() {
      this.yearType = !this.yearType;
    },
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
    }
  }
};
</script>
