<template>
  <div class="dashboard-main-items">
    <div class="top">
      <ul
        class="top-header"
        v-change-class="{
          className: 'items-default',
          activeClass: 'items-active',
          curIdx,
        }"
        @click="getData"
      >
        <li
          class="items-default"
          v-for="item in ['今日数据/票', '本周数据', '本月数据']"
          v-once
        >
          {{ item }}
        </li>
      </ul>
    </div>
    <ul class="footer">
      <li
        class="footer-item"
        v-for="item in [
          ['已上传', '未报关提示', '已查验', '已放行', '逻辑校验'],
          ['总上传', '总查验', '总放行']][items]"
      >
        <p>{{ item }}</p>
        <div class="warnCount">{{ num }}</div>
      </li>
    </ul>

    <ul class="footer">
      <li
        class="footer-item"
        v-for="item in ['价格超常提醒', '危化品提醒', '目的港要求提醒']"
      >
        <p>{{ item }}</p>
        <div class="warnCount">{{ num }}</div>
      </li>
    </ul>
  </div>
</template>

<script>
 
import changeClass from "@/directives/changeClass.js";
import { indexOf } from "@/util/es.js";
export default {
  directives: {
    changeClass,
  },
  data() {
    return {
      curIdx: 0,
      items: 0,
      itemInfo: [],
    };
  },
  props: {
    num: Number,
  },
  methods: {
    getData(e) {
      let index = indexOf(e.currentTarget.childNodes, e.target);
      if (index !== -1) {
        this.curIdx = index;
        this.items = index ? 1 : 0;
      }
    },
  },
};
</script>

<style lang='scss'>
@import "@/assets/scss/mixin.scss";
.dashboard-main-items {
    width: 100%;
  .top {
 
    .top-header {
      @include disFlex($jt: flex-start);
       
    }
  }
  .footer {
    @include disFlex($jt: space-around);
    padding: 40px 0;
    text-align: center;
    width: 100%;
    border-bottom: 1px solid #00d2ff;
    & > li {
      height: 50px;
      & > p {
        font-size: 14px;
        color: #003366;
      }
      & > div {
        display: block;
      }
    }
  }
}
</style>