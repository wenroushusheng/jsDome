<template>
  <div class="dashboard">
    <div class="title">
      <h2>仪表盘</h2>
    </div>
    <div class="main">
      <div class="main-left">
        <bao-guan/>
        <!-- <data-warn /> -->
      </div>
      <div class="main-right">
        <data-items :num="1" />
        <div class="data-orderSpeed">
          <order-speed :time="11" :times="1" img="imgs/orderSpeed.png" />
          <order-speed :time="12" :times="2" img="imgs/carbon.png" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import dataWarn from "./dashboard/dataWarn.vue";
import orderSpeed from "./dashboard/orderSpeed.vue";
import dataItems from "./dashboard/dataItems.vue";
import baoGuan from "./dashboard/dataBaoguan.vue";
export default {
  components: {
    // dataWarn,
    orderSpeed,
    dataItems,
    baoGuan,
  },
};
</script>

<style lang='scss'>
@import "@/assets/scss/mixin.scss";
.dashboard {
  .main {
    display: flex;
    justify-content: space-around;
    margin-bottom:100px;
    & > * {
      width: 570px;
      border-top: 1px solid #00d2ff;
    }
    .main-right,
    .data-orderSpeed {
      @include disFlex($jt: space-around);
    }
  }
}
</style>