<template >
  <div id="app">
    <login v-if="!$store.state.login.user" />
    <div v-else>
      <top />
      <index />
      <chate />
      <tip
        :is-show-modal="$store.state.isShowTip"
        title="页面提示"
        :btn-num="['回到首页', '留着当前页面']"
        @tip-click="changetTpClick"
      >
        <template v-slot:body>
          <span>该页面尚未开发，敬请期待</span>
        </template>
      </tip>
    </div>
  </div>
</template>

<script>
import top from "@/views/top.vue";
import index from "@/views/index.vue";
import chate from "@/views/chate.vue";
import login from "@/views/login.vue";
import tip from "@/components/tip.vue";
import { fangdou } from "@/util/es.js";
import { mapMutations } from "vuex";

export default {
  components: {
    chate,
    index,
    top,
    login,
    tip,
  },
  methods: {
    ...mapMutations(["isShowTip", "execuQK"]),
    changetTpClick([e, type]) {
      this.isShowTip();
      type == 0 && this.$router.push({ name: "dashboard" });
    },
  },
  mounted() {
    document.body.addEventListener("keyup", fangdou(this.execuQK, 410));
  },
};
</script>

<style lang='scss'>
@import "./assets/scss/reset.scss";
body {
  overflow: hidden;
}
</style>