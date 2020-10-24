<template>
  <div class="dashboard-main-baoguan">
    <h6 class="title-litle">快速报关</h6>
    <div class="orderfileSelect">
      <input type="file" id="file" accept="image/png,image/gif" />
      <span> 拖拽单证到此，快速进行报关</span>
    </div>
  </div>
</template>

<script>
export default {
  
};
</script>

<style lang='scss'>
@import "@/assets/scss/mixin.scss";
.dashboard-main-baoguan {
  .orderfileSelect {
    position: relative;
    width: 455px;
    height: 148px;
    margin-left: 24px;
    margin-bottom: 30px;
    border: 1px dashed rgba(121, 113, 113, 0.753);
    @include upload-body(
      $imgw: 30px,
      $imgh: 30px,
      $img: "/imgs/upload_icon.png",
      $l: 26%,
      $t: 15%
    );
  }
}
</style>