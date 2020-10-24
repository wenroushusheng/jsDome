<template>
  <div>
    <h3 @click="ff">报关伙伴</h3>
    <router-view name="ayggl"> 111111111111111111111111111111111 </router-view>
  </div>
</template>

<script>
import { mapMutations } from "vuex";
export default {
  methods: {
    ff() {
      let a = {
        ...mapMutations(["changeChatState"]),
      };
      console.log(a);
      a.changeChatState()
    },
  },
};
</script>

<style>
</style>