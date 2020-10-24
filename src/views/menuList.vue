<template>
  <div class="menu_list">
    <div class="title">
      <h2>订单中心</h2>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
export default {};
</script>

<style lang='scss'>
.menu_list {
  .title {
    border-bottom: 1px solid #00d2ff;
  }
}
</style>