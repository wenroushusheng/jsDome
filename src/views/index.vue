<script>
import { slideNavList } from "@/assets/stateDate.js";
import { changeElCN } from "@/util/bomDom";
export default {
  functional: true,
  render(h) {
    return h("div", { class: "index-container" }, [
      h("div", { class: "index-slide-nav" }, [
        h("div", { class: "san-xian", on: { click: changeElmAttr } }),
        getRouterNav(h, slideNavList),
      ]),
      h("div", { class: "index-main" }, [h("router-view")]),
    ]);
  },
};

function getRouterNav(h, navList, deepClassName = "") {
  return h(
    "div",
    { class: "router-nav" + deepClassName },
    navList.map((item) =>
      h("router-link", ...getDataCVN(h, item, deepClassName, getRouterNav))
    )
  );
}
function getDataCVN(h, item, deepClassName, deepRenderFn) {
  const hasChlids = item.length == 3;
  const hasTip = hasChlids ? "jia-hao" : deepClassName ? "san-jiao" : false;
  return [
    { class: "router-self", props: { to: { name: item[1] } } },
    [h("div", { class: "router-wrap" }, [
        h("img", { attrs: { src: `imgs/${item[1]}.png` } }),
        h("span", "" + item[0]),
        hasTip && h("em", { class: hasTip }),
      ]),
      hasChlids && deepRenderFn(h, item[2], "-child"),
    ],
  ];
}
function changeElmAttr() {
  changeElCN(".index-slide-nav", " nav-small");
  changeElCN(".router-nav-child", " router-small");
}
</script>
<style lang='scss'>
@import "@/assets/scss/mixin.scss";
@import "@/assets/scss/base.scss";
.index-container {
  position: relative;
  display: flex;
  width: 100%;
  height: 100vh;
  user-select: none;
  .index-slide-nav {
    position: relative;
    overflow-x: hidden;
    overflow-y: auto;
    top: -65px;
    width: 148px;
    transition: width 0.59s;
    height: 100%;
    background: #0099ff;
    z-index: 2;
    .san-xian {
      width: 28px;
      height: 28px;
      background: url("/imgs/cd.png") no-repeat center;
      background-size: contain;
      cursor: pointer;
      margin: 20px 0;
      margin-left: 18px;
    }
    .router-nav {
      height: 100%;
      width: 148px;
      .router-self {
        .router-wrap {
          position: relative;
          padding-left: 18px;
          height: 60px;
          transition: background-color 0.41s;
          &:hover {
            background-color: #0483e4;
          }
          img {
            width: 26px;
            height: 26px;
            vertical-align: middle;
          }
          span {
            display: inline-block;
            text-align: center;
            margin-left: 8px;
            line-height: 60px;
            font-size: 12px;
            font-weight: bold;
            color: #fff;
          }
          .jia-hao {
            @include jiaHao($t: 5%, $l: 7%);
          }
          .san-jiao {
            display: inline-block;
            position: absolute;
            top: 45%;
            left: 10%;
            margin: 0 5px;
            @include sanJiaoXing($size: 9px, $color: #fff, $deg: -90deg);
            transition: opacity 0.59s;
            opacity: 0;
          }
        }
        .router-nav-child {
          position: relative;
          left: -12%;
          width: 110%;
          padding-left: 12%;
          transition: all 0.59s;
          visibility: hidden;
          opacity: 0;
          max-height: 0;
          .router-wrap {
            padding-left: 26%;
            background-color: #00afff;
          }
        }
        .router-small {
          visibility: hidden !important;
          max-height: 0 !important;
          opacity: 0 !important;
        }
      }
      .router-link-active {
        .router-wrap {
          background-color: #0071e6;
          .jia-hao::after {
            transform: rotate(90deg);
          }
        }
        .router-nav-child {
          visibility: visible;
          opacity: 1;
          max-height: 500px;
          .router-link-active {
            .san-jiao {
              opacity: 1;
            }
          }
        }
      }
    }
  }
  .index-main {
    flex: 1;
    height: 100%;
    position: relative;
    overflow-x: hidden;
    overflow-y: auto;
  }
  .nav-small {
    width: 56px !important; 
  }
}
</style>