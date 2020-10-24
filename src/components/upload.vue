<template>
  <div class="upload-body">
    <input type="file" id="file" :accept="accept" 
    :style="`background: url(${'/imgs/upimg.png'}) no-repeat center;`"
    />
    <span> {{ info }}</span>
  </div>
</template>

<script>
export default {
  props: {
    accept: {
      type: String,
      default: "image/png,image/gif",
    },
    info: String,
    bcImg:String
  },
};
</script>

<style lang='scss'>
@import "@/assets/scss/btn.scss";
@import "@/assets/scss/mixin.scss";
@import "@/assets/scss/base.scss";
.modal {
  .upload-body {
    position: relative;
    height: 170px;
    border: 2px dashed rgb(71, 69, 69);
      input {
    position: absolute;
    width: 99%;
    height: 98%;
    z-index: 2;
    opacity: 0;
  }
 
  }
  .info {
    position: absolute;
    color: #999;
    font-size: 14px;
    margin-top: 10px;
  }
}
</style>