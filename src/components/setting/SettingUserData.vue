<template>
  <div>
    <!-- <p><a href="/assets/data/sample.xlsx" download="sample.xlsx" class="btn">샘플 xlsx 파일 다운로드</a></p> -->
    <input type="file" @change="readFile" accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet">
    <button type="button" name="button" @click="changeUserdata(userData)" class="btn btn--em"><span>불러오기</span></button>
  </div>
</template>

<script>
import XLSX from 'xlsx';
import { mapMutations } from 'vuex';

export default {
  data() {
    return {
      keyArr: '',
      result: ''
    };
  },
  computed: {
    userData() {
      const data = [];

      if (this.result === '') return;

      this.result.forEach((el, i) => {
        const dataArr = el.toString().split(','),
          temp = {};

        if (i < 2) return; // 제목줄인 2개 제외

        dataArr.forEach((kk, index) => {
          let a = kk;
          if (index === 4) {
            a = this.getFormatDate(a);
          } else if (index === 5) {
            a = this.getFormatTime(a);
          }

          temp[this.keyArr[index]] = a;
        });

        data.push(temp);
      });

      return data;
    }
  },
  methods: {
    ...mapMutations(['editData', 'changeUserdata']),
    ...mapMutations({
      editData: 'editData',
      changeUserdata: 'changeUserdata'
    }),
    readFile(event) {
      const file = event.target.files[0],
        reader = new FileReader(),
        tmpResult = {};
      let result;

      reader.onload = (e) => {
        let data = e.target.result;
        data = new Uint8Array(data);
        const excelFile = XLSX.read(data, {
          type: 'array',
          cellDates: true
        });

        excelFile.SheetNames.forEach(sheetName => {
          const roa = XLSX.utils.sheet_to_json(
            excelFile.Sheets[sheetName], {
              header: 1
            }
          );
          if (roa.length) tmpResult[sheetName] = roa;
        });
        result = tmpResult.List; // 파일명.시트명

        this.keyArr = result[0];
        this.result = result;
      };

      reader.readAsArrayBuffer(file);
    },
    getFormatDate(date) {
      const ndate = new Date(date);
      let month, day;

      ndate.setMinutes(ndate.getMinutes() + 1); // 시간변환시 오차 발생 조정

      month = (1 + ndate.getMonth());
      day = ndate.getDate();

      month = month < 10 ? '0' + month : month;
      day = day < 10 ? '0' + day : day;
      return `${ndate.getFullYear()}-${month}-${day}`;
    },
    getFormatTime(date) {
      const ndate = new Date(date);
      let hours, minutes;

      ndate.setMinutes(ndate.getMinutes() - 27); // 시간변환시 오차 발생 조정

      hours = (1 + ndate.getHours());
      minutes = ndate.getMinutes();

      hours = hours < 10 ? '0' + hours : hours;
      minutes = minutes < 10 ? '0' + minutes : minutes;
      return `${hours}:${minutes}`;
    }
  }
};
</script>
