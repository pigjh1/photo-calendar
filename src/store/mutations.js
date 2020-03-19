export default {
  // list
  setupItem: (state, payload) => {
    state.newItems = payload;
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

  changeFilterCollapsed: (state, payload) => {
    if (payload) payload = !state.filtering.filterCollapsed;
    state.filtering.filterCollapsed = payload;
  },
  changeImgType: (state, payload) => {
    state.filtering.imgType = payload;
  },
  changeTableType: (state, payload) => {
    state.filtering.tableType = payload;
  },
  changeWatchingType: (state, payload) => {
    state.filtering.watchingType = payload;
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
    state.filtering.imgType = false;
    state.filtering.tableType = false;
    state.filtering.watchingType = false;
    state.filtering.sortType = 'date';
    state.filtering.search.title = '';
    state.filtering.search.actor = '';
    state.filtering.search.place = '';
  },

  // setting
  changeUserName: (state, payload) => {
    state.username = payload;
  },
  changeUserdata: (state, payload) => {
    if (typeof payload !== 'undefined' && payload !== null && payload !== '') {
      state.userdata = payload;
      alert('데이터가 변경되었습니다.');
    }
  },
  changeTheme: (state, payload) => {
    state.darkmode = payload;
  },
  changeColor: (state, payload) => {
    state.currentColor = payload;
  },
  changeFontFamily: (state, payload) => {
    state.currentFontFamily = payload;
  },
  changePost: (state, payload) => {
    state.currentPosterType = payload;
  },
  changeChartColor: (state, payload) => {
    state.currentChartColor = payload;
  }
};
