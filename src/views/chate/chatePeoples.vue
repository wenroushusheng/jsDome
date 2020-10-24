<template>
  <div class="chate--peoples">
    <div class="chateing item">
      <span>聊天</span>
    </div>
    <div class="followers item">
      <span>粉丝</span>
    </div>
    <div class="followings item">
      <span>关注</span>
      <ul>
        <li></li>
      </ul>
    </div>
  </div>
</template>

<script>
import { moveBox, getElm, EventHandle } from "@/util/bomDom.js";
import { fangdou, emptyF } from "@/util/es.js";
import msgList from "./msgList.vue";
import sendXHR from "@/api";
import $store from "@/store";

export default {
  components: {
    msgList,
  },
  props: {},

  data() {
    return {};
  },
  methods: {},
  created() {
    const csrf_token = this.$store.state.login.bili_jct;
    const uid = this.$store.state.login.userId;
    initData(uid);
  },
};
function initData(vmid) {
  
  sendXHR("followers", {
    params: {
      vmid,
    },
  }).then((res) => {
    console.log(res);
  });
}
</script>

<style lang='scss'>
@import "@/assets/scss/base.scss";

.chate--peoples {
  margin-top: 40px;
  margin-left: 40px;
  .item {
    height: 3em;
    line-height: 3em;
    background-color: rgba(80, 44, 44, 0.164);
  }
  .followers {
  }
  .followings {
  }
}
</style>