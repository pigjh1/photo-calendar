<template>
  <div class="analysis">
    <h2>{{ username }}님의 관람 통계</h2>

    <Summary />

    <div class="analysis-wrap">
      <div class="item">
        <h3>월별 관람 수</h3>
        <ChartVisits />
      </div>
      <div class="item">
        <h3>월별 관람금액</h3>
        <ChartAmount />
      </div>
      <div class="item">
        <h3>요일별 관람 수</h3>
        <ChartViewingDay />
      </div>
      <div class="item">
        <h3>유형별 선호도</h3>
        <ChartCategory />
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
        <br><br><br>
        <h3>선호 예매처</h3>
        <Wordcloud type="office" />
      </div>
    </div>
  </div>
</template>

<script>
import Summary from '@/components/SummaryAnalysis';
import ChartVisits from '@/components/chart/ChartVisits';
import ChartAmount from '@/components/chart/ChartAmount';
import ChartViewingDay from '@/components/chart/ChartViewingDay';
import ChartCategory from '@/components/chart/ChartCategory';
import Wordcloud from '@/components/Wordcloud';

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
