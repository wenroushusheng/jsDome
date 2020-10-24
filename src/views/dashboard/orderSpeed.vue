<template>
  <div
    class="dashboard-main-orderSpeed"
    :style="`background: url(${img}) no-repeat center;
      background-size: 167px;`"
  >
    <p>今天，小旗从接到您的委托开始</p>
    <p>
      到预录完成平均每单用
      <span>
        <em> {{ time }}</em
        >小时</span
      >
    </p>
    <p>
      您已跑赢行业平均水平
      <span>
        <em>{{ times }}</em
        >倍</span
      >
    </p>
  </div>
</template>

<script>
export default {
  props: {
    img: String,
    time: Number,
    times: Number,
  },
};
</script>

<style lang='scss'>
.dashboard-main-orderSpeed {
  width: 224px;
  height: 160px;
  text-align: right;
  margin: 60px 35px 40px 14px;
  p:nth-child(1) {
    margin-bottom: 12px;
    line-height: 12px;
  }
  p {
    span {
      color: #0099ff;
      font-size: 12px;
      em {
        font-size: 20px;
      }
    }
  }
}
</style>