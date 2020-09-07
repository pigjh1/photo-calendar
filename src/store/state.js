import dataJson from '@/assets/my-data.json';

export default {
  today: new Date(),
  weekNames: ['월', '화', '수', '목', '금', '토', '일'],
  monthNames: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
  username: '나덕후',
  userData: dataJson,
  userItems: '',
  yearType: false,
  listType: {
    table: false,
    img: false,
    watching: false,
    collapsed: false
  },
  filtering: {
    sortType: 'date',
    sorts: [
      { text: '관람일', value: 'date' },
      { text: '제목', value: 'title' },
      { text: '장소', value: 'place' },
      { text: '가격', value: 'price' }
    ],
    search: {
      title: '',
      actor: '',
      place: ''
    },
    filters: {
      category: {},
      year: {}
    }
  },
  turning: {
    least: 2,
    title: '',
    caldate: '',
    orderByDate: true,
    blackMode: true
  },
  analysis: {
    rangeFrom: '2018-01-01',
    rangeTo: '2020-12-31'
  },
  design: {
    darkmode: false,
    primaryColor: 3,
    colorList: [
      '#f3a683', '#f7d794', '#778beb', '#e77f67', '#cf6a87',
      '#f19066', '#f5cd79', '#546de5', '#e15f41', '#c44569',
      '#786fa6', '#f8a5c2', '#63cdda', '#ea8685', '#596275',
      '#574b90', '#f78fb3', '#3dc1d3', '#e66767', '#303952'
    ],
    fontFamily: 'Noto Sans KR',
    posterType: 'horizontal', // vertical, horizontal
    chartIndex: 0,
    chartColor: [
      ['#f16e74', '#e56246', '#de9562', '#9cad50', '#348388', '#4073b2', '#4f3f7e', '#4caf50', '#cddc39', '#607d8b'],
      ['#fe4a49', '#2ab7ca', '#fed766', '#00b159', '#00aedb', '#f37735', '#ffc425', '#d11141', '#e6e6ea', '#f4f4f8'],
      ['#ee4035', '#f37736', '#fdf498', '#7bc043', '#0392cf', '#2a4d69', '#4b86b4', '#adcbe3', '#63ace5', '#e7eff6'],
      ['#96ceb4', '#ffeead', '#ff6f69', '#ffcc5c', '#88d8b0', '#edc951', '#eb6841', '#cc2a36', '#4f372d', '#00a0b0']
    ]
  }
};
