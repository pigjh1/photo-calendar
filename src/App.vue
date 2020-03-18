<template>
  <div id="app" :class="className">
    <h1 class="a11y">Photo Calendar</h1>
    <header class="header">
      <router-link to="/">
        <img src="@/assets/icon/calendar.svg" alt="">
        <span class="a11y">캘린더</span>
      </router-link>
      <router-link to="/list">
        <img src="@/assets/icon/list.svg" alt="">
        <span class="a11y">목록</span>
      </router-link>
      <router-link to="/analysis">
        <img src="@/assets/icon/analysis.svg" alt="">
        <span class="a11y">통계</span>
      </router-link>
      <router-link to="/setting">
        <img src="@/assets/icon/setting.svg" alt="">
        <span class="a11y">설정</span>
      </router-link>
    </header>
    <main class="main">
      <transition name="view">
        <router-view />
      </transition>
    </main>
    <footer class="footer">
      <p>Copyright (c) 2020 @ All Rights Reserved.</p>
    </footer>
  </div>
</template>

<style lang="scss" src="@/assets/scss/style.scss"></style>

<script>
export default {
  computed: {
    darkmode() {
      return this.$store.state.darkmode;
    },
    colorClass() {
      return 'cset-' + (this.$store.state.currentColor + 1);
    },
    fontClass() {
      return 'ff-' + this.$store.state.currentFontFamily.toLowerCase().replace(/ /gi, '-');
    },
    className() {
      let temp = this.colorClass + ' ' + this.fontClass;
      temp = this.darkmode ? temp + ' theme-dark' : temp;
      return temp;
    }
  }
};
</script>
