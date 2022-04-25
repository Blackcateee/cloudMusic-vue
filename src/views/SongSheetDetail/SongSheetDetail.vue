<template>
  <div class="main">
    <div class="detail" :style="show ? '' : 'width: 70%'">
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
            <el-button @click="collectList"
              ><el-icon><folder-add /></el-icon>收藏</el-button
            >
            <el-button @click="share"
              ><el-icon><share /></el-icon>分享</el-button
            >
            <el-button @click="downloadList"
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
              <el-icon class="playBTN" @click="playMusic(scope.row)"
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
      <CommentArea v-if="refreashCommentArea" :songSheetId="sheet.listId" />
    </div>
    <div v-if="!show" class="recommend">推荐</div>
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
</template>

<script>
import { defineComponent } from "vue";
import AddFolder from "../../components/AddFolder.vue";
import {
  VideoPlay,
  Share,
  FolderAdd,
  Download,
  Comment,
  ArrowDown,
} from "@element-plus/icons-vue";
import axios from "axios";
import { ElMessage } from "element-plus";
import CommentArea from "../../components/Comment.vue";

export default defineComponent({
  components: {
    VideoPlay,
    Share,
    FolderAdd,
    Download,
    Comment,
    ArrowDown,
    AddFolder,
    CommentArea,
  },
  props: ["listId", "show"],
  inject: ["reloadPlayer", "play"],
  data: () => ({
    songId: "",
    open: true,
    sheet: {},
    dialogVisible: false,
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
    refreashCommentArea: true,
  }),
  provide() {
    return {
      close: this.close,
      refreash: this.refreash,
    };
  },
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
    refreash() {
      this.refreashCommentArea = false;
      this.$nextTick(() => {
        this.refreashCommentArea = true;
      })
    },
    downloadList() {
      this.tableData.forEach((e) => {
        this.download(e);
      });
    },
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
    changeIntroduce() {
      this.open = !this.open;
    },
    share() {
      // 这里注释的方式是把url里的路径去掉了，也可以自己修改路径以及添加参数
      // let invitelink = location.href.replace(this.$route.path,'') + "/register?invitecode="
      let invitelink = location.href;
      this.$copyText(invitelink).then(
        () => {
          ElMessage.success("连接已复制到粘贴板，分享给朋友吧！"); // 这里可以换成提示信息，比如：已成功复制到剪切板
        },
        (err) => {
          console.log(err); // 同上
        }
      );
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
    collectList() {
      if (localStorage.getItem("user") != null) {
        axios({
          method: "GET",
          url: "/user/addUserCollection",
          params: {
            userName: localStorage.getItem("user"),
            songSheetId: this.listId,
          },
        }).then((res) => {
          if (res.data.success) {
            ElMessage.success(res.data.message);
          } else {
            ElMessage.error(res.data.message);
          }
        });
      } else {
        ElMessage.error("请先登录");
      }
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
