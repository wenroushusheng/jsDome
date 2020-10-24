export default {
  state: {
    user: true,
    userId:  76973392,
    bili_jct: "175d37b1744d98aa2213623d0325f427",
    uface: '',
  },
  mutations: {
    userLogin(state, arg) {
      state.user = true;
      state.userId = arg[0];
      state.bili_jct = arg[1];
    },
    setUFace(state, url) {
      state.uface = url;
    },
  },
  actions: {
    userLogin(context, arg) {
      context.commit('userLogin', arg);
    },
  },
}