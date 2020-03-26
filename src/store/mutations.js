export default {
  // List
  // -----------------------------------------------------------------------------

  // List > Data Setup
  setupItem: (state, payload) => {
    state.userItems = payload;
  },
  setupFilters: (state, payload) => {
    if (Object.values(state.filtering.filters.category).length === 0) {
      state.filtering.filters = payload;
    }
  },
  resetFilters: (state) => {
    state.filtering.category = {};
    state.filtering.year = {};
  },

  // List > Data Change
  changeTableType: (state, payload) => {
    state.listType.table = payload;
  },
  changeImgType: (state, payload) => {
    state.listType.img = payload;
  },
  changeWatchingType: (state, payload) => {
    state.listType.watching = payload;
  },
  changeCollapsed: (state, payload) => {
    if (payload) payload = !state.listType.collapsed;
    state.listType.collapsed = payload;
  },

  changeSortType: (state, payload) => {
    state.filtering.sortType = payload;
  },
  changeSorts: (state, payload) => {
    state.filtering.sorts = payload;
  },
  changeFilters: (state, payload) => {
    state.filtering.filters = payload;
  },
  changeSearchTitle: (state, payload) => {
    state.filtering.search.title = payload;
  },
  changeSearchActor: (state, payload) => {
    state.filtering.search.actor = payload;
  },
  changeSearchPlace: (state, payload) => {
    state.filtering.search.place = payload;
  },
  clearAllFilters: (state) => {
    state.listType.img = false;
    state.listType.table = false;
    state.listType.watching = false;
    state.filtering.sortType = 'date';
    state.filtering.search.title = '';
    state.filtering.search.actor = '';
    state.filtering.search.place = '';
  },

  // Turning
  // -----------------------------------------------------------------------------
  changeTurningLeast: (state, payload) => {
    state.turning.least = payload;
  },
  changeTurningTitle: (state, payload) => {
    state.turning.title = payload;
  },
  changeCaldate: (state, payload) => {
    state.turning.caldate = payload;
  },
  changeTurningBlackmode: (state, payload) => {
    state.turning.blackmode = payload;
  },

  // Setting
  // -----------------------------------------------------------------------------

  // Setting > Data
  changeUserName: (state, payload) => {
    state.username = payload;
  },
  changeUserdata: (state, payload) => {
    if (typeof payload !== 'undefined' && payload !== null && payload !== '') {
      state.userdata = payload;
      alert('데이터가 변경되었습니다.');
    }
  },

  // Setting > Design
  changeTheme: (state, payload) => {
    document.body.classList.toggle('theme-dark');
    state.design.darkmode = payload;
  },
  changePrimaryColor: (state, payload) => {
    state.design.primaryColor = payload;
  },
  changeFontFamily: (state, payload) => {
    state.design.fontFamily = payload;
  },
  changePost: (state, payload) => {
    state.design.posterType = payload;
  },
  changeChartColor: (state, payload) => {
    state.design.chartIndex = payload;
  }
};
