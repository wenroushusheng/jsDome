import Vue from 'vue'
import Vuex from 'vuex'
import login from './login.js'
import queryKey from './queryKey.js'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    chatState: false,
    suoDuan: false,
    queryKeyModal: false,
    isShowTip: false,
    updata: function (_x) {
      ;
    }
  },
  mutations: {
    changeChatState(state) {
      state.chatState = !state.chatState
    },
    changeSuoDuanState(state) {
      state.suoDuan = !state.suoDuan
    },
    changeQueryKeyModal(state) {
      state.queryKeyModal = !state.queryKeyModal
    },
    isShowTip(state) {
      state.isShowTip = !state.isShowTip;
    },
    initUpdata(state, fn) {
      state.updata = fn;
    },
    updata(state) {
      state.updata();
    },
  },
  actions: {
  },
  modules: {
    login,
    queryKey
  }
})
 