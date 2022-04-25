<template>
  <el-menu class="el-menu-vertical-demo" default-openeds="2">
    <el-sub-menu index="2">
      <el-menu-item index="2-10000000" tabindex="2-10000000">
        <img width="40" height="40" :src="defaultSongSheet.listImg" alt="" />
        <span>{{ defaultSongSheet.listTitle }}</span>
      </el-menu-item>
      <template #title>我的歌单 </template>

      <div v-for="item in mySongSheet" :key="item.index">
        <el-menu-item
          :index="item.listTitle"
          :tabindex="item.listTitle"
          @click="addSong(item.listId)"
        >
          <img width="40" height="40" :src="item.listImg" alt="" />
          <span>{{ item.listTitle }}</span>
        </el-menu-item>
      </div>
    </el-sub-menu>
  </el-menu>
</template>

<script>
import { defineComponent } from "vue";
import axios from "axios";
import { ElMessage } from "element-plus";

export default defineComponent({
  props: ["songId"],
  inject: ["close"],
  data: () => ({
    mySongSheet: [],
    defaultSongSheet: {
      listId: "",
      listTitle: "我喜欢的音乐",
      listImg:
        "https://p1.music.126.net/G749JuAs4F3UDyqIZ4m3KA==/109951165459761626.jpg?param=200y200",
    },
  }),
  mounted() {
    axios({
      method: "GET",
      url: "/user/defaultSong",
      params: {
        userName: localStorage.getItem("user"),
      },
    }).then((res) => {
      console.log(res.data);
      axios({
        method: "GET",
        url: "/song/getUserSongSheet",
        params: {
          songSheetList: res.data.user.userSongSheet
            .replaceAll("[", "")
            .replaceAll("]", "")
            .replaceAll('"', ""),
        },
      }).then((res) => {
        this.mySongSheet = res.data;
      });
    });
  },
  methods: {
    addSong(id) {
      axios({
        method: "GET",
        url: "/song/addSongIntoSongSheet",
        params: {
          songSheetId: id,
          songId: this.songId,
        },
      }).then((res) => {
        if (res.data.success) {
          ElMessage.success(res.data.message);
          this.close();
        } else {
          ElMessage.error(res.data.message);
        }
      });
    },
  },
});
</script>

<style scoped>
</style>