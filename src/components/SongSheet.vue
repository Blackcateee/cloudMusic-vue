<template>
  <div class="song-sheet">
    <div v-for="item in songSheet" :key="item" class="sheet">
      <img :src="item.listImg" alt="" />
      <div class="img-bottom">
        <div>
          <el-icon><service /></el-icon>
          {{
            item.listAmount / 10000 > 1
              ? ~~(item.listAmount / 10000) + '万'
              : item.listAmount
          }}
        </div>
        <el-icon class="playBTN"><video-play /></el-icon>
      </div>
      <a :href="'/#/songSheetDetail/' + item.listId">{{ item.listTitle }}</a>
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import { Service, VideoPlay } from "@element-plus/icons-vue";

export default defineComponent({
  components: {
    Service,
    VideoPlay,
  },
  props: ["songSheet"],
});
</script>

<style scoped>
.sheet {
  display: flex;
  flex-direction: column;
  width: 140px;
  height: 180px;
  margin: 20px 60px 30px 60px;
  word-break: break-all;
  text-overflow: clip;
  text-align: left;
}
.sheet a {
  text-decoration: none;
  color: #000;
  position: relative;
  top: -20px;
}
.sheet img:hover {
  cursor: pointer;
}
.sheet a:hover {
  cursor: pointer;
  text-decoration: underline;
}
.song-sheet {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  flex-wrap: wrap;
}
.img-bottom .playBTN:hover {
  cursor: pointer;
  color: white;
}
.img-bottom {
  padding: 0 8px;
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  background-color: rgba(0, 0, 0, 0.5);
  position: relative;
  top: -20px;
  color: rgb(184, 181, 181);
  align-items: center;
}
</style>
