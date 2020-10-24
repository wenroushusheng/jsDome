 //反柯里化
 Function.prototype.uncurrying = function () {
   return (...args) => this.call(...args)
 }
 // 添加Map原型方法
 Map.prototype.map = function (cb, thisArg) {
   const res = new Map();
   for (const item of this) {
     let [key, val] = cb.call(thisArg, item[1], item[0], res);
     res.set(key, val);
   }
   return res;
 }

 Map.prototype.from = function (iterable) {
   const res = new Map;
   Array.from(iterable)
     .forEach((item, index) => res.set(index, item))
   return res;
 }
 Map.prototype.filter = function (cb, thisArg) {
   const res = new Map;
   for (const item of this) {
     let val = item[1],
       key = item[0];
     cb.call(thisArg, val, key, res) && res.set(key, val);
   }
   return res;
 }
 // 柯里化实例
 export const indexOf = Array.prototype.indexOf.uncurrying();
 export const toString = Object.prototype.toString.uncurrying();
 export const concat = Array.prototype.concat.uncurrying();
 // 防抖
 export function fangdou(fn, time = 590, thisArg) {
   let timer = 0;
   return function (...args) {
     let now = Date.now();
     if (now - timer > time) {
       timer = now;
       fn.apply(thisArg || this, args);
     }
   }
 }
 export function typeofVar(variable, type) {
   return type === toString(variable)
     .match(/\[object (.*?)\]/)[1]
     .toLowerCase();
 }

 // 获取对象自身属性值
 export function getObjOwnVal(obj, key, isEnumerable = true) {
   return (getObjOwnKeyArr(obj, isEnumerable).includes(key) ||
     undefined) && obj[key];
 }

 // 获取对象自身属性
 export function getObjOwnKeyArr(obj, isEnumerable = true) {
   return isEnumerable ?
     Object.keys(obj) :
     Object.getOwnPropertyNames(obj);
 }

 // 转为驼峰
 export function rePlaceKC(str, regex) {
   return str.replace(regex, function (all, letter) {
     return letter.toUpperCase();
   });
 }
 // 重置定时器
 export function resetTimeLoop(fn, time) {
   let timer = undefined;
   return function () {
     clearInterval(timer);
     timer = setInterval(fn, time);
   };
 }
 export function emptyF(_) {
   return emptyF;
 }