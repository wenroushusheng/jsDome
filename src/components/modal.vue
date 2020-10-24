<template>
  <transition name="slide">
    <div class="modal" v-if="isShow">
      <div class="mask"></div>
      <div class="container">
        <header>
          <span class="header-title">{{ title }}</span>
          <span class="header-close" @click="$emit('close-modal')"></span>
        </header>
        <main>
          <div class="upload-body">
            <input type="file" id="file" accept="image/png,image/gif" />
            <span> 点击或拖拽图片至此</span>
          </div>
          <span class="info"> {{ info }} </span>
        </main>
        <div class="modal-footer">
          <div class="btn" v-show="btnType !== -1">
            {{ sureText }}
          </div>
          <div class="btn" v-show="btnType !== 1">
            {{ cancelText }}
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  props: {
    isShow: Boolean,
    title: String,
    btnType: Number,
    info: String,
    sureText: {
      type: String,
      default: "确定",
    },
    cancelText: {
      type: String,
      default: "取消",
    },
  },
};
</script>

<style lang='scss'>
@import "@/assets/scss/btn.scss";
@import "@/assets/scss/mixin.scss";
@import "@/assets/scss/base.scss";
.modal {
  @include position(fixed);
  z-index: 9;
  transition: all 0.59s;
  &.slide-enter {
    top: -100%;
  }
  &.slide-leave-active {
    top: -100%;
  }
  .mask {
    @include position(fixed);
    background-color: #c2acac6e;
  }
  .container {
    @include position(absolute, 40%, 50%, 660px, auto);
    background-color: #fff;
    transform: translate(-50%, -50%);
    width: 612px;
    padding: 23px 28px;
    border-radius: 8px;
    header {
      height: 40px;
      width: 100%;
      font-size: 16px;
      .header-title {
        &:before {
          content: "";
          @include bgImg(13px, 20px, "../../public/imgs/modal1.png");
          vertical-align: middle;
          margin-right: 5.9px;
        }
      }
      .header-close {
        float: right;
        content: "";
        @include bgImg(31px, 34px, "../../public/imgs/close.png");
        &:hover {
          animation: su-pudding 1s;
        }
      }
    }
    main {
      width: 560px;
      margin: 30px auto;
      .upload-body {
        position: relative;
        height: 170px;
        border: 2px dashed rgb(71, 69, 69);
        @include upload-body($imgw: 65px, $imgh: 64px, $img: "../../public/imgs/upimg.png");
      }
      .info {
        position: absolute;
        color: #999;
        font-size: 14px;
        margin-top: 10px;
      }
    }

    .modal-footer {
      margin-top: 30px;
      margin-bottom: 15px;
      float: right;
    }
  }
}
</style>