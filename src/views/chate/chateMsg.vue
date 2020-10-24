<template>
  <div class="chate-msg" id="chate-msg">
    <div class="msg-top" id="chate-msg-top" @mousedown.capture.stop.self="move">
      <span class="msg-name">{{ rName }}</span>
      <span class="icon-close msg-close" @click="closeMgs"></span>
    </div>
    <msg-list
      :uface="$store.state.login.uface"
      :rFace="rFace"
      :msgList="msgList"
    />
    <div class="write">
      <textarea id="chate-send-msg" class="input"></textarea>
      <p class="send-msg" @click="sendMsg">发送</p>
      <!-- <p class="send-img" @click="sendMsg">图片</p> -->
    </div>
  </div>
</template>

<script>
import { moveBox, getElm, EventHandle } from "@/util/bomDom.js";
import { fangdou, emptyF } from "@/util/es.js";
import msgList from "./msgList.vue";
import sendXHR from "@/api";
import $store from "@/store";
const csrf_token = $store.state.login.bili_jct;
const uid = $store.state.login.userId;

export default {
  components: {
    msgList,
  },
  props: {
    rId: Number,
    rFace: String,
    rName: {
      type: String,
      default: "聊天对象名字",
    },
  },

  data() {
    return {
      msgList: [],
    };
  },
  methods: {
    move(e) {
      moveBox("#chate-msg", "#chate-msg-top", e.clientX, e.clientY);
    },
    sendMsg: fangdou(function () {
      const elmText = getElm("#chate-send-msg");
      let msg = elmText.value.trim();
      if (msg !== "") {
        elmText.value = "";
        this.msgList.push([Date.now(), msg, true]);
        sendMsg(this.rId, msg).then((res) => {});
      }
    }, 200),

    closeMgs() {
      console.log(this.$parent);
    },
  },
  created() {
    initMsgList(this, this.rId);
    this.$store.commit("setNewFn", [
      "ctrlENTER",
      () => document.activeElement.id === "chate-send-msg" && this.sendMsg(),
    ]);
  },
};

function sendMsg(recId, msg, type = 1) {
  return sendXHR("sendMsg", {
    "msg[sender_uid]": uid,
    "msg[receiver_id]": recId,
    "msg[receiver_type]": 1,
    "msg[msg_type]": type,
    "msg[content]": msg,
    csrf_token,
  });
}

function initMsgList(vm, id) {
  return sendXHR("oldMsg", {
    params: {
      sender_device_id: 1,
      mobi_app: "web",
      talker_id: id,
      session_type: 1,
      size: 20,
      build: 0,
    },
  }).then((res) => {
    vm.msgList = res.messages
      .filter((item) => item.msg_type === 1)
      .map((item) => getData(item))
      .sort();
  });
}

function getData(item) {
  let info = undefined;
  try {
    info = JSON.parse(item.content).content;
  } catch (error) {
    info = item.content;
  }
  return [item.timestamp, info, item.sender_uid === uid];
}
</script>

<style lang='scss'>
@import "@/assets/scss/base.scss";
.chate-msg {
  position: fixed;
  top: 10vh;
  left: 40vw;
  display: flex;
  flex-flow: column;
  width: 301px;
  height: 510px;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0px 0px 4px 0px rgba(0, 153, 255, 0.397);
  z-index: 2;
  overflow: hidden;
  .msg-top {
    position: relative;
    height: 40px;
    line-height: 40px;
    text-align: left;
    width: 100%;
    font-size: 16px;
    user-select: none;
    cursor: pointer;
    .msg-name {
      margin-left: 40px;
    }
    .msg-close {
      top: 20%;
      left: 95%;
    }
  }
  .write {
    position: relative;

    height: 100px;
    width: 100%;
    background-color: rgba(159, 184, 187, 0.068);
    .input {
      background-color: rgba(159, 184, 187, 0.013);
      height: 83%;
      width: 95%;
      resize: none;
      border: none;
      padding: 10px;
    }
    .send-msg,
    .send-img {
      position: absolute;
      bottom: 10%;
      right: 3%;
      width: 75px;
      height: 25px;
      line-height: 25px;
      text-align: center;
      font-size: 16px;
      border: solid 1px rgba(79, 105, 117, 0.151);
      user-select: none;
      cursor: pointer;
      background-color: #fff;
      &:hover {
        box-shadow: 0px 1px 4px 0px rgba(193, 209, 219, 0.7);
      }
      &:active {
      }
    }
    .send-img {
      left: 5%;
    }
  }
}
</style>