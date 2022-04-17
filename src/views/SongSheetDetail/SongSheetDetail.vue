<template>
  <div class="main">
    <div class="detail" style="width: 70%">
      <div class="sheet">
        <img
          class="sheet-img"
          width="210"
          height="210"
          :src="sheet.listImg"
          alt=""
        />
        <div class="comment">
          <h1>{{ sheet.listTitle }}</h1>
          <p>作者: {{ sheet.listAuthor }} 2022-4-13创建</p>
          <div class="operation">
            <el-button type="primary"
              ><el-icon><video-play /></el-icon>播放</el-button
            >
            <el-button
              ><el-icon><folder-add /></el-icon>收藏</el-button
            >
            <el-button
              ><el-icon><share /></el-icon>分享</el-button
            >
            <el-button
              ><el-icon><download /></el-icon>下载</el-button
            >
            <el-button
              ><el-icon><comment /></el-icon>评论</el-button
            >
          </div>
          <div class="tags">
            标签：
            <a class="tag" v-for="item in sheet.listTags" :key="item" href="">
              {{ item }}
            </a>
          </div>
          <div :class="open ? 'introduce' : 'introduceDetail'">
            介绍:{{ sheet.listDescription }}
          </div>
          <span class="textOperate" @click="changeIntroduce()"
            >{{ open ? "展开" : "收起" }}<el-icon><arrow-down /></el-icon
          ></span>
        </div>
      </div>
      <div class="songList">
        <el-table :data="tableData">
          <el-table-column type="index" width="50" />
          <el-table-column width="50">
            <template #default="scope">
              <el-icon
                class="playBTN"
                @click="playMusic(scope.row)"
                ><video-play
              /></el-icon>
            </template>
          </el-table-column>
          <el-table-column prop="songName" label="歌曲标题" width="180" />
          <!-- <el-table-column label="歌曲时长" width="80" >
            <template #default="scope">
              {{ songDuration(scope.row) }}
            </template>
          </el-table-column> -->
          <el-table-column prop="songArtist" label="歌手" width="180" />
          <el-table-column prop="songAlbum" label="专辑" width="230" />
          <el-table-column>
            <template #default="scope">
              <el-icon
                class="playBTN"
                @click="handleEdit(scope.$index, scope.row)"
                ><folder-Add
              /></el-icon>
              <el-icon
                class="playBTN"
                @click="handleEdit(scope.$index, scope.row)"
                ><share
              /></el-icon>
              <el-icon
                class="playBTN"
                @click="handleEdit(scope.$index, scope.row)"
                ><download
              /></el-icon>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <div class="recommend">推荐</div>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import {
  VideoPlay,
  Share,
  FolderAdd,
  Download,
  Comment,
  ArrowDown,
} from "@element-plus/icons-vue";
import axios from "axios";

export default defineComponent({
  components: {
    VideoPlay,
    Share,
    FolderAdd,
    Download,
    Comment,
    ArrowDown,
  },
  props: ["listId"],
  inject: ["reload"],
  data: () => ({
    open: true,
    sheet: {},
    tableData: [
      {
        date: "2016-05-03",
        name: "Tom",
        address: "No. 189, Grove St, Los Angeles",
      },
      {
        date: "2016-05-02",
        name: "Tom",
        address: "No. 189, Grove St, Los Angeles",
      },
      {
        date: "2016-05-04",
        name: "Tom",
        address: "No. 189, Grove St, Los Angeles",
      },
      {
        date: "2016-05-01",
        name: "Tom",
        address: "No. 189, Grove St, Los Angeles",
      },
    ],
  }),
  mounted() {
    axios({
      method: "GET",
      url: "/song/songListInSheet",
      params: {
        listId: this.listId,
      },
    }).then((res) => {
      this.tableData = res.data.songs;
      this.sheet = res.data.songSheet;
      this.sheet.listTags = res.data.songSheet.listTags
        .replace('["', "")
        .replace('"]', "")
        .replaceAll('"', "")
        .split(",");
    });
  },
  methods: {
    changeIntroduce() {
      this.open = !this.open;
    },
    playMusic(row) {
      this.$store.commit("audioAttributeMutations", {
        url: row.songUrl,
        name: row.songName,
        picture: row.songAlbumPicture.replaceAll('["',"").replaceAll('"]',""),
        singer: row.songArtist,
      });
      this.reload();
    },
  },
});
</script>

<style scoped>
.introduceDetail {
  color: #777;
  font-size: 5px;
  height: 200px;
  overflow: hidden;
}
.textOperate {
  float: right;
  cursor: pointer;
  font-size: 10px;
  color: rgb(0, 119, 255);
}
.textOperate:hover {
  text-decoration: underline;
}
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
.tags {
  color: #777;
  font-size: 5px;
}
.introduce {
  color: #777;
  font-size: 5px;
  height: 100px;
  overflow: hidden;
}
.introduceChange {
  color: #777;
  font-size: 5px;
}
.tag {
  padding: 0 10px;
  margin: 0 5px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  text-decoration: none;
  background-color: rgba(7, 7, 7, 0.2);
  color: #777;
  font-size: 5px;
}
.tag:hover {
  background-color: rgba(7, 7, 7, 0.1);
}
.operation {
  padding-top: 10px;
  padding-bottom: 10px;
}
.comment {
  text-align: left;
}
.sheet-img {
  float: left;
  margin: 30px 70px 30px 40px;
  padding: 2px;
  border: 2px solid rgba(0, 0, 0, 0.2);
}
.recommend {
  width: 30%;
  border: 2px solid rgba(0, 0, 0, 0.2);
  float: right;
}
h1 {
  margin-top: 30px;
  padding-bottom: 10px;
}
.main {
  width: 70%;
  left: 15%;
  position: relative;
  background-color: white;
  border: 2px solid rgba(0, 0, 0, 0.2);
  display: flex;
  overflow: hidden;
}
.sheet {
  display: flex;
  justify-content: center;
}
</style>
