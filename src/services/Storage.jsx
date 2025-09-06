 const setItems = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

 const getItems = (key) => {
  const item = localStorage.getItem(key);
  return JSON.parse(item);
};

 const removeItems = (key) => {
  localStorage.removeItem(key);
};


export default { setItems, getItems, removeItems };