import {
  rePlaceKC
} from '@/util/es.js';

let getElmDataset = function (el) {
  return (getElmDataset = el.dataset ? (el) => el.dataset : getData)(el)
}

export default function getData(el) {
  return el.dataset || initData(el).dataset;
}


function initData(el) {
   el.dataset = {};
  Array.prototype.slice.call(el.attributes)
    .filter(attr => attr.name.match(/^data-(.+)/))
    .map(attr => [attr.name.slice(7), attr.nodeValue])
    .forEach(item => el.dataset[rePlaceKC(item[0], /-([\da-z])/gi)] = item[1]);
  return el;
}