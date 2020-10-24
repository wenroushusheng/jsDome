<template>
  <div class="dashboard-main-warn">
    <h6 class="title-litle">异常待办</h6>
    <div class="warn-contain">
      <ul class="warn-header">
        <li>全部 ( {{ list.length }} )</li>
        <li v-for="item in ['紧急', '重要', '一般']" :key="item">
          <span> {{ item }}( 0 ) </span>
        </li>
        <li class="updata" @click="updataNow">立即更新数据</li>
      </ul>
      <div class="warn-main">
        <ul class="warn-item">
          <li v-for="(item, idx) in list" :key="item.vol + '' + idx">
            <p>业务编号/提运单号:{{ item.vol }}</p>
            <p>{{ item.author }}-{{ item.title }}</p>
            <p class="codes" v-for="code in item.lines" :key="code">
              {{ code }}
            </p>
          </li>
        </ul>
      </div>
    </div>
    <div class="move-warn">
      <span class="move prev" @click="move(-1)"></span>
      <span class="move next" @click="move(1)"></span>
    </div>
  </div>
</template>

<script>
import qs from "Qs";
import axios from "axios";
import { fangdou, resetTimeLoop } from "@/util/es.js";
import { getElmRect } from "@/util/bomDom.js";
export default {
  data() {
    return {
      aid: 0,
      tname: "",
      desc: "",
      list: [],
      listNum: 2,
      curIdx: 0,
      timerReset: resetTimeLoop(() => this.updata(), 5 * 60 * 1000),
      warmStyle: {},
    };
  },
  mounted() {
    this.warmStyle = document.querySelector(".warn-item").style;
    this.wp = getElmRect(".warn-main", "width");
    this.timerReset();
    this.$store.commit("initUpdata", this.updataNow.bind(this));
  },
  watch: {
    curIdx(v) {
      this.warmStyle.left = v * -this.wp + "px";
    },
  },
  methods: {
    move: fangdou(function (type) {
      const curIdx = this.curIdx + type;
      if (curIdx == this.listNum || curIdx == -1) {
        return;
      }
      this.curIdx = curIdx;
    }, 410),
    updataNow() {
      this.timerReset();
      this.updata();
    },
    updata() {
      this.curIdx = 0;
      this.list = [];
      warm.call(this);
    },
  },
  beforeCreate() {
    warm.call(this);
  },
};

function warm() {
  Array.apply(null, { length: 15 })
    .map(() => this.$sendXHR("xxx"))
    .forEach((item) => item.then((res) => setData(this, res)));
}
function setData(vm, res) {
  if (res.lines.length <= 3) {
    vm.list.push(res);
    vm.listNum = Math.ceil(vm.list.length / 4);
  }
}
</script>

<style lang='scss'>
@import "@/assets/scss/mixin.scss";
.dashboard-main-warn {
  position: relative;
  .warn-contain {
    .warn-header {
      @include disFlex(space-evenly);
      width: 452px;
      margin-left: 17px;
      margin-bottom: 14px;
      li {
        position: relative;
        width: 82px;
        height: 32px;
        line-height: 32px;
        border-bottom: 2px solid transparent;
        cursor: pointer;
      }
      .updata {
        &:hover {
          color: rgb(10, 42, 226);
        }
      }
    }
    .warn-main {
      overflow: hidden;
      width: 100%;
      .warn-item {
        position: relative;
        @include disFlex($jt: flex-start);
        left: 0;
        flex-flow: column;
        flex-wrap: wrap;
        box-sizing: border-box;
        height: 280px;
        width: 48%;
        transition: left 0.6s;
        & > li {
          display: inline-block;
          box-sizing: border-box;
          width: 96.5%;
          margin: 10px;
          padding: 10px;
          line-height: 17px;
          height: 110px;
          overflow: hidden;
          outline: 1px solid #f2f6f9;
          border-left: 2px solid rgb(251, 176, 59);
          p {
            &:nth-child(1) {
              font-weight: bold;
              overflow: hidden;
              white-space: nowrap;
              text-overflow: ellipsis;
            }
            &:nth-child(3) {
              width: 100%;
              max-height: 34px;
              text-overflow: ellipsis;
              display: -webkit-box;
              -webkit-line-clamp: 2;
              -webkit-box-orient: vertical;
              overflow: hidden;
            }
          }
        }
      }
    }
  }
  .move-warn {
    display: flex;
    float: right;
    margin-right: 40px;
    .move {
      display: inline-block;
      width: 40px;
      height: 25px;
      margin: 5px;
      cursor: pointer;
    }
    .next,
    .prev {
      @include sanJiaoXing(
        $size: 14px,
        $color: rgba(135, 187, 236, 0.986),
        $deg: -90deg
      );
      transition: border-top-color 0.5s;
      &:hover {
        border-top-color: rgb(96, 119, 223);
      }
    }
    .prev {
      transform: rotate(90deg);
    }
  }
}
</style>