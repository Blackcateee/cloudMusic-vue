<template>
  <div class="player">
    <audio
      ref="audio"
      :src="this.$store.state.audioAttributeState.url"
      @timeupdate="timeChange"
      @canplay="getAttribute"
      controls="controls"
      hidden= "hidden"
    ></audio>
    <el-slider v-model="progress" @change="progressChange" style="width: 250px; margin: 30px" />
    {{ currentTimeMin }}:{{ currentTimeSec }}
    {{ durationMin }}:{{ durationSec }}
    <el-button @click="playMusic">播放</el-button>
    <el-button @click="pauseMusic">暂停</el-button>
  </div>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  data: () => ({
    input: "",
    currentTimeSec: "",
    currentTimeMin: "",
    durationMin: "",
    durationSec: "",
    progress: 0,
  }),
   methods: {
    getAttribute() {
      this.durationSec = parseInt(this.$refs.audio.duration % 60);
      this.durationMin = parseInt(this.$refs.audio.duration / 60);
      this.currentTimeSec = parseInt(this.$refs.audio.currentTime % 60);
      this.currentTimeMin = parseInt(this.$refs.audio.currentTime / 60);
      this.$refs.audio.play();
    },
    timeChange() {
      this.currentTimeSec = parseInt(this.$refs.audio.currentTime % 60);
      this.currentTimeMin = parseInt(this.$refs.audio.currentTime / 60);
      this.progress = parseInt(
        (this.$refs.audio.currentTime / this.$refs.audio.duration) * 100
      );
    },
    playMusic() {
      this.$refs.audio.play();
    },
    pauseMusic() {
      this.$refs.audio.pause();
    },
    progressChange() {
      this.$refs.audio.currentTime = Math.round(this.progress / 100 * this.$refs.audio.duration);
      this.$refs.audio.play();
    }
  },
})
</script>

<style scoped>
.el-progress--line {
  margin-bottom: 15px;
  width: 350px;
}
.player {
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