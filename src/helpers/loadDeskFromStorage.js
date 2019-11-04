const loadDeskFromStorage = () => {
  return JSON.parse(localStorage.getItem('collection'));
};

export default loadDeskFromStorage;
