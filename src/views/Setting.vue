<template>
  <div class="setting">
    <h2 class="a11y">설정</h2>

    <p><u>모든 설정은 저장되지 않습니다. 페이지를 새로고침하면 초기화됩니다.</u></p>

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
        <setting-user-data />
        <p><a href="/sample.xlsx" download="sample.xlsx" class="btn btn--sm">엑셀 샘플 파일 다운로드</a></p>
        <ul>
          <li>양식에 맞게 입력하세요</li>
          <li>'List' 시트명을 변경하지 마세요</li>
          <li>id, 분류, 제목, 날짜 필수 입력</li>
          <li>id값은 숫자로 중복되지 않게 입력해주세요</li>
          <li>제목등에 쉼표(,) 가 있으면 안됩니다</li>
          <li>출연진 구분은 '/' 로 해주세요</li>
        </ul>
      </div>
    </div>

    <hr>

    <h3>디자인 변경</h3>
    <div class="row">
      <div class="col-2">어두운 테마</div>
      <div class="col-10">
        <setting-theme />
      </div>
    </div>

    <div class="row">
      <div class="col-2">대표 색상</div>
      <div class="col-10">
        <setting-color />
      </div>
    </div>

    <div class="row">
      <div class="col-2">글꼴</div>
      <div class="col-10">
        <setting-font />
      </div>
    </div>

    <div class="row">
      <div class="col-2">캘린더 이미지</div>
      <div class="col-10">
        <setting-poster />
      </div>
    </div>

    <div class="row">
      <div class="col-2">차트 색상</div>
      <div class="col-10">
        <setting-chart-color />
      </div>
    </div>
  </div>
</template>

<script>
import SettingUserData from '@/components/setting/SettingUserData';

import SettingTheme from '@/components/setting/SettingTheme';
import SettingColor from '@/components/setting/SettingColor';
import SettingFont from '@/components/setting/SettingFont';
import SettingPoster from '@/components/setting/SettingPoster';
import SettingChartColor from '@/components/setting/SettingChartColor';

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
    }
  }
};
</script>

<style lang="scss" scoped>
p { margin: 10px 0; }
ul { margin: 20px; }
li { font-size: 11px; list-style: disc; margin-bottom: 2px; }
</style>
