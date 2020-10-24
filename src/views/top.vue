<template>
  <div class="top-container clearfix">
    <div class="logo clearfix"><img src="imgs/nav_logoEN.png" alt="" /></div>
    <ul class="user-info clearfix">
      <li class="user-imgs">
        <img class="img" 
        :src="face" 
        alt="更换头像" 
        @click="showModal = true" />
      </li>
      <li class="user-name">
        <span class="yonghu">{{ uname }}</span>
      </li>
      <li class="she-zhi">
        <she-zhi />
      </li>
      <li class="user-logout">
        <span> </span>
      </li>
    </ul>
    <modal
      title="头像上传"
      :isShow="showModal"
      info="图片高度*宽度至少150*150像素，大小不得超过2mb"
      :btn-type="1"
      @close-modal="showModal = false"
    >
    </modal>
  </div>
</template>

<script>
import modal from "@/components/modal.vue";
import qs from "Qs";
import sheZhi from "./top/sheZhi.vue";
export default {
  components: {
    sheZhi,
    modal,
  },
  data() {
    return {
      face: "",
      uname: "",
      tryData: 999999,
      showModal: false,
    };
  },
  methods: {
    changeUserImgs(e) {},
    getInfo() {},
  },
  beforeCreate() {
    getInfo(this);
  },
};

function getInfo(vm) {
  vm.$sendXHR("userInfo")
    .then((res) => initUser(vm, res))
    .catch((res) => setTimeout(() => getInfo(vm), 990));
}

function initUser(vm, args) {
  vm.$store.commit("setUFace", args.face);
  vm.face = args.face;
  vm.uname = args.uname;
}
</script>

<style lang='scss'>
@import "@/assets/scss/mixin.scss";
@import "@/assets/scss/base.scss";
.top-container {
  position: relative;
  top: 0;
  background: #f2f2f2;
  height: 60px;
  width: 100%;
  .logo {
    display: flex;
    float: left;
    padding-left: 170px;
  }

  .user-info {
    display: flex;
    float: right;
    padding-right: 30px;
    & > li {
      margin: 14px 0;
      margin-left: 20px;
      cursor: pointer;
    }
    .user-imgs {
      margin: auto 10px;
      .img {
        border-radius: 50%;
        height: 50px;
      }
    }
    .user-name {
      cursor: default;
      font-size: 18px;
      .yonghu {
        line-height: 30px;
      }
    }
    .she-zhi {
      display: flex;
      float: left;
      margin-right: 3em;
    }
    .user-logout {
      margin-right: 0;
      span {
        @include bgImg(34px, 32px, "../../public/imgs/nav_logOut.png");
      }
    }
  }
}
</style>