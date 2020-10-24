<template>
  <div class="page-num">
    <ul class="page-main" @click="toCurIdx">
      <li class="item" v-for="item in 5" :key="item">
        {{ item | textFilter }}
      </li>
    </ul>
    <ul class="page-info">
      <li class="tip">共10頁</li>
      <li class="cur">
        <input class="input" type="number" />
        <span class="to-cur" @click="goCurIdx">跳轉</span>
      </li>
    </ul>
  </div>
</template>

<script>
import { indexOf } from "@/util/es.js";
// import { goCurIdx } from "./com.js";

export default {
  props: {
    cur: { type: Number, default: 0 },
    all: { type: Number, default: 10 },
  },
  filters: {
    textFilter(v) {
      if (all <= 5) {
        return v;
      } else {
        all > cur + 5;
      }
    },
  },

  mounted() {
    document.querySelector(".page-num >.page-main >.item").className +=
      " cur-idx";
    goCurIdx = goCurIdx.bind(this);
  },
  methods: {
    goCurIdx(e) {
      const target = e.target;
      const parent = e.currentTarget;
      const idx = e.currentTarget.parentElement.children[0].value;

      // if (idx > 0 && idx !== this.cur) {
      //  goCurIdx(parent.querySelector(".cur-idx"),idx);
      // }
    },
    toCurIdx(e) {
      const target = e.target;
      const parent = e.currentTarget;
      const idx = indexOf(parent.children, e.target);
      // if (idx > -1 && idx !== this.cur) {
      // goCurIdx(parent.querySelector(".cur-idx"),target,idx);
      //}
    },
  },
};
let goCurIdx = function (oldElm, target, idx) {
  oldElm.className = "item";
  target.className += " cur-idx";
  this.cur = idx;
  this.$emit("pageNum", idx);
};
</script>

<style lang="scss">
.page-num {
  margin-top: 20px;
  // border: solid 1px red;
  box-sizing: border-box;
  .page-main {
    display: flex;
    justify-content: space-around;
    align-items: center;
    .item {
      border: 1px solid rgba(129, 152, 168, 0.281);
      border-radius: 6px;
      height: 1em;
      min-width: 1em;
      padding: 5px;
      font-size: 14px;
      user-select: none;
      text-align: center;
      cursor: pointer;
      transition-property: color, background-color;
      transition-duration: 0.4s;
      &:hover {
        color: #fff;
        background-color: rgb(108, 168, 224);
      }
      &:active {
        background-color: rgb(110, 116, 179);
      }
    }
    .cur-idx {
      color: #fff;
      background-color: rgb(148, 190, 230);
    }
  }
  .page-info {
    margin: 16px 0 0 0;
    font-size: 14px;
    .tip {
      display: inline-block;
      user-select: none;
      color: rgba(42, 49, 54, 0.664);
      margin-left: 2em;
      width: 6em;
    }
    .cur {
      position: relative;
      display: inline-block;
      margin-left: 1em;
      .input {
        position: relative;
        display: inline-block;
        margin: 0;
        padding: 0;
        text-align: center;
        font-size: 15px;
        border: solid 1px rgba(148, 190, 230, 0);
        padding: 2px;
        opacity: 0;
        right: -2em;
        width: 2em;
        z-index: 1;
        transition-property: width, right, opacity;
        transition-duration: 0.59s;
        &:focus {
          width: 3em;
          right: 0em;
          opacity: 1;
          border-bottom: 1px solid rgb(148, 190, 230);
        }
      }
      .to-cur {
        position: relative;
        display: inline-block;
        user-select: none;
        cursor: pointer;
        width: 2em;
        color: rgba(42, 49, 54, 0.664);
        left: 0em;
      }
    }
  }
}
</style>