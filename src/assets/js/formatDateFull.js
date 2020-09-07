import UtilDate from '@/assets/js/utilDate.js';

export default (value = '') => {
  if (value) {
    const newdate = new Date(value.replace(/\./g, '-'));
    return UtilDate.formatDate(newdate, 'yyyy.MM.dd.DAY');
  }
};
