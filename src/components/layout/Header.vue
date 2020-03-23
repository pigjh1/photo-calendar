<template>
  <header class="header">
    <router-link to="/">
      <img src="@/assets/icon/header/calendar.svg" alt="">
      <span class="a11y">캘린더</span>
    </router-link>
    <router-link to="/list">
      <img src="@/assets/icon/header/list.svg" alt="">
      <span class="a11y">목록</span>
    </router-link>
    <router-link to="/analysis">
      <img src="@/assets/icon/header/analysis.svg" alt="">
      <span class="a11y">통계</span>
    </router-link>
    <router-link to="/setting">
      <img src="@/assets/icon/header/setting.svg" alt="">
      <span class="a11y">설정</span>
    </router-link>
  </header>
</template>
