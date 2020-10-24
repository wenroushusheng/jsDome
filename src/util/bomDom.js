import {
  emptyF
} from './es.js';

export const clientW = document.documentElement.clientWidth;
export const clientH = document.documentElement.clientHeight

export const $ = (el, isAll = true) => {
  document.getElementsByClassName
  return isAll ? 1 :
    document.querySelector(el)
}
export function getElm(el) {
  return typeof el === 'string' ? document.querySelector(el) : el;
}
export const getElms = (...els) => els.map(el => getElm(el));

/**
 * @function 增删元素的类名，有则删除，无则添加
 * @param {String|Document} elm 被操作的元素
 * @param {String|Document} cN  被增删的类名  注意可能要添加空格分开多个类名
 * @return {String} className  该元素的新类名
 */
export function changeElCN(elm, cN) {
  const el = getElm(elm);
  const elCN = el.className;
  return el.className =
    elCN.indexOf(cN) > -1 ? elCN.replace(new RegExp(cN, "g"), "") : elCN + cN;
}

export function elmMethod(el, method, ...args) {
  const elm = typeof el == "string" ? document.querySelector(el) : el;
  return elm[method](...args);
}
export function getElmRect(el, Rect) {
  const elm = typeof el === 'string' ?
    document.querySelector(el) : el;
  return elm.getBoundingClientRect()[Rect];
}

export const EventHandle = (elm, type, handle, capture = false) => {
  const el = getElm(elm)
  el.addEventListener(type, handle, capture);
  return function (capture) {
    el.removeEventListener(type, handle, capture);
  };
}

/**
 * @function  盒子移动到可视区外  
 * @param {String|Document} elm 被移动的元素  
 * @param {Number} [x]  移动到左或右的基值  
 */
export let hideBox = ((clientW) => {
  return (elm, x = 0.4) => {
    const el = getElm(elm),
      isLeft = el.offsetLeft <= clientW * x;
    el.style.left = isLeft ? "-" + (el.offsetWidth + 10) + "px" : "101vw";
  }
})(clientW);

// 盒子移动到可视区内
export function showBox(elm, left, top) {
  const style = getElm(elm).style;
  style.left = left + "px";
  style.top = top + "px";
}

/**
 * @function  moveBox 拖拽盒子 使盒子随鼠标移动，提供三个钩子函数，支持提前结束，支持X/Y单轴拖到，结束拖拽时自动移除监听；
 *  建议：使用mousedown来触发拖拽、 被拖拽的元素禁止H5的拖放 ondragstart = "return false;"
 * @param {String|Document} elMove 被拖拽移动的元素  
 * @param {String|Document} elListenenr 触发拖拽的元素
 * @param {Number} initX 触发拖拽时的横坐标值  通常来自于触发拖拽时的e.clientX
 * @param {Number} initY 触发拖拽时的纵坐标值  通常来自于触发拖拽时的e.clientY
 * @param {Object} [param4] 钩子函数: 拖拽前初始化、拖拽中、拖拽结束后；参数均为：elMove、elListenenr、x,y;拖拽钩子提供参数5函数，可提前结束拖拽
 * @return {Document} Element 被移动的盒子
 */

export function moveBox(
  elMove, elListenenr, initX, initY,
  { beforeCb = emptyF, moveCb = emptyF, endCb = emptyF } = {}
) {
  let
    [elM, elL] = getElms(elMove, elListenenr),
    elMFn = changeElLT(elM, initX, initY),
    moveEnd = (x, y) => {
      removeMoveL();
      endCb(elM, elL, x, y);
      removeAll();
      moveEnd = emptyF;
      removeMoveL = null;
      removeAll = null;
    },
    moveing = (x, y) => {
      moveCb(elM, elL, x, y, () => moveEnd(x, y))
      elMFn(x, y);
    };
  beforeCb(elM, elL);
  let removeMoveL = mmL(moveing);
  let removeAll = mmLR(moveEnd);
}

export const mmL = function (moveingCb) {
  let moveBox = (e) => moveingCb(e.clientX, e.clientY)
  document.body.addEventListener("mousemove", moveBox);
  return () => document.body.removeEventListener("mousemove", moveBox);
}

const mmLR = function (cb) {
  let fn = (e) => cb(e.clientX, e.clientY);
  document.body.addEventListener("mouseup", fn);
  return () => document.body.removeEventListener("mouseup", fn);
}

function changeElLT(el, initX, initY) {
  const { offsetLeft, offsetTop, style } = el;
  return function (x, y) {
    style.left = offsetLeft + (x - initX) + "px";
    style.top = offsetTop + (y - initY) + "px";
  };
}

// 全局鼠标移动事件
export function moL(cb) {
  document.body.addEventListener("mouseover", cb);
  return () => document.body.removeEventListener("mouseover", cb);
}




