import Vue from 'vue'
import App from './App.vue'
import router from './router'
import routerShouWei from './router/shouWei.js'
import store from './store'

import sendXHR from '@/api'
Vue.prototype.$sendXHR = sendXHR;

Vue.config.productionTip = false;
router.beforeEach(routerShouWei);

import VueCookies from 'vue-cookies'
Vue.use(VueCookies);

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')