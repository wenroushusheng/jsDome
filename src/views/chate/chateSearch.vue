<template>
  <div class="chate-list-search">
    <div class="input">
      <input type="text" v-model="sWord" />
      <span class="to-search" @click="toSearch">搜索</span>
    </div>
    <div class="main">
      <div class="ret">
        <div class="ret-select">
          <p>{{ retNum }} 個用戶</p>
          <select class="sort select-list">
            <option value="0">默認排序</option>
            <option value="1">等级由低到高</option>
            <option value="2">等级由高到低</option>
            <option value="3">粉丝数由高到低</option>
            <option value="4">粉丝数由低到高</option>
          </select>
          <select class="filter select-list">
            <option value="0">全部用戶</option>
            <option value="1">普通用户</option>
            <option value="2">认证用户</option>
            <option value="3">up主</option>
          </select>
        </div>
      </div>
      <ul class="p-list" id="search-p-list" @click="toChate">
        <li class="people" v-for="item in retList" :key="item[3]">
          <img :src="item[0]" class="face" />
          <div class="info">
            <span class="name line-limit-length">{{ item[1] }}</span>
            <span class="write line-limit-length">{{ item[2] }}</span>
            <span class="to-chate">進行聯係</span>
          </div>
        </li>
        <li class="pages">
          <!-- <page-num cur="0" all="10" /> -->
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { indexOf, fangdou } from "@/util/es.js";
import { getElm } from "../../util/bomDom.js";
import pageNum from "@/components/pageNum.vue";

export default {
  components: {
    pageNum,
  },
  data() {
    return {
      retList: Array.apply(null, { length: 10 }).map((item, idx) => [
        "http://i0.hdslb.com/bfs/face/38d827f43088a83794420d5bbde2d7a98abc781f.jpg@180w_180h.webp",
        "彌陀",
        "十念必生 究竟圓滿",
        Date.now() + idx * 100,
        Date.now(),
      ]),
      sWord: "",
      retNum: 0,
    };
  },
  methods: {
    toSearch: fangdou(function () {
      const keyword = (this.sWord = this.sWord.trim());
      if (keyword) {
        search(this.$sendXHR, keyword).then((res) => {
          console.log(res);
          this.retNum = res.numResults;
          this.retList = res.result.map((item) => [
            item.upic,
            item.uname,
            item.usign,
            item.mid,
          ]);
        });
      }
    }, 200),
    toChate(e) {
      const target = e.target;
      if (target.className.indexOf("to-chate") > -1) {
        const idx = indexOf(
          e.currentTarget.children,
          target.parentElement.parentElement
        );
        const rid = this.retList[idx][4];
        this.$emit("toChate", rid);
      }
    },
  },
};

function search(sendXHR, keyword, { order = 0, oSort = 0, uType = 0 } = {}) {
  return sendXHR("search");
}
</script>

<style lang='scss'>
@import "@/assets/scss/base.scss";
.chate-list-search {
  height: 333px;
  margin-top: 20px;
  .input {
    display: flex;
    height: 20px;
    margin: 0 30px;
    margin-bottom: 10px;
    border-bottom: 1px solid #5d93bd2f;
    & > input {
      flex: 1;
      border: none;
    }
    .to-search {
      width: 40px;
      font-size: 14px;
      text-align: center;
      color: rgba(3, 20, 31, 0.24);
      cursor: pointer;
      user-select: none;
    }
  }
  .main {
    height: 92%;

    ::-webkit-scrollbar {
      width: 2px;
      background-color: rgba(45, 164, 243, 0);
    }
    ::-webkit-scrollbar-thumb {
      background-color: #0310251a;
    }
    .ret {
      padding-bottom: 10px;
      padding-top: 6px;
      color: rgba(76, 93, 105, 0.856);
      user-select: none;
      .ret-select {
        display: flex;
        justify-content: space-around;
        margin: 5px;
        .select-list {
          border: solid 1px #061d301a;
          font-size: 12px;
          color: rgba(76, 93, 105, 0.856);
          appearance: none;
          border: none;
          cursor: pointer;
        }
      }
    }
    .p-list {
      height: 88%;
      overflow-y: auto;
      padding: 10px 10px 10px 15.9px;
      .people {
        position: relative;
        margin: 5px 0;
        overflow: hidden;
        width: 100%;
        display: flex;
        .face {
          width: 50px;
          height: 50px;
          border-radius: 50%;
          margin-right: 10px;
        }
        .info {
          position: relative;
          width: 100%;
          &:hover {
            .to-chate {
              opacity: 1;
            }
          }
          .name {
            display: inline-block;
            position: absolute;
            width: 100%;
            top: 15%;
            font-size: 14px;
          }
          .write {
            display: inline-block;
            position: absolute;
            width: 100%;
            color: rgba(24, 34, 37, 0.623);
            bottom: 20%;
          }
          .to-chate {
            display: inline-block;
            position: absolute;
            opacity: 0;
            right: 0px;
            width: 60px;
            height: 24px;
            top: 20%;
            right: 5%;
            line-height: 24px;
            text-align: center;
            user-select: none;
            background-color: #fff;
            color: rgba(71, 71, 71, 0.61);
            cursor: pointer;
            transition: opacity 0.4s;
          }
        }
      }
    }
  }
}
</style>