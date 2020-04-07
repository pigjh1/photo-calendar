import UtilColor from '@/assets/js/utilColor.js';

export default {
  // List
  // -----------------------------------------------------------------------------
  turningCate: state => {
    const userdata = state.userdata,
      newdata = [];
    let data = [], obj = {};

    for (let i = 0; i < userdata.length; i++) {
      const title = userdata[i].title;

      data = data.concat(title);
    }

    data.forEach(el => {
      el = el.replace(/^\s+|\s+$/g, '');
      newdata.push(el);
    });

    obj = newdata.sort().reduce((x, y) => {
      x[y] = ++x[y] || 1;
      return x;
    }, {});

    return obj;
  },

  sortItems: state => {
    const userdata = state.userdata,
      data = userdata.sort((a, b) => a.date > b.date ? -1 : 1);

    return data.sort((a, b) => {
      if (a.date === b.date) {
        return a.time < b.time ? -1 : 1;
      }
    });
  },

  filterItems: state => {
    const activeCategory = state.filtering.filters.category,
      activeYaer = state.filtering.filters.year,
      category = Object.keys(activeCategory).filter(c => activeCategory[c]),
      year = Object.keys(activeYaer).filter(c => activeYaer[c]);
    let items = state.userItems;

    // 정렬
    items = items.sort((a, b) => {
      switch (state.filtering.sortType) {
      case 'title':
        return a.title > b.title ? 1 : -1;
      case 'place':
        return a.place > b.place ? 1 : -1;
      case 'price':
        if (b.price) {
          return b.price - a.price;
        } else {
          return -1;
        }
      default:
        return a.date > b.date ? -1 : 1;
      }
    });

    // 분류
    items = items.filter(({ cate, datayear }) => {
      if (category.length) {
        if (cate.includes('/')) {
          let st = true;
          for (const key in category) {
            if (st) {
              st = !~cate.indexOf(category[key]);
            }
            return !st;
          }
        } else {
          if (!~category.indexOf(cate)) return false;
        }
      }
      return (
        !year.length || year.every(cat => ~datayear.indexOf(cat))
      );
    });

    // 검색어
    if (state.filtering.search.title) {
      items = items.filter(obj => {
        return obj.title.includes(state.filtering.search.title);
      });
    }

    if (state.filtering.search.actor) {
      items = items.filter(obj => {
        const item = obj.actor;

        if (typeof item !== 'undefined' && item !== null && item !== '') {
          return item.includes(state.filtering.search.actor);
        } else {
          return false;
        }
      });
    }

    if (state.filtering.search.place) {
      items = items.filter(obj => {
        const item = obj.place;

        if (typeof item !== 'undefined' && item !== null && item !== '') {
          return item.includes(state.filtering.search.place);
        } else {
          return false;
        }
      });
    }

    // 이미지 타입 : 제목 중복 제거
    if (state.listType.img) {
      items = items.reduce((prev, now) => {
        if (!prev.some(obj => obj.title === now.title)) {
          prev.push(now);
        }
        return prev;
      }, []);
    }

    // 관람 예정작만 보기
    if (state.listType.watching) {
      items = items.filter(obj => {
        return new Date(obj.date) >= state.today;
      });
    }

    return items;
  },

  turningItems: state => {
    let items = state.userItems;

    if (state.turning.title) {
      items = items.filter(obj => {
        return obj.title === state.turning.title;
      });
    }

    return items;
  },

  // Setting
  // -----------------------------------------------------------------------------
  chartColor1: state => {
    const color = state.design.colorList[state.design.primaryColor],
      colorRgb = UtilColor.hexToRgb(color).split(','),
      arr = [];

    for (let i = 1; i < 11; i++) {
      const last = parseInt(colorRgb[1]) + (i * 8),
        newColor = `${colorRgb[0]}, ${last},${colorRgb[2]}`,
        idx = i - 1;

      arr[idx] = UtilColor.rgbToHex(newColor);
    }

    return arr;
  },

  chartColor2: state => {
    return state.design.chartColor[state.design.chartIndex];
  },

  chartOptions1: state => {
    const font = state.design.fontFamily;

    return {
      responsive: true,
      maintainAspectRatio: false,
      legend: {
        position: 'right',
        fontFamily: font,
        labels: {
          fontFamily: font
        }
      },
      label: {
        fontFamily: font
      },
      title: {
        fontFamily: font
      },
      tooltips: {
        titleFontFamily: font,
        bodyFontFamily: font,
        callbacks: {
          label: function(tooltipItem) {
            return tooltipItem.yLabel.toLocaleString();
          }
        }
      },
      scales: {
        yAxes: [{
          ticks: {
            fontFamily: font,
            userCallback: function(value) {
              return value.toLocaleString(); // , 콤마처리
            }
          }
        }],
        xAxes: [{
          ticks: {
            fontFamily: font
          }
        }]
      }
    };
  },
  chartOptions2: state => {
    const font = state.design.fontFamily;

    return {
      responsive: true,
      maintainAspectRatio: false,
      legend: {
        position: 'right',
        fontFamily: font,
        labels: {
          fontFamily: font
        }
      },
      label: {
        fontFamily: font
      },
      title: {
        fontFamily: font
      },
      tooltips: {
        titleFontFamily: font,
        bodyFontFamily: font
      }
    };
  }
};
