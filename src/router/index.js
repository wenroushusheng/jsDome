import Vue from 'vue'
import VueRouter from 'vue-router'
import dashboard from '../views/dashboard.vue'

import {  slideNavList } from "@/assets/stateDate.js";
let routerOptions = slideNavList.slice(1);

Vue.use(VueRouter);
const routes = [{
    path: '/',
    redirect: '/dashboard'
  },
  {
    path: '*',
    redirect: '/dashboard'
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: dashboard
  },
  ...setSliderPath(routerOptions, true)
];

export default new VueRouter({
  routes
})


function setSliderPath(routerArr, root = false) {
  return routerArr
    .map(item => item.slice(1))
    .map(item => getRouterPath(item[0], root, item[1]))
    .map((item) => setChild(item))
}

function getRouterPath(router, root = false, children) {
  let path = root ? '/' : "";
  return {
    path: path + router,
    name: router,
    component: () => import(`../views/${router}.vue`),
    children: children,
  }
}

function setChild(item) {
  if (item.children) {
    item.children = setSliderPath(item.children);
    item.redirect = item.path + '/' + item.children[0].path;
  }
  return item
}