<template>
  <el-carousel :interval="3000" type="card" height="400px">
    <el-carousel-item v-for="item in images" :key="item">
      <img class="images" :src="item" alt="" />
    </el-carousel-item>
  </el-carousel>
  <div class="recommend">
    <div class="recommend-top">
      <el-icon color="red" :size="20"><flag /></el-icon>
      <p style="font-size: 30px; margin-left: 10px">热门推荐</p>
      <a href="/#/sheet" style="margin-left: auto; top: 0; cursor: pointer"
        >更多<i style="color: red; font-weight: bold">-></i></a
      >
    </div>
    <song-sheet :song-sheet="songSheet"></song-sheet>
    <div class="recommend-top">
      <el-icon color="red" :size="20"><flag /></el-icon>
      <p style="font-size: 30px; margin-left: 10px">个性化推荐</p>
    </div>
    <div class="individualization">
      <song-sheet :song-sheet="songSheet"></song-sheet>
    </div>
    <div class="recommend-top">
      <el-icon color="red" :size="20"><flag /></el-icon>
      <p style="font-size: 30px; margin-left: 10px">新歌上架</p>
      <a href="/#/singer" style="margin-left: auto; top: 0; cursor: pointer"
        >更多<i style="color: red; font-weight: bold">-></i></a
      >
    </div>
    <div class="new-song">
      <song-sheet :song-sheet="songSheet"></song-sheet>
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import { Flag } from "@element-plus/icons-vue";
import SongSheet from "../../components/SongSheet.vue";

export default defineComponent({
  components: {
    Flag,
    SongSheet,
  },
  data: () => ({
    images: [
      "http://p1.music.126.net/U-klDW80305UEuVErdMpSw==/109951167239238686.jpg?imageView&quality=89",
      "http://p1.music.126.net/Bngn9ytdphLJTRJXb73dYA==/109951167239245487.jpg?imageView&quality=89",
      "http://p1.music.126.net/THFzmCGuU_f3QbhqxUz4Hg==/109951167239267047.jpg?imageView&quality=89",
    ],
    songSheet: [
      {
        id: 1,
        url: "http://p2.music.126.net/LsRKVImeGXGnRYpSQ4FgXg==/109951167146831219.jpg?param=140y140",
        describe: "简短介绍",
        playNum: 100,
      },
      {
        id: 1,
        url: "http://p2.music.126.net/LsRKVImeGXGnRYpSQ4FgXg==/109951167146831219.jpg?param=140y140",
        describe: "简短介绍",
        playNum: 100,
      },
      {
        id: 1,
        url: "http://p2.music.126.net/LsRKVImeGXGnRYpSQ4FgXg==/109951167146831219.jpg?param=140y140",
        describe: "简短介绍",
        playNum: 100,
      },
      {
        id: 1,
        url: "http://p2.music.126.net/LsRKVImeGXGnRYpSQ4FgXg==/109951167146831219.jpg?param=140y140",
        describe: "简短介绍1313123123112312312313",
        playNum: 100,
      },
      {
        url: "http://p2.music.126.net/a4RUDBj-LDKN7WMClV65OQ==/109951164735432462.jpg?param=140y140",
        describe: "简短介绍1231231231231",
        playNum: 100,
      },
      {
        id: 2,
        url: "http://p2.music.126.net/a4RUDBj-LDKN7WMClV65OQ==/109951164735432462.jpg?param=140y140",
        describe: "简短介绍",
        playNum: 100,
      },
      {
        id: 2,
        url: "http://p2.music.126.net/a4RUDBj-LDKN7WMClV65OQ==/109951164735432462.jpg?param=140y140",
        describe: "简短介绍",
        playNum: 100,
      },
      {
        id: 2,
        url: "http://p2.music.126.net/a4RUDBj-LDKN7WMClV65OQ==/109951164735432462.jpg?param=140y140",
        describe: "简短介绍132132123132123123323",
        playNum: 100,
      },
    ],
  }),
});
</script>

<style scoped>
.song-sheet {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  flex-wrap: wrap;
}
.recommend-top {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  border-bottom: 3px solid red;
  padding: 5px;
  margin: 0 20px;
  text-align: center;
  align-items: baseline;
}
.recommend {
  border-radius: 10px;
  position: relative;
  height: 100%;
  background-color: white;
  width: 60%;
  left: 20%;
  box-shadow: 5px 10px 5px grey;
  overflow: hidden;
  margin-bottom: 10px;
}
.nav a {
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