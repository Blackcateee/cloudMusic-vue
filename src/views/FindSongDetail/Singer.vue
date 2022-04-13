<template>
  <div class="singer-main">
    <!-- <div class="left-bar">
      <p>推荐</p>
      <router-link :class="visited == 1 ? 'visited' : '' " to="" @click="isVisited(1)"
        >· 推荐歌手</router-link
      >
      <router-link :class="visited == 2 ? 'visited' : '' " to="" @click="isVisited(2)"
        >· 入驻歌手</router-link
      >
    </div>
    <div class="content">
      <router-view></router-view>
    </div> -->
    
  </div>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  data: () => ({
    visited: 1,
  }),
  methods: {
    isVisited(val) {
      this.visited = val;
    },
  },
});
</script>
<style scoped>
/* .left-bar {
  display: flex;
  justify-content: left;
  flex-direction: column;
  float: left;
  width: 200px;
  background-color: #e9eef3;
  border-right: 1px solid rgba(0, 0, 0, 0.2);
}
.left-bar a {
  text-decoration: none;
  color: black;
  margin: 15px;
}
.visited {
  text-decoration: none;
  color: black;
  margin: 10px;
  border: 1px solid rgba(0, 0, 0, 0.2);

  border-radius: 5px;
  box-shadow: 0px 1px 1px rgba(0, 0, 0, 0.2);
}
.left-bar p {
  font-weight: bold;
  font-size: 30px;
  margin-top: 40px;
  margin-bottom: 20px;
}
.left-bar a:hover {
  text-decoration: underline;
}
.left-bar a:active {
  border: 1px solid rgba(0, 0, 0, 0.2);
  background-color: #e9eef3;
} */
.singer-main {
  background-color: white;
  width: 70%;
  left: 15%;
  position: relative;
  border: 2px solid rgba(0, 0, 0, 0.2);
  height: 100%;
}
</style>