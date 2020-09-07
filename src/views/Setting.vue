<template>
  <div class="setting l-wrap">
    <h2 class="a11y">설정</h2>
    <div class="tit">
      <img src="@/assets/logo.svg" alt="">
      <p><strong>* 모든 설정은 저장되지 않고 페이지를 새로고침하면 초기화 됩니다. *</strong></p>
    </div>

    <hr>

    <h3>데이터 변경</h3>
    <div class="l-flex">
      <div class="t">사용자</div>
      <div class="cont">
        <input type="text" v-model="username">
      </div>
    </div>
    <div class="l-flex">
      <div class="t">목록</div>
      <SettingUserData />
    </div>
    <div class="l-flex">
      <div class="t">다관람</div>
      <SettingTurning />
    </div>
    <div class="l-flex">
      <div class="t">통계기간</div>
      <SettingAnalysis />
    </div>

    <hr>

    <h3>디자인 변경</h3>
    <div class="l-flex">
      <div class="t">어두운 테마</div>
      <SettingTheme />
    </div>
    <div class="l-flex">
      <div class="t">글꼴</div>
      <SettingFont />
    </div>
    <div class="l-flex">
      <div class="t">캘린더 이미지</div>
      <SettingPoster />
    </div>
    <div class="l-flex">
      <div class="t">대표 색상</div>
      <SettingColor />
    </div>
    <div class="l-flex">
      <div class="t">차트 색상</div>
      <SettingChartColor />
    </div>
  </div>
</template>

<script>
import SettingUserData from '@/components/setting/SettingUserData';
import SettingTurning from '@/components/setting/SettingTurning';
import SettingAnalysis from '@/components/setting/SettingAnalysis';

import SettingTheme from '@/components/setting/SettingTheme';
import SettingFont from '@/components/setting/SettingFont';
import SettingPoster from '@/components/setting/SettingPoster';
import SettingColor from '@/components/setting/SettingColor';
import SettingChartColor from '@/components/setting/SettingChartColor';

export default {
  components: {
    SettingUserData,
    SettingTurning,
    SettingAnalysis,

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
    }
  }
};
</script>
