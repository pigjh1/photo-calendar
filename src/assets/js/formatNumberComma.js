export default (value = '') => {
  if (value) {
    return parseInt(value).toLocaleString();
  }
};
