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
        <ul>
          <li>양식에 맞게 입력하세요</li>
          <li>'List' 시트명을 변경하지 마세요</li>
          <li>id, 분류, 제목, 날짜 필수 입력</li>
          <li>id값은 숫자로 중복되지 않게 입력해주세요</li>
          <li>제목등에 쉼표(,) 가 있으면 안됩니다</li>
          <li>분류, 출연진 구분은 '/' 로 해주세요</li>
        </ul>
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
      <div class="col-2">대표 색상</div>
      <div class="col-10">
        <SettingColor />
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
import SettingColor from '@/components/SettingColor';
import SettingFont from '@/components/SettingFont';
import SettingPoster from '@/components/SettingPoster';
import SettingChartColor from '@/components/SettingChartColor';

export default {
  components: {
    SettingUserData,
    SettingTheme,
    SettingColor,
    SettingFont,
    SettingPoster,
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

<style lang="scss" scoped>
p { margin: 10px 0; }
ul { margin: 20px; }
li { font-size: 11px; list-style: disc; margin-bottom: 2px; }
</style>
