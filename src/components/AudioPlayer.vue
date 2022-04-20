<template>
  <div class="player">
    <audio
      ref="audio"
      :src="url"
      @timeupdate="timeChange"
      @canplay="getAttribute"
      @play="changeIcon"
      @pause="changeIcon"
      controls="controls"
      hidden="hidden"
      @ended="playMusic"
    ></audio>
    <el-icon v-if="play" style="cursor: pointer" :size="45"
      ><video-play @click="playMusic"
    /></el-icon>
    <el-icon v-if="pause" style="cursor: pointer" :size="45"
      ><video-pause @click="pauseMusic"
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
import { VideoPlay, VideoPause } from "@element-plus/icons-vue";

export default defineComponent({
  components: {
    VideoPlay,
    VideoPause,
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
  }),
  created() {
    this.url = localStorage.getItem("songUrl");
    this.name = localStorage.getItem("name");
    this.singer = localStorage.getItem("singer");
    this.picture = localStorage.getItem("picture");
  },
  methods: {
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