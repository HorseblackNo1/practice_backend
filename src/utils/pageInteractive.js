import { ElMessage } from 'element-plus'

/**  
 * msg: show input content
 * type：success、warning、message、error
*/
const showToast = (data) => {
  
  if (!data) return;
  ElMessage({
    message: data.text ? data.text : "",
    type: data.type ? data.type : "message",
  });
};
const formatDateUTC = () => {
  const date = new Date();
  const _date = date.toUTCString();

  return _date;
};

//localStorage:set get remove clear
const setLocalStorage = (key, data) => {
  let dataJson = JSON.stringify(data);
  localStorage.setItem(key, dataJson);
};
const getLocalStorage = (key) => {
  let dataJSON = localStorage.getItem(key);
  return JSON.parse(dataJSON);
};
const romoveLocalStorage = (key) => {
  localStorage.removeItem(key);
};
const clearLocalStorage = () => {
  localStorage.clear();
};

//sessionStorage:set get remove clear
const setSessionStorage = (key, data) => {
  let dataJson = JSON.stringify(data);
  sessionStorage.setItem(key, dataJson);
};
const getSessionStorage = (key) => {
  let dataJSON = sessionStorage.getItem(key);
  return JSON.parse(dataJSON);
};
const romoveSessionStorage = (key) => {
  sessionStorage.removeItem(key);
};
const clearSessionStorage = () => {
  SessionStorage.clear();
};

// 获取user-agent
const getUA = () => {
  return navigator.userAgent.toLowerCase();
};
// 获取当前环境 lark:飞书， browser:浏览器
const getCurrEnvironment = () => {
  let environment = "";
  let ua = getUA();
  if (ua.includes("lark")) {
    environment = "lark";
  } else {
    environment = "browser";
  }
  return environment;
};






export { 
  showToast,
  getCurrEnvironment,
  setLocalStorage,
  getLocalStorage,
  romoveLocalStorage,
  clearLocalStorage,
  setSessionStorage,
  getSessionStorage,
  romoveSessionStorage,
  clearSessionStorage,


  formatDateUTC,
};
