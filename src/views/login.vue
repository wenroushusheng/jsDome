<template>
  <div class="user-login">
    <div class="login-top">
      <img src="imgs/nav_logoEN.png" alt="" />
    </div>
    <div class="wrapper">
      <div class="login-form">
        <div class="user-login-form" @click="loginClick">
          <div class="login-type">
            <span
              class="type"
              data-type="loginType"
              :class="{ checked: loginType == 0 }"
              data-idx="0"
              >帐号登录
            </span>
            <span class="sep-line">|</span>
            <span
              class="type"
              data-idx="1"
              :class="{ checked: loginType == 1 }"
              data-type="loginType"
              >扫码登录</span
            >
          </div>

          <div class="normal" v-if="loginType == 0">
            <div class="input">
              <input placeholder="请输入帐号" type="text" v-model="userName" />
            </div>
            <div class="input">
              <input
                placeholder="请输入密码"
                type="password"
                v-model="passWord"
              />
            </div>
            <span class="btn btn-huge" data-type="toLogin">登录</span>
          </div>
          <div class="qr" v-else>
            <img :src="qrImg" data-type="setQrImg" />
          </div>
        </div>
        <div class="info">
          <span>请使用<em>哔哩哔哩</em>账户登录</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import getDataset from "@/util/elmDataset.js";
import { fangdou } from "@/util/es.js";
import QRCode from "qrcode";
const loginAction = {
  loginType(vm, { idx }) {
    idx = Number(idx);
    if (idx !== vm.loginType) {
      vm.loginType = idx;
      idx == 1 && this.setQrImg(vm);
    }
  },
  setQrImg: fangdou(async function (vm) {
    const res = await vm.$sendXHR("qrLoginImg");
    vm.oauthKey = res.oauthKey;
    vm.qrImg = await QRCode.toDataURL(res.url);
    this.qrLoginState(vm);
  }, 18000),
  qrLoginState(vm) {
    vm.$sendXHR("qrLogin", {
      oauthKey: vm.oauthKey,
    })
      .then((res) => this.userLoginScss(vm, res.url))
      .catch((res) => {
        if (res.data === -2) {
          return (vm.qrImg = "/imgs/getNewQr.png");
        }
        setTimeout(() => this.qrLoginState(vm), 590);
      });
  },
  userLoginScss(vm, url) {
    const cookiesArr = getCookiesData(url);
    cookiesArr.forEach((item) => vm.$cookies.set(item[0], item[1], "7d"));
    vm.$store.dispatch("userLogin", [cookiesArr[0][1], cookiesArr[3][1]]);
  },
};

export default {
  data() {
    return {
      loginType: 1,
      userName: "",
      passWord: "",
      qrImg: "imgs/loading-spinning-bubbles.svg",
      oauthKey: "",
    };
  },
  methods: {
    loginClick(e) {
      const dataset = getDataset(e.target);
      if (typeof loginAction[dataset.type] == "function") {
        loginAction[dataset.type](this, dataset);
      }
    },
  },
};
function getCookiesData(cookies) {
  const val = cookies.match(/\=(.+?)\&/g).map((str) => str.slice(1, -1));
  const key = cookies
    .match(/\?(.+?)\=/g)
    .map((str) => str.slice(1, -1))
    .concat(
      cookies
        .match(/\&(.+?)\=/g)
        .map((str) => str.slice(1, -1))
        .slice(0, 4)
    );
  key.splice(2, 1);
  val.splice(2, 1);
  return key.map((item, idx) => [item, val[idx]]);
}
</script>

<style lang="scss">
@import "@/assets/scss/config";
@import "@/assets/scss/mixin.scss";
@import "@/assets/scss/btn";

.user-login {
  width: 100%;
  .login-top {
    position: fixed;
    z-index: 9;
    background-color: #f2f2f2;
    box-shadow: 10px 12px 8px -12px #000;
    width: 100%;
    height: 60px;
    padding-left: 60px;
  }
  .wrapper {
    @include position($pos: relative, $t: 30px, $l: 0, $w: 100vw, $h: 56.25vw);
    background: url("../../public/imgs/banner3x.png") no-repeat center;
    background-size: 100vw 56.25vw;

    .login-form {
      box-sizing: border-box;
      position: absolute;
      top: 18%;
      right: 100px;
      padding-left: 31px;
      padding-right: 31px;
      width: 410px;
      background-color: $colorC;

      .user-login-form {
        user-select: none;
        .login-type {
          line-height: 23px;
          font-size: 22px;
          font-weight: normal;
          text-align: center;
          margin: 40px auto 49px;
          color: $colorD;
          cursor: pointer;
          .checked {
            color: $colorB;
          }
          .sep-line {
            margin: 0 32px;
          }
        }
        .input {
          border: none;
          outline: none;
          margin-left: 20px;
          margin-bottom: 25px;
          & > input {
            width: 270px;
            height: 22px;
            border: none;
            padding: 13px 16px 13px 24px;
            border-radius: 20px;
          }
        }
        .qr {
          background-color: rgb(161, 122, 122);
          height: 180px;
          width: 180px;
          margin: 20px auto;
          & > img {
            background-color: #fff;
            width: 100%;
          }
        }
      }

      .info {
        width: 100%;
        font-size: 18px;
        text-align: center;
        padding: 30px 0;
        & > span {
          color: $colorD;
          & > em {
            margin: 0 5.9px;
            font-size: 20px;
            color: $colorA;
          }
        }
      }
    }
  }
}
</style>