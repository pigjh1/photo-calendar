<template>
  <div>
    <input type="file" @change="readFile" accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet">
    <button type="button" name="button" @click="changeUserdata()" class="btn btn--em"><span>불러오기</span></button>
  </div>
</template>

<script>
import UtilDate from '@/assets/js/utilDate.js';
import XLSX from 'xlsx';

export default {
  data() {
    return {
      keyArr: '',
      result: ''
    };
  },
  computed: {
    sortItems() {
      return this.$store.getters.sortItems;
    },
    turningCate() {
      return this.$store.getters.turningCate;
    },
    userItems() {
      const turning = this.turningCate;

      return this.sortItems.map((obj) => {
        const newObj = {};

        newObj.id = obj.id;
        newObj.img = obj.img;
        newObj.cate = obj.cate;
        newObj.title = obj.title;
        newObj.date = obj.date;
        newObj.time = obj.time;
        newObj.actor = obj.actor;
        newObj.place = obj.place;
        newObj.price = obj.price;
        newObj.office = obj.office;
        newObj.datayear = obj.date.replace('-', '').substr(0, 4);
        newObj.memo = obj.memo;

        for (const key in this.turningCate) {
          if (key === obj.title) {
            newObj.turning = turning[key];
            turning[key]--;
          }
        }
        return newObj;
      });
    },
    userData() {
      const data = [];

      if (this.result === '') return;

      this.result.forEach((el, i) => {
        const dataArr = el.toString().split(','),
          obj = {};

        if (i < 2) return; // 제목줄인 2개 제외

        dataArr.forEach((kk, index) => {
          let a = kk;
          if (index === 4) {
            a = this.getFormatDate(a);
          } else if (index === 5) {
            a = this.getFormatTime(a);
          }

          obj[this.keyArr[index]] = a;
        });

        data.push(obj);

        setTimeout(() => {
          this.$store.commit('setupItem', this.userItems);
        }, 100);
      });
      return data;
    }
  },
  methods: {
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
    changeUserdata() {
      this.$store.commit('changeUserdata', this.userData);
      this.$store.commit('resetFilters');
    },
    getFormatDate(date) {
      const ndate = new Date(date);

      ndate.setMinutes(ndate.getMinutes() + 1); // 시간변환시 오차 발생 조정

      return UtilDate.getDateFormat(ndate.getFullYear(), ndate.getMonth() + 1, ndate.getDate());
    },
    getFormatTime(date) {
      const ndate = new Date(date);

      ndate.setMinutes(ndate.getMinutes() - 27); // 시간변환시 오차 발생 조정

      return UtilDate.getTimeFormat(ndate.getHours() + 1, ndate.getMinutes());
    }
  }
};
</script>
