<template>
  <div class="main" v-if="jumpRefresh">
    <div class="detail" :style="show ? '' : 'width: 70%'">
      <div class="sheet">
        <img
          class="sheet-img"
          width="210"
          height="210"
          :src="song.songAlbumPicture"
          alt=""
        />
        <div class="comment">
          <h1>{{ song.songName }}</h1>
          <p>作者: {{ song.songArtist }}</p>
          <div class="operation">
            <el-button type="primary" @click="playList"
              ><el-icon><video-play /></el-icon>播放</el-button
            >
            <el-button @click="addSong"
              ><el-icon><folder-add /></el-icon>收藏</el-button
            >
            <el-button @click="share"
              ><el-icon><share /></el-icon>分享</el-button
            >
            <el-button @click="download"
              ><el-icon><download /></el-icon>下载</el-button
            >
            <el-button
              ><el-icon><comment /></el-icon>评论</el-button
            >
          </div>
        </div>
      </div>
      <div :class="open ? 'introduce' : 'introduceDetail'">
        {{ song.songLyric != null ? song.songLyric : "该歌曲暂无歌词" }}
      </div>
      <span class="textOperate" @click="changeIntroduce()"
        >{{ open ? "展开" : "收起" }}<el-icon><arrow-down /></el-icon
      ></span>
      <CommentArea
        class="commentArea"
        v-if="refreashCommentArea"
        :songSheetId="songId"
      />
    </div>
    <div v-if="!show" class="recommend">
      推荐
      <div v-for="item in myCollection" :key="item.index">
        <el-menu>
          <el-menu-item
            :index="item.listTitle"
            :tabindex="item.listTitle"
            @click="showSongSheet(item)"
          >
            <img width="40" height="40" :src="item.listImg" alt="" />
            <span>{{ item.listTitle }}</span>
          </el-menu-item>
        </el-menu>
      </div>
    </div>
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
import axios from "axios";
import AddFolder from "../../components/AddFolder.vue";
import {
  VideoPlay,
  Share,
  FolderAdd,
  Download,
  Comment,
  ArrowDown,
} from "@element-plus/icons-vue";
import { defineComponent } from "vue";
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
  props: ["songId", "show"],
  inject: ["reloadPlayer", "play"],
  data: () => ({
    open: false,
    song: {},
    refreashCommentArea: true,
    dialogVisible: false,
    jumpRefresh: true,
    myCollection: {},
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
      url: "/user/searchLikelySongSheet",
      params: {
        userName: localStorage.getItem("user")
      }
    }).then(res => {
      this.myCollection = res.data;
    })
    axios({
      method: "GET",
      url: "/song/getSongInfo",
      params: {
        songId: this.songId,
      },
    }).then((res) => {
      this.song = res.data;
      this.song.songAlbumPicture = this.song.songAlbumPicture
        .replaceAll('"', "")
        .replaceAll("[", "")
        .replaceAll("]", "")
        .replaceAll("\\", "");
    });
  },
  methods: {
    showSongSheet(item) {
      this.$router.push("/songSheetDetail/" + item.listId);
    },
    download() {
      fetch(this.song.songUrl)
        .then((res) => res.blob())
        .then((blob) => {
          const a = document.createElement("a");
          document.body.appendChild(a);
          a.style.display = "none";
          // 使用获取到的blob对象创建的url
          const url = window.URL.createObjectURL(blob);
          a.href = url;
          // 指定下载的文件名，就‘’写默认的下载名字。不指定他就根据上传名直接下载了宝。
          a.download = this.song.songName;
          a.click();
          document.body.removeChild(a);
          // 移除blob对象的url
          window.URL.revokeObjectURL(url);
          ElMessage.success("下载开始");
        })
        .catch(() => {
          ElMessage.error("歌曲暂不支持下载");
        });
    },
    playList() {
      this.index = 0;
      localStorage.setItem("songIndex", this.index);
      localStorage.setItem("songList", this.songId);
      this.reloadPlayer();
      this.play();
    },
    addSong() {
      this.dialogVisible = true;
    },
    refreash() {
      this.refreashCommentArea = false;
      this.$nextTick(() => {
        this.refreashCommentArea = true;
      });
    },
    close() {
      this.dialogVisible = false;
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
  },
  watch: {
    songId() {
      this.$router.go(0);
    },
  },
});
</script>

<style scoped>
.introduceDetail {
  color: #777;
  font-size: 15px;
  width: 200px;
  overflow: hidden;
  vertical-align: middle;
  left: 45%;
  position: relative;
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
.commentArea {
  margin-top: 316px;
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
  font-size: 15px;
  overflow: hidden;
  position: relative;
  left: 45%;
  width: 200px;
  height: 300px;
  vertical-align: top;
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
