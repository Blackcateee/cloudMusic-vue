<template>
  <div class="player">
    <audio
      ref="audio"
      :src="url"
      @timeupdate="timeChange"
      @canplay="getAttribute"
      @play="changePlayIcon"
      @pause="changePauseIcon"
      controls="controls"
      hidden="hidden"
      @ended="nextSong"
    ></audio>
    <el-icon @click="previousSong" style="cursor: pointer" :size="30"
      ><DArrowLeft
    /></el-icon>
    <el-icon v-if="play" style="cursor: pointer" :size="45"
      ><video-play @click="playMusic"
    /></el-icon>
    <el-icon v-if="pause" style="cursor: pointer" :size="45"
      ><video-pause @click="pauseMusic"
    /></el-icon>
    <el-icon @click="nextSong" style="cursor: pointer" :size="30"
      ><DArrowRight
    /></el-icon>
    <img :src="picture" alt="" width="40" height="40" style="margin: 0 20px" />
    <div class="slider">
      <div class="name">
        <p style="color: white">
          {{ name }}
        </p>
        <p style="color: white">
          {{ singer }}
        </p>
      </div>
      <el-slider v-model="progress" @change="progressChange" />
    </div>
    <div style="margin: 30px 10px 0 10px">
      {{ currentTimeMin }}:{{ currentTimeSec }} / {{ durationMin }}:{{
        durationSec
      }}
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import {
  VideoPlay,
  VideoPause,
  DArrowLeft,
  DArrowRight,
} from "@element-plus/icons-vue";
import axios from "axios";

export default defineComponent({
  components: {
    VideoPlay,
    VideoPause,
    DArrowLeft,
    DArrowRight,
  },
  data: () => ({
    input: "",
    currentTimeSec: "00",
    currentTimeMin: "00",
    durationMin: "00",
    durationSec: "00",
    progress: 0,
    play: true,
    pause: false,
    url: "",
    singer: "",
    name: "",
    picture: "",
    songIdList: "",
    songList: [],
    index: 0,
  }),
  mounted() {
    this.songIdList = localStorage
      .getItem("songList")
      .replaceAll('"', "")
      .replaceAll("[", "")
      .replaceAll("]", "");
    if (this.songIdList != null) {
      axios({
        method: "GET",
        url: "/song/selectSongsInSheet",
        params: {
          songList: this.songIdList,
        },
      }).then((res) => {
        this.index = localStorage.getItem("songIndex");
        this.songList = res.data;
        this.url = this.songList[this.index].songUrl;
        this.name = this.songList[this.index].songName;
        this.singer = this.songList[this.index].songArtist;
        this.picture = this.songList[this.index].songAlbumPicture
          .replaceAll('\\"')
          .replaceAll("[", "")
          .replaceAll('"', "")
          .replaceAll("]", "");
      });
    }
  },
  // created() {
  //   console.log(localStorage.getItem("songList").replaceAll('"', ""));
  // },
  methods: {
    previousSong() {
      this.index = (this.songList.length + this.index - 1)%(this.songList.length)
      this.url = this.songList[this.index].songUrl;
      this.name = this.songList[this.index].songName;
      this.singer = this.songList[this.index].songArtist;
      this.picture = this.songList[this.index].songAlbumPicture
        .replaceAll('\\"')
        .replaceAll("[", "")
        .replaceAll('"', "")
        .replaceAll("]", "");
       setTimeout(() => {
        this.$refs.audio.play();
      }, 100)
    },
    changePlayIcon() {
      this.play = false;
      this.pause = true;
    },
    changePauseIcon() {
      this.pause = false;
      this.play = true;
    },
    nextSong() {
      this.index = (this.songList.length + this.index + 1)%(this.songList.length)
      this.url = this.songList[this.index].songUrl;
      this.name = this.songList[this.index].songName;
      this.singer = this.songList[this.index].songArtist;
      this.picture = this.songList[this.index].songAlbumPicture
        .replaceAll('\\"')
        .replaceAll("[", "")
        .replaceAll('"', "")
        .replaceAll("]", "");
      setTimeout(() => {
        this.$refs.audio.play();
      }, 100)
    },
    getAttribute() {
      this.durationSec = parseInt(this.$refs.audio.duration % 60);
      this.durationMin = parseInt(this.$refs.audio.duration / 60);
      this.currentTimeSec = parseInt(this.$refs.audio.currentTime % 60);
      this.currentTimeMin = parseInt(this.$refs.audio.currentTime / 60);
      // this.$refs.audio.play();
    },
    timeChange() {
      this.currentTimeSec = parseInt(this.$refs.audio.currentTime % 60);
      this.currentTimeMin = parseInt(this.$refs.audio.currentTime / 60);
      this.progress = parseInt(
        (this.$refs.audio.currentTime / this.$refs.audio.duration) * 100
      );
    },
    changeIcon() {
      this.play = !this.play;
      this.pause = !this.pause;
    },
    playMusic() {
      this.$refs.audio.play();
      // this.play = !this.play;
      // this.pause = !this.pause;
    },
    pauseMusic() {
      this.$refs.audio.pause();
      // this.play = !this.play;
      // this.pause = !this.pause;
    },
    progressChange() {
      this.$refs.audio.currentTime = Math.round(
        (this.progress / 100) * this.$refs.audio.duration
      );
      this.$refs.audio.play();
    },
  },
});
</script>

<style scoped>
.el-progress--line {
  margin-bottom: 15px;
  width: 350px;
}
.slider {
  display: flex;
  flex-direction: column;
  font-size: 10px;
  height: 100%;
  width: 600px;
}
.player {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  position: fixed;
  bottom: -40px;
  height: 50px;
  width: 100%;
  color: white;
  background-color: #333;
  /* animation: playerIn 1s; */
  transition: bottom 0.3s;
  display: flex;
  justify-content: center;
  flex-direction: row;
  align-items: center;
  z-index: 10;
}
.player:hover {
  bottom: 0;
  /* animation: playerOut 0.7s;
  animation-fill-mode: forwards; */
}
/* @keyframes playerOut {
  from {bottom: -45px}
  to {bottom: 0}
}
@keyframes playerIn {
  from {bottom: 0}
  to {bottom: -45px}
} */
</style>