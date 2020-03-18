<template>
  <div class="analysis">
    <h2>{{ username }}님의 통계</h2>

    <Summary />

    <div class="analysis-wrap">
      <div class="item">
        <h3>월별 관람 수</h3>
        <chart-visits />
      </div>
      <div class="item">
        <h3>월별 관람금액</h3>
        <chart-amount />
      </div>
      <div class="item">
        <h3>요일별 관람 수</h3>
        <chart-viewingDay />
      </div>
      <div class="item">
        <h3>유형별 선호도</h3>
        <chart-category />
      </div>
    </div>

    <hr>

    <div class="analysis-wrap">
      <div class="item">
        <h3>선호 배우</h3>
        <Wordcloud type="actor" />
      </div>
      <div class="item">
        <h3>선호 극장</h3>
        <Wordcloud type="place" />
      </div>
    </div>
  </div>
</template>

<script>
import Summary from '@/components/analysis/Summary';
import ChartVisits from '@/components/analysis/ChartVisits';
import ChartAmount from '@/components/analysis/ChartAmount';
import ChartViewingDay from '@/components/analysis/ChartViewingDay';
import ChartCategory from '@/components/analysis/ChartCategory';
import Wordcloud from '@/components/analysis/Wordcloud';

export default {
  components: {
    Summary,
    ChartVisits,
    ChartAmount,
    ChartViewingDay,
    ChartCategory,
    Wordcloud
  },
  computed: {
    username() {
      return this.$store.state.username;
    }
  }
};
</script>
