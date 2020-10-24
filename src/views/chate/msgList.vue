<script>
import { getElm } from "@/util/bomDom.js";
export default {
  functional: true,
  props: {
    uface: String,
    rFace: String,
    msgList: Array,
  },
  render(h, args) {
    const { msgList, rFace, uface } = args.props;
    setTimeout(toView, 10);
    return h("div", { class: "chate-msg-list" }, [
      h(
        "ul",
        { class: "msg-list" },
        msgList.map((item) =>
          h("li", { class: item[2] ? "msg-right" : "msg-left" }, [
            h("span", {
              class: "msg-user-img",
              style: `background-image:url(${item[2] ? uface : rFace})`,
            }),
            h("span", { class: "msg-info" }, String(item[1])),
          ])
        )
      ),
    ]);
  },
};

function toView() {
  let elm = getElm(".chate-msg-list>.msg-list>:last-child");
  elm && elm.scrollIntoView({ behavior: "smooth" });
}
</script>

<style lang='scss'>
@import "@/assets/scss/base.scss";
.chate-msg-list {
  flex-grow: 1;
  position: relative;
  flex-direction: column;
  overflow: hidden;
  ::-webkit-scrollbar {
    width: 1px;
    background-color: #ced2ec00;
  }
  ::-webkit-scrollbar-thumb {
    background-color: #355cc78f;
  }
  .msg-list {
    height: 100%;
    width: 100%;
    overflow-y: auto;
    overflow-x: hidden;
    display: flex;
    flex-direction: column;
    & > * {
      position: relative;
      margin: 10px 0;
      width: 70%;
      .msg-info {
        word-break: break-word;
      }
      .msg-user-img {
        display: inline-block;
        height: 35px;
        width: 35px;
      }
    }
    .msg-left {
      margin-left: 10px;
      .msg-info {
        margin-left: 40px;
      }
    }
    .msg-right {
      display: flex;
      align-items: baseline;
      justify-content: flex-end;
      float: right;
      right: -26%;
      .msg-info {
        display: inline-block;
        position: relative;
        margin-right: 40px;
        color: #fff;
        background-color: #80b9f2de;
      }
    }
    .msg-user-img,
    .msg-user-img {
      position: absolute;
      display: inline-block;
      background-repeat: no-repeat;
      background-size: cover;
      width: 35px;
      height: 35px;
      border-radius: 50%;
    }
    .msg-info {
      display: inline-block;
      line-height: 30px;
      padding: 0 15px;
      border: 1px solid #f2f6f9;
      border-radius: 27px;
    }
  }
}
</style>