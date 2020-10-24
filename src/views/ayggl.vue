 <!-- 
<template>
 <h3>员工管理</h3> 
</template>
-->
<script>
export default {
  render(h) {
    const times = 2;
    return ren(h, times);
    function ren(h) {
      return h(
        "router-link",
        {
          class: "router-self",
          props: {
            to: { name: "dashboard" },
          },
        },
        [h("div", { class: "router-wrap" }, [h("span", "AMTB")])]
      );
    }
  },
};
</script>

<style>
</style>