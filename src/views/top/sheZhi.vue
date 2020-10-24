<template>
  <div class="query-key">
    <div class="tip" @click="$store.commit('changeQueryKeyModal')">
      <img src="imgs/shezhi.png" alt="设置" />
    </div>
    <tip
      :is-show-modal="$store.state.queryKeyModal"
      title="快捷键"
      :btn-num="['关闭']"
      @tip-click="changetTpClick"
    >
      <template v-slot:body>
        <ul class="table">
          <li class="keys" v-for="(name, idx) in queryKeyName" :key="idx">
            <span class="key-name">{{ name }}</span>
            <span class="key-com">{{ keyComs[idx] | keyString }}</span>
          </li>
        </ul>
      </template>
    </tip>
  </div>
</template>

<script>
import tip from "@/components/tip.vue";
export default {
  components: {
    tip,
  },
  filters: {
    keyString(str) {
      return (
        str.slice(0, str.search(/[A-Z]/)) +
        " + " +
        str.match(/[A-Z]{1,10}$/g)[0]
      );
    },
  },
  data() {
    return {};
  },

  computed: {
    queryKeys() {
      return this.$store.state.queryKey.queryKeysData;
    },
    queryKeyName() {
      return this.queryKeys.map((item) => item[0]);
    },
    keyComs() {
      return this.queryKeys.map((item) => item[1]);
    },
  },
  methods: {
    changetTpClick([e, type]) {
      this.$store.commit("changeQueryKeyModal");
    },
    queryKey(e) {},
  },
};
</script>

<style lang="scss">
.query-key {
  cursor: auto;
  .tip {
    content: "";
    width: 18px;
    height: 26px;
    & > img {
      width: 26px;
      height: 26px;
    }
  }
  .table {
    .keys {
      cursor: default;

      .key-name {
        position: absolute;
        display: inline-block;
      }
      .key-com {
        display: inline-block;
        position: relative;
        left: 40%;
        color: rgb(134, 179, 231);
      }
    }
  }
}
</style>