<template>
  <div class="chate">
    <div class="chat-img chat-img-on" id="chate-img">
      <img src="imgs/time-msg.png" @click="changeState(0)" alt="打开聊天框" />
    </div>

    <div class="chate-list hide" id="chate-list">
      <div
        ondragstart="return false;"
        class="list-top"
        id="list-top"
        @click="toMethod"
        v-change-class="{
          className: 'item',
          activeClass: 'checked',
          curIdx: idx,
        }"
        @mousedown.capture.stop.self="move"
      >
        <div class="item">聯係人</div>
        <div class="item">搜索</div>
      </div>
      <div class="list-main">
        <chate-peoples v-if="idx === 0" />
        <chate-search v-if="idx === 1" />
      </div>
    </div>

    <!-- <chate-msg
      :rFace="'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1602845927520&di=88e2441d95d07dcb893a1f11b3ea2559&imgtype=0&src=http%3A%2F%2Fa3.att.hudong.com%2F14%2F75%2F01300000164186121366756803686.jpg'"
      :rId="698118635"
    /> -->
  </div>
</template>

<script>
import { indexOf, fangdou, emptyF } from "@/util/es.js";
import {
  moveBox,
  EventHandle,
  hideBox,
  showBox,
  clientW,
  clientH,
  changeElCN,
  moL,
  getElm,
} from "@/util/bomDom.js";
import changeClass from "@/directives/changeClass.js";
import { mapState, mapMutations } from "vuex";
import chateMsg from "./chate/chateMsg.vue";
import chateSearch from "./chate/chateSearch.vue";
import chatePeoples from "./chate/chatePeoples.vue";

export default {
  directives: { changeClass },
  components: { chateMsg, chateSearch, chatePeoples },
  data() {
    return {
      unread: 0,
      showList: false,
      idx: 0,
      elL: 0,
      elT: 0,
      elW: 0,
      yinCang: emptyF,
      removeYinCang: emptyF,
      autoFn: emptyF,
    };
  },
  watch: {
    showList(val) {
      val ? showBox(".chate-list", this.elL, this.elT) : hideBox(".chate-list");
    },
  },
  methods: {
    init(clientW, clientH) {
      const elW = getElm(".chate-list").offsetWidth,
        elL = clientW * 0.75;
      this.elL = elL;
      this.elT = clientH * 0.15;
      this.elW = elW;
      this.hideAuto(elL);
    },

    move(e) {
      moveBox(".chate-list", ".list-top", e.clientX, e.clientY, {
        beforeCb(elM) {
          changeElCN(elM, " hide");
          elM.style["z-index"] = 5;
        },
        endCb: (elM) => {
          changeElCN(elM, " hide");
          elM.style["z-index"] = "";
          const nLeft = elM.offsetLeft;
          this.elL = nLeft;
          this.elT = elM.offsetTop;
          this.hideAside = nLeft >= clientW / 2 ? 1 : -1;
          this.hideAuto(nLeft);
        },
      });
    },

    toMethod(e) {
      const idx = indexOf(e.currentTarget.children, e.target);
      idx !== -1 && (this.idx = idx);
    },

    changeState(state = 0) {
      const newS = state === 0 ? !this.showList : state === 1 ? true : false;
      this.showList = newS;
    },

    hideAuto(left) {
      this.removeYinCang();
      if (left + this.elW >= clientW - 15 || left < 15) {
        this.removeYinCang = this.autoFn();
      }
    },

    changeAutoFn() {
      const oState = this.autoFn === emptyF;
      this.autoFn = oState ? this.yinCangL : emptyF;
      if (oState) {
        this.hideAuto(this.elL);
      } else {
        this.removeYinCang();
      }
    },

    yinCangL() {
      return moL(fangdou((e) => {
          let state;
          state =
            getX(clientW, this.elW, e.clientX) === this.hideAside ? 1 : -1;
          if (e.clientY > clientH * 0.9) {
            state = -1;
          }
          this.changeState(state);
        }, 50)
      );
    },

  },
  mounted() {
    this.init(clientW, clientH);
    this.$store.commit("setNewFn", ["shiftA", this.changeState]);
    this.$store.commit("setNewQK", [
      "聊天贴边隐藏",
      "shiftW",
      () => {
        this.changeAutoFn();
        changeElCN("#chate-img", " chate-img-auto");
      },
    ]);

    setInterval(
      () =>
        this.$sendXHR("unread").then(
          (res) => (this.unread = res.follow_unread + res.unfollow_unread)
        ),
      5000
    );
  },
};

function getX(clientW, elW, clientX) {
  return (clientX > clientW - elW && 1) || (clientX < elW && -1) || 0;
}
</script>

<style lang='scss'>
@import "@/assets/scss/mixin.scss";
@import "@/assets/scss/base.scss";
.chate {
  z-index: 2;
  float: left;
  position: relative;
  .chat-img {
    position: fixed;
    cursor: pointer;
    bottom: 2em;
    right: 3em;
    border-radius: 50%;
    transition-property: right, bottom;
    transition-duration: 0.4s;
    &:hover {
      animation: su-pudding 1s;
    }
    & > img {
      width: 38px;
      height: 38px;
      transition-property: width, height;
      transition-duration: 0.4s;
    }
  }
  .chate-img-auto {
    right: 0.4em;
    bottom: 0.4em;
    & > img {
      width: 30px;
      height: 30px;
    }
  }
  .chate-list {
    position: fixed;
    box-sizing: border-box;
    left: 100vw;
    top: 15vh;
    min-width: 270px;
    height: 457.6px;
    background-color: rgba(255, 255, 255, 1);
    box-shadow: 0px 1px 4px 0px rgba(129, 152, 168, 0.7);
    border-radius: 5.9px;
    overflow: hidden;
    // &:focus-within{
    //   left: 75vw !important;
    //   top: 15vh !important;
    // }
    .list-top {
      display: flex;
      justify-content: space-around;
      padding: 8% 10px 0px 10px;
      font-size: 16px;
      .item {
        display: inline-block;
        text-align: center;
        user-select: none;
        cursor: pointer;
        width: 3em;
        border-radius: 8px;
        transition: all 0.6s;
        color: rgba(4, 1, 17, 0.452);
      }
      .checked {
        color: rgba(19, 4, 149, 0.89);
      }
    }
  }
  .hide {
    transition-property: left, top;
    transition-duration: 1.5s;
  }
}
</style>