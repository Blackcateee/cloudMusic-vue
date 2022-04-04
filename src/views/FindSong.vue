<template>
  <div class="nav">
    <router-link to="/">推荐</router-link>
    <router-link to="">排行榜</router-link>
    <router-link to="">歌单</router-link>
    <router-link to="/singer">歌手</router-link>
    <router-link to="">新碟上架</router-link>
  </div>
 <router-view />
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  data: () => ({
    images: [
      "http://p1.music.126.net/U-klDW80305UEuVErdMpSw==/109951167239238686.jpg?imageView&quality=89",
      "http://p1.music.126.net/Bngn9ytdphLJTRJXb73dYA==/109951167239245487.jpg?imageView&quality=89",
      "http://p1.music.126.net/THFzmCGuU_f3QbhqxUz4Hg==/109951167239267047.jpg?imageView&quality=89",
    ],
  }),
  methods: {},
});
</script>

<style scoped>
.recommend-top {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  border-bottom: 3px solid red;
  padding: 5px;
  margin: 0 20px;
  text-align: center;
  align-items:baseline;
}
.recommend {
  border-radius: 10px;
  position: relative;
  height: 500px;
  background-color: white;
  width: 60%;
  left: 20%;
  box-shadow: 5px 10px 5px grey;
}
.nav a{
  text-decoration: none;
  color: white;
  padding: 0 10px;
  margin: 5px 20px 5px 20px;
  border-radius: 10px;
  font-size: 10px;
}
.nav a:hover {
  background-color: rgb(104, 4, 4);
  cursor: pointer;
}
.nav {
  background-color: rgb(184, 8, 8);
  display: flex;
  flex-direction: row;
  justify-content: center;
}
.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}
.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
</style>