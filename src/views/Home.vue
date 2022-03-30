<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <HelloWorld msg="Welcome to Your Vue.js App" />
    <p>{{ num }}</p>
    <el-button @click="add">数字加</el-button>
    <p>{{ sum }}</p>
    <p>{{ result }}</p>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";
import { defineComponent } from "@vue/runtime-core";
import axios from "axios";

export default defineComponent({
  name: "Home",
  components: {
    HelloWorld,
  },
  data: () => ({
    num: 0,
    result: "",
  }),
  mounted() {
    axios({
      method: "GET",
      url: "/song/test",
    }).then((res) => {
      this.result = res.data;
      console.log(this.result);
    });
  },
  methods: {
    add() {
      this.num++;
    },
  },
  computed: {
    sum() {
      return this.num + 5;
    },
  },
  watch: {
    num(newValue) {
      alert(`新值为：${newValue}`);
    },
  },
});
</script>
