<template>
  <transition name="slide">
    <div
      class="tip-modal"
      v-show="isShowModal"
      v-on:click.capture.stop="tipClick"
    >
      <div class="mask"></div>
      <div class="modal-dialog">
        <div class="modal-header">
          <span>{{ title }}</span>
          <div class="icon-close" data-arg="-1"></div>
        </div>
        <div class="modal-body">
          <slot name="body"></slot>
        </div>
        <div class="modal-footer">
          <div
            :data-arg="idx"
            v-for="(item, idx) in btnNum"
            :key="idx"
            class="btn"
          >
            {{ item }}
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import getDataset from "../util/elmDataset.js";
export default {
  methods: {
    tipClick(e) {
      const dataset = getDataset(e.target);
      if (dataset.arg !== undefined) {
        this.$emit("tip-click", [e, dataset.arg * 1]);
      }
    },
  },
  props: {
    isShowModal: Boolean,
    modalType: {
      //弹框类型：小small中middle大large、默认表单form
      type: String,
      default: "form",
    },
    title: String,
    btnNum: Array,
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

<style lang="scss">
@import "@/assets/scss/mixin.scss";
@import "@/assets/scss/btn.scss";
@import "@/assets/scss/base.scss";
.tip-modal {
  @include position(fixed);
  z-index: 10;
  transition: all 0.59s;
  &.slide-enter {
    top: -100%;
  }
  &.slide-leave-active {
    top: -100%;
  }
  .mask {
    @include position(fixed);
    background-color: #0000006e;
  }
  .modal-dialog {
    @include position(absolute, 40%, 50%, 660px, auto);
    background-color: #fff;
    transform: translate(-50%, -50%);
    .modal-header {
      height: 60px;
      background-color: #fff;
      padding: 0 25px;
      line-height: 60px;
      font-size: 16px;
    } 
    .modal-body {
      padding: 42px 40px 54px;
      font-size: 17px;
      background-color: #f5f5f591;
    }
    .modal-footer {
      height: 82px;
      line-height: 82px;
      text-align: center;
      background-color: #e7e6e6cc;
    }
  }
}
</style>