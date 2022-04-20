<template>
  <el-carousel :interval="3000" type="card" height="400px">
    <el-carousel-item v-for="item in images" :key="item">
      <img class="images" :src="item" alt="" />
    </el-carousel-item>
  </el-carousel>
  <div class="recommend">
    <div class="recommend-mian">
      <div class="recommend-top">
        <el-icon color="red" :size="20"><flag /></el-icon>
        <p style="font-size: 30px; margin-left: 10px">热门推荐</p>
        <a href="/#/sheet" style="margin-left: auto; top: 0; cursor: pointer"
          >更多<i style="color: red; font-weight: bold">-></i></a
        >
      </div>
      <!--歌单组件 -->
      <song-sheet :song-sheet="songSheet"></song-sheet>
      <div v-if="logined">
        <div class="recommend-top">
          <el-icon color="red" :size="20"><flag /></el-icon>
          <p style="font-size: 30px; margin-left: 10px">个性化推荐</p>
        </div>
        <div class="individualization">
          <!--歌单组件 -->
          <song-sheet :song-sheet="songSheetByAmount"></song-sheet>
        </div>
      </div>

      <div class="recommend-top">
        <el-icon color="red" :size="20"><flag /></el-icon>
        <p style="font-size: 30px; margin-left: 10px">新歌上架</p>
        <a href="/#/singer" style="margin-left: auto; top: 0; cursor: pointer"
          >更多<i style="color: red; font-weight: bold">-></i></a
        >
      </div>
      <div class="new-song">
        <!--歌单组件 -->
        <song-sheet :song-sheet="songSheet"></song-sheet>
      </div>
    </div>
    <div class="login">
      <div v-if="!logined" class="login-btn">
        登录即可享受无限收藏的乐趣
        <el-button
          type="danger"
          style="width: 50px; margin-top: 30px"
          @click="loginDialogOpen"
        >
          登录
        </el-button>
      </div>
      <div v-if="logined" class="userDetail">
        <img
          width="80"
          height="80"
          src="http://121.40.137.246:9000/cloudmusic/images/%E5%BE%AE%E4%BF%A1%E5%9B%BE%E7%89%87_20220107173357.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=myMinio%2F20220419%2F%2Fs3%2Faws4_request&X-Amz-Date=20220419T091918Z&X-Amz-Expires=604800&X-Amz-SignedHeaders=host&X-Amz-Signature=d87fd2d71c8282b611d4789b0e66cd9c85efac593cb745ba2d9f8528beec30af"
          alt=""
        />
        <div class="btn">
          <span class="userName">返雨</span>
          <el-button type="primary" @click="toMySong">我的音乐</el-button>
        </div>
      </div>
      <div class="singer">
        <div class="singer-top">
          <p style="font-weight: bold">推荐歌手</p>
          <a href="/#/singer">查看全部></a>
        </div>
        <div class="singer-card" v-for="item in singer" :key="item">
          <img
            class="singer-img"
            :src="item.imgUrl"
            alt=""
            width="62"
            height="62"
          />
          <div class="content">
            <span style="padding-top: 5px; font-weight: bold">{{
              item.name
            }}</span>
            <span style="padding-top: 10px; font-size: 10px">{{
              item.remark
            }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import { Flag } from "@element-plus/icons-vue";
import SongSheet from "../../components/SongSheet.vue";
import axios from "axios";

export default defineComponent({
  components: {
    Flag,
    SongSheet,
  },
  inject: ["loginDialogOpen"],
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
    singer: [
      {
        imgUrl:
          "http://p2.music.126.net/rCsLFXha6SLis0tV7yZ5fA==/109951165588539704.jpg?param=62y62",
        name: "张惠妹",
        remark: "台湾歌手张惠妹",
      },
      {
        imgUrl:
          "http://p1.music.126.net/ATZ8-mOxophKXrLC0iXMZw==/109951163536269820.jpg?param=130y130",
        name: "许嵩",
        remark: "雅俗共赏",
      },
      {
        imgUrl:
          "http://p1.music.126.net/ATZ8-mOxophKXrLC0iXMZw==/109951163536269820.jpg?param=130y130",
        name: "许嵩",
        remark: "雅俗共赏",
      },
      {
        imgUrl:
          "http://p1.music.126.net/ATZ8-mOxophKXrLC0iXMZw==/109951163536269820.jpg?param=130y130",
        name: "许嵩",
        remark: "雅俗共赏",
      },
      {
        imgUrl:
          "http://p1.music.126.net/ATZ8-mOxophKXrLC0iXMZw==/109951163536269820.jpg?param=130y130",
        name: "许嵩",
        remark: "雅俗共赏",
      },
    ],
    songSheetByAmount: [],
    logined: false,
  }),
  mounted() {
    if (localStorage.getItem("user") != null) {
      this.logined = true;
    }
    axios({
      method: "GET",
      url: "/song/listByAmount",
    }).then((res) => {
      this.songSheetByAmount = res.data;
      console.log(res.data);
    });
    axios({
      method: "GET",
      url: "/song/list",
    }).then((res) => {
      this.songSheet = res.data;
      console.log(res.data);
    });
  },
  methods: {
    toMySong() {
      this.$router.push("mySong");
    }
  }
});
</script>

<style scoped>
.userName {
  font-weight: bold;
}
.userDetail {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  background-image: linear-gradient(white, rgb(212, 211, 211));
}
.userDetail img {
  margin: 10px;
  padding: 2px;
  border: 1px solid rgba(0, 0, 0, 0.3);
}
.userDetail .btn {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}
.singer-top {
  display: flex;
  flex-direction: row;
  border-bottom: 2px solid rgba(0, 0, 0, 0.1);
  margin: 10px 10px 5px 10px;
  font-size: 10px;
  padding: 5px;
}
.singer-top a {
  text-decoration: none;
  margin-left: auto;
  color: #000;
}
.singer-top a:hover {
  text-decoration: underline;
}
.content {
  display: flex;
  justify-content: left;
  flex-direction: column;
  float: right;
  text-align: left;
  padding-right: 20px;
  margin-left: 30px;
}
.singer-img {
  height: 100%;
}
.singer-card {
  margin: 10px;
  background-color: rgb(246, 245, 245);
  border: 2px solid rgba(0, 0, 0, 0.1);
  overflow: hidden;
  display: flex;
  justify-content: left;
  flex-direction: row;
  cursor: pointer;
}
.singer-card:hover {
  background-color: white;
}
.login-btn {
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-image: linear-gradient(white, rgb(208, 209, 208));
  height: 150px;
  padding: 10px;
  align-items: center;
  box-shadow: 0 2px 1px rgba(0, 0, 0, 0.5);
  overflow: hidden;
}
.login {
  float: right;
  width: 21%;
  border: 2px solid rgba(0, 0, 0, 0.2);
  border-left: 0px;
}
.song-sheet {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  flex-wrap: wrap;
}
.recommend-mian {
  border: 2px solid rgba(0, 0, 0, 0.2);
  width: 79%;
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
  position: relative;
  height: 100%;
  background-color: white;
  width: 70%;
  left: 15%;
  box-shadow: 5px 10px 5px grey;
  overflow: hidden;
  margin-bottom: 10px;
  display: flex;
  flex-direction: row;
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