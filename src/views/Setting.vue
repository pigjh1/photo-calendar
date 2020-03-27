<template>
  <div class="setting">
    <h2 class="a11y">설정</h2>
    <div class="tit">
      <img src="@/assets/logo.svg" alt="">
      <p><strong>* 모든 설정은 저장되지 않습니다. 페이지를 새로고침하면 초기화 됩니다. *</strong></p>
    </div>

    <hr>

    <h3>데이터 변경</h3>
    <div class="row">
      <div class="col-2">사용자</div>
      <div class="col-10">
        <input type="text" v-model="username">
      </div>
    </div>
    <div class="row">
      <div class="col-2">목록</div>
      <div class="col-10">
        <SettingUserData />
        <p><a href="/sample.xlsx" download="sample.xlsx" class="btn btn--primary btn--sm">엑셀 샘플 파일 다운로드</a></p>
      </div>
    </div>
    <div class="row">
      <div class="col-2">다관람</div>
      <div class="col-10">
        <input type="number" min="2" v-model="turningLeast"> 회 이상 본 작품을 메뉴에서 보여줍니다
      </div>
    </div>

    <hr>

    <h3>디자인 변경</h3>
    <div class="row">
      <div class="col-2">어두운 테마</div>
      <div class="col-10">
        <SettingTheme />
      </div>
    </div>
    <div class="row">
      <div class="col-2">글꼴</div>
      <div class="col-10">
        <SettingFont />
      </div>
    </div>
    <div class="row">
      <div class="col-2">캘린더 이미지</div>
      <div class="col-10">
        <SettingPoster />
      </div>
    </div>
    <div class="row">
      <div class="col-2">대표 색상</div>
      <div class="col-10">
        <SettingColor />
      </div>
    </div>
    <div class="row">
      <div class="col-2">차트 색상</div>
      <div class="col-10">
        <SettingChartColor />
      </div>
    </div>
  </div>
</template>

<script>
import SettingUserData from '@/components/SettingUserData';

import SettingTheme from '@/components/SettingTheme';
import SettingFont from '@/components/SettingFont';
import SettingPoster from '@/components/SettingPoster';
import SettingColor from '@/components/SettingColor';
import SettingChartColor from '@/components/SettingChartColor';

export default {
  components: {
    SettingUserData,

    SettingTheme,
    SettingFont,
    SettingPoster,
    SettingColor,
    SettingChartColor
  },
  computed: {
    username: {
      get() {
        return this.$store.state.username;
      },
      set(value) {
        this.$store.commit('changeUserName', value);
      }
    },
    turningLeast: {
      get() {
        return this.$store.state.turning.least;
      },
      set(value) {
        this.$store.commit('changeTurningLeast', value);
      }
    }
  }
};
</script>
