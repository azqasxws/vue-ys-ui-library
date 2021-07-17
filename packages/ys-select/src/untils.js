// 防抖
function _debounce(fn, delay = 300) {
  var timer = null;
  return function () {
    var _this = this;
    var args = arguments;
    if (timer) clearTimeout(timer); 
    timer = setTimeout(function () {
      fn.apply(_this, args);
    }, delay);
  };
}
// 去重
function unique(arr,key) {
  let obj = {};
  let newarrList = arr.reduce((cur,next) => {
    obj[next[key]] ? "" : obj[next[key]] = true && cur.push(next);
    return cur;
  },[]);
  return newarrList
}
export default {
  _debounce,
  unique
};