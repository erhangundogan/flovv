const saveDeskToStorage = (items) => {
  localStorage.setItem('collection', JSON.stringify(items));
};

export default saveDeskToStorage;
