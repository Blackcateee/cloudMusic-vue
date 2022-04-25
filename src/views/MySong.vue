<template v-if="reloadKey">
  <div v-if="!logined" class="remindLogin">
    登录即可自己创建歌单，收藏我喜欢的音乐
    <el-button
      type="primary"
      style="margin-top: 100px; width: 200px; height: 50px"
      @click="loginDialogOpen"
      >登录</el-button
    >
  </div>
  <div v-if="logined" class="myMain">
    <div class="left-bar">
      <el-scrollbar height="100%">
        <div class="operation" style="width: 100%">
          <el-button style="margin-right: 20px" @click="addSongSheet = true"
            >新建歌单</el-button
          >
        </div>
        <el-menu class="el-menu-vertical-demo">
          <el-sub-menu index="1">
            <template #title>我的歌手</template>
            <el-menu-item v-for="item in mySinger" :key="item.index">{{
              item
            }}</el-menu-item>
          </el-sub-menu>
          <el-sub-menu index="2">
            <el-menu-item
              index="2-10000000"
              tabindex="2-10000000"
              @click="getDefaultSongSheet"
            >
              <img
                width="40"
                height="40"
                :src="defaultSongSheet.listImg"
                alt=""
              />
              <span>{{ defaultSongSheet.listTitle }}</span>
            </el-menu-item>
            <template #title>我的歌单 </template>

            <div v-for="item in mySongSheet" :key="item.index">
              <el-menu-item
                :index="item.listTitle"
                :tabindex="item.listTitle"
                @click="showSongSheet(item)"
              >
                <img width="40" height="40" :src="item.listImg" alt="" />
                <span>{{ item.listTitle }}</span>
                <el-icon
                  style="margin-left: auto"
                  title="删除"
                  @click="deleteSongSheet(item.listId)"
                  ><close
                /></el-icon>
              </el-menu-item>
            </div>
          </el-sub-menu>
          <el-sub-menu index="3">
            <template #title>我收藏的歌单</template>
            <div v-for="item in myCollection" :key="item.index">
              <el-menu-item
                :index="item.listTitle"
                :tabindex="item.listTitle"
                @click="showSongSheet(item)"
              >
                <img width="40" height="40" :src="item.listImg" alt="" />
                <span>{{ item.listTitle }}</span>
              </el-menu-item>
            </div>
          </el-sub-menu>
        </el-menu>
      </el-scrollbar>
    </div>
    <div class="detail">
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
            <el-button disabled="true"
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
              <el-icon
                class="playBTN"
                @click="handleEdit(scope.$index, scope.row)"
                ><share
              /></el-icon>
              <el-icon
                class="playBTN"
                @click="download(scope.row)"
                ><download
              /></el-icon>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <CommentArea />
    </div>
  </div>
  <el-dialog v-model="addSongSheet" title="添加歌单" width="30%">
    <span class="ml-3 w-35 text-gray-600 inline-flex items-center"
      >歌单名字</span
    >
    <el-input
      v-model="input"
      class="w-50 m-2"
      placeholder="输入歌单名"
      required
    />
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="addSongSheet = false">取消</el-button>
        <el-button type="primary" @click="add">确定</el-button>
      </span>
    </template>
  </el-dialog>
  <el-dialog v-model="deleteDialogVisible" title="删除歌单" width="30%">
    <span>确定删除吗？</span>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="deleteDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="deleteSongSheetById">删除</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script>
import { defineComponent } from "vue";
import axios from "axios";
import {
  VideoPlay,
  Share,
  FolderAdd,
  Download,
  Comment,
  ArrowDown,
  Close,
} from "@element-plus/icons-vue";
import { ElMessage } from "element-plus";
import CommentArea from "../components/Comment.vue";

export default defineComponent({
  inject: ["reloadPlayer", "play", "loginDialogOpen"],
  components: {
    VideoPlay,
    Share,
    FolderAdd,
    Download,
    Comment,
    ArrowDown,
    Close,
    CommentArea,
  },
  data: () => ({
    songSheetId: "",
    deleteDialogVisible: false,
    input: "",
    logined: false,
    addSongSheet: false,
    mySinger: [],
    defaultSongSheet: {
      listId: "",
      listTitle: "我喜欢的音乐",
      listImg:
        "https://p1.music.126.net/G749JuAs4F3UDyqIZ4m3KA==/109951165459761626.jpg?param=200y200",
    },
    mySongSheet: [],
    myCollection: [],
    sheet: {},
    tableData: [],
    open: true,
  }),
  methods: {
    deleteSongSheet(id) {
      this.deleteDialogVisible = true;
      this.songSheetId = id;
    },
    deleteSongSheetById() {
      axios({
        method: "GET",
        url: "/user/deleteSongSheet",
        params: {
          userName: localStorage.getItem("user"),
          songSheetId: this.songSheetId,
        },
      }).then((res) => {
        this.deleteDialogVisible = false;
        ElMessage.success(res.data);
        this.reload();
      });
    },
    showSongSheet(item) {
      this.sheet = item;
      if (item.listTags != null && !Array.isArray(item.listTags)) {
        this.sheet.listTags = item.listTags
          .replace('["', "")
          .replace('"]', "")
          .replaceAll('"', "")
          .split(",");
      }
      axios({
        method: "GET",
        url: "/song/songListInSheet",
        params: {
          listId: item.listId + "",
        },
      }).then((res) => {
        this.tableData = res.data.songs;
      });
    },
    add() {
      if (!this.input) {
        ElMessage.error("歌单名字不能为空");
      } else {
        this.addSongSheet = false;
        axios({
          method: "GET",
          url: "/user/addSongSheet",
          params: {
            userName: localStorage.getItem("user"),
            songSheetName: this.input,
          },
        }).then((res) => {
          ElMessage.success(res.data);
          this.input = "";
          this.reload();
        });
      }
    },
    changeIntroduce() {
      this.open = !this.open;
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
    getDefaultSongSheet() {
      axios({
        method: "GET",
        url: "/user/defaultSong",
        params: {
          userName: localStorage.getItem("user"),
        },
      }).then((res) => {
        console.log(res.data);
        this.tableData = res.data.songs;
        this.sheet = this.defaultSongSheet;
        // this.sheet.listTitle = "我喜欢的音乐";
        this.sheet.listAuthor = res.data.user.userName;
        // this.sheet.listImg =
        //   "https://p1.music.126.net/G749JuAs4F3UDyqIZ4m3KA==/109951165459761626.jpg?param=200y200";
      });
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
  },
  mounted() {
    if (localStorage.getItem("user") != null) {
      this.logined = true;
    } else {
      this.logined = false;
    }
    if (this.logined) {
      axios({
        method: "GET",
        url: "/user/defaultSong",
        params: {
          userName: localStorage.getItem("user"),
        },
      }).then((res) => {
        console.log(res.data);
        this.tableData = res.data.songs;
        this.sheet.listTitle = "我喜欢的音乐";
        this.sheet.listAuthor = res.data.user.userName;
        axios({
          method: "GET",
          url: "/song/selectUserSongSheet",
          params: {
            songSheetIdList: res.data.user.userCollection,
          },
        }).then((res) => {
          this.myCollection = res.data;
        });
        this.mySinger = res.data.user.userSinger;
        this.sheet.listImg =
          "https://p1.music.126.net/G749JuAs4F3UDyqIZ4m3KA==/109951165459761626.jpg?param=200y200";
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
    }
  },
});
</script>

<style scoped>
.operation {
  display: flex;
  flex-direction: row;
  justify-content: right;
}
.remindLogin {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  font-size: 60px;
  height: 900px;
}
.left-bar {
  width: 30%;
  height: 100%;
  /* border-left: 1px solid rgba(0, 0, 0, 0.3); */
  /* border-right: 1px solid rgba(0, 0, 0, 0.3); */
  margin-right: -15%;
}
.myMain {
  width: 70%;
  left: 15%;
  position: relative;
  display: flex;
  flex-direction: row;
  background-color: white;
  justify-content: space-between;
}
.detail {
  position: relative;
  right: 0;
  width: 70%;
  border-left: 1px solid rgba(0, 0, 0, 0.3);
}
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