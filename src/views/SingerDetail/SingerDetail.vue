<template>
  <div class="main">
    <div class="singerDetail">
      <img :src="singer.singerImg" alt="" />
      <p>{{ singer.singerName }}  {{ singer.singerAlias }}</p>
    </div>
    <div class="songList">
      <el-table :data="tableData">
        <el-table-column type="index" width="80" />
        <el-table-column width="80">
          <template #default="scope">
            <el-icon class="playBTN" @click="playMusic(scope.row)"
              ><video-play
            /></el-icon>
          </template>
        </el-table-column>
        <el-table-column prop="songName" label="歌曲标题" width="280" />
        <!-- <el-table-column label="歌曲时长" width="80" >
            <template #default="scope">
              {{ songDuration(scope.row) }}
            </template>
          </el-table-column> -->
        <el-table-column prop="songArtist" label="歌手" width="280" />
        <el-table-column prop="songAlbum" label="专辑" width="330" />
        <el-table-column>
          <template #default="scope">
            <el-icon class="playBTN" @click="addSong(scope.row)"
              ><folder-Add
            /></el-icon>
            <el-icon
              class="playBTN"
              @click="handleEdit(scope.$index, scope.row)"
              ><share
            /></el-icon>
            <el-icon class="playBTN" @click="download(scope.row)"
              ><download
            /></el-icon>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-dialog v-model="dialogVisible" width="30%">
      <AddFolder :songId="songId" />
      <template #footer>
        <span class="dialog-footer">
          <el-button type="primary" @click="dialogVisible = false"
            >关闭</el-button
          >
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import AddFolder from "../../components/AddFolder.vue";
import { VideoPlay, Share, FolderAdd, Download } from "@element-plus/icons-vue";
import axios from "axios";
import { ElMessage } from "element-plus";

export default defineComponent({
  components: {
    VideoPlay,
    Share,
    FolderAdd,
    Download,
    AddFolder,
  },
  props: ["id"],
  inject: ["reloadPlayer", "play"],
  data: () => ({
    tableData: [],
    singer: {},
    dialogVisible: false,
  }),
  provide() {
    return {
      close: this.close,
    };
  },
  mounted() {
    axios({
      method: "GET",
      url: "/song/getSingerDetail",
      params: {
        singerId: this.id,
      },
    }).then((res) => {
      this.tableData = res.data.songs;
      this.singer = res.data.singer;
      console.log(this.singer)
    });
  },
  methods: {
    close() {
      this.dialogVisible = false;
    },
    addSong(row) {
      this.songId = row.songId;
      this.dialogVisible = true;
    },
    download(row) {
      fetch(row.songUrl)
        .then((res) => res.blob())
        .then((blob) => {
          const a = document.createElement("a");
          document.body.appendChild(a);
          a.style.display = "none";
          // 使用获取到的blob对象创建的url
          const url = window.URL.createObjectURL(blob);
          a.href = url;
          // 指定下载的文件名，就‘’写默认的下载名字。不指定他就根据上传名直接下载了宝。
          a.download = row.songName;
          a.click();
          document.body.removeChild(a);
          // 移除blob对象的url
          window.URL.revokeObjectURL(url);
        })
        .catch(() => {
          ElMessage.error("歌曲暂不支持下载");
        });
    },
    playMusic(row) {
      this.$store.commit("audioAttributeMutations", {
        url: row.songUrl,
        name: row.songName,
        picture: row.songAlbumPicture.replaceAll('["', "").replaceAll('"]', ""),
        singer: row.songArtist,
      });
      this.reloadPlayer();
      this.play();
    },
  },
});
</script>

<style scoped>
.playBTN {
  font-size: 20px;
  cursor: pointer;
  margin-top: 5px;
}
.playBTN:hover {
  color: red;
}
.songList {
  margin: 20px;
}
.main {
  background-color: white;
  width: 70%;
  left: 15%;
  position: relative;
  border: 2px solid rgba(0, 0, 0, 0.2);
}
.singerDetail {
  margin: 40px;
}
</style>