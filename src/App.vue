<template>
  <el-container>
    <el-header v-if="isRefreash">
      <div style="float: right" v-if="!admin">
        <el-button class="logOut" @click="logOut" type="primary"
          >退出</el-button
        >
      </div>
      <div id="nav" v-if="admin">
        <div class="logo">青听</div>
        <router-link to="/">发现音乐</router-link>
        <router-link to="/mySong">我的音乐</router-link>
        <router-link to="">下载客户端</router-link>
        <el-autocomplete
        v-loading="loading"
          v-model="state"
          :fetch-suggestions="querySearchAsync"
          placeholder="歌曲/歌手/歌单"
          @select="handleSelect"
        >
          <template #default="{ item }">
            <div class="value" v-html="item.value + '-' + item.artist"></div>
          </template>
          <template #prefix>
            <el-icon class="el-input__icon"><search /></el-icon> </template
        ></el-autocomplete>
        <a
          v-if="!logined"
          style="font-size: 10px; color: grey; cursor: pointer"
          @click="loginDialogOpen"
          >登录</a
        >
        <div class="userImg" v-if="logined">
          <el-dropdown>
            <img
              style="border-radius: 50%"
              width="40"
              height="40"
              :src="user.userImage"
              alt=""
            />
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item @click="goToMySong"
                  >我的音乐</el-dropdown-item
                >
                <el-dropdown-item @click="goToOwnSpace"
                  >个人空间</el-dropdown-item
                >
                <el-dropdown-item @click="logout">退出</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
      </div></el-header
    >
    <el-main style="padding: 0">
      <router-view v-if="isRefreash" />
    </el-main>
    <el-footer style="height: 30px; padding-bottom: 10px">
      @2018-2022 最终解释权归Blackcateee所有 git地址
      <a href="https://github.com/Blackcateee/cloudmusic-vue" target="_blank"
        >https://github.com/Blackcateee/cloudmusic-vue</a
      ></el-footer
    >
  </el-container>
  <div v-if="isRefreash">
    <div v-if="admin">
      <AudioPlayer ref="AudioPlayer" v-if="isRefreashPlayer" />
    </div>
  </div>
  <el-dialog v-model="dialogVisible" title="登录" width="30%">
    <Login ref="login" @close="close" />
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="login">登录</el-button>
      </span>
    </template>
  </el-dialog>
  <el-backtop :right="100" :bottom="100" />
</template>

<script>
import { defineComponent } from "vue";
import { Search } from "@element-plus/icons-vue";
import AudioPlayer from "./components/AudioPlayer.vue";
import Login from "./components/Login.vue";
import axios from "axios";

export default defineComponent({
  components: {
    Search,
    AudioPlayer,
    Login,
  },
  data: () => ({
    state: "",
    admin: true,
    input: "",
    isRefreash: true,
    dialogVisible: false,
    logined: false,
    isRefreashPlayer: true,
    user: {},
    results: [],
  }),
  mounted() {
    if (localStorage.getItem("user") != null) {
      this.logined = true;
      axios({
        method: "GET",
        url: "/user/getUserInfo",
        params: {
          userName: localStorage.getItem("user"),
        },
      }).then((res) => {
        this.user = res.data;
      });
    }
    if (sessionStorage.getItem("admin") != null) {
      this.admin = false;
    } else {
      this.admin = true;
    }
  },
  provide() {
    return {
      changeLogin: this.changeLogin,
      changeAdmin: this.changeAdmin,
      reload: this.reload,
      reloadPlayer: this.reloadPlayer,
      loginDialogOpen: this.loginDialogOpen,
      play: this.play,
    };
  },
  methods: {
    logOut() {
      sessionStorage.removeItem("admin");
      this.changeAdmin();
      this.$router.push("/");
    },
    changeAdmin() {
      if (sessionStorage.getItem("admin") != null) {
        this.admin = false;
      } else {
        this.admin = true;
      }
    },
    goToMySong() {
      this.$router.push("/mySong");
    },
    reloadPlayer() {
      this.isRefreashPlayer = false;
      this.$nextTick(() => {
        this.isRefreashPlayer = true;
      });
    },
    changeLogin() {
      this.logined = false;
    },
    reload() {
      this.isRefreash = false;
      this.$nextTick(() => {
        this.isRefreash = true;
      });
    },
    play() {
      setTimeout(() => {
        this.$refs.AudioPlayer.playMusic();
      }, 30);
    },
    login() {
      this.dialogVisible = false;
      this.$refs.login.login();
    },
    close() {
      this.dialogVisible = false;
    },
    loginDialogOpen() {
      this.dialogVisible = true;
    },
    logout() {
      localStorage.removeItem("user");
      this.$router.go(0);
    },
    goToOwnSpace() {
      this.$router.push("/ownSpace");
    },
    querySearchAsync(queryString, callback) {
      this.results = []
       axios({
        method: "GET",
        url: "/song/search",
        params: {
          state: queryString,
        },
      }).then((res) => {
        var resultArray = this.results;
        var result = res.data.songs;
        for (var i = 0; i < result.length; i++) {
          var object = {
            value: "",
            artist: "",
          };
          object.value = result[i].songName;
          object.artist = result[i].songArtist;
          resultArray.push(object);
        }
      });
      callback(this.results);
    },
    handleSelect() {},
  },
  // watch: {
  //   state(newValue) {
  //     console.log(newValue);
     
  //   },
  // },
});
</script>


<style>
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}
em {
  color: red;
}
.userImg {
  display: flex;
  justify-content: center;
  align-items: center;
}
.userImg img {
  margin-left: 30px;
  cursor: pointer;
}
.el-footer {
  border-top: 1px solid black;
  background-color: rgb(184, 8, 8);
  color: white;
  text-align: center;
  justify-content: center;
  flex-direction: row;
  display: flex;
  align-items: center;
  white-space: nowrap;
  overflow: hidden;
}
.el-footer a {
  text-decoration: none;
  color: white;
  padding-left: 10px;
}
.el-footer a:hover {
  text-decoration: underline;
}
.el-header {
  background-color: #333;
  color: white;
  text-align: center;
  line-height: 60px;
  align-items: center;
  white-space: nowrap;
}
.logo {
  width: 100px;
  font-size: 40px;
  padding-right: 20px;
}
#nav {
  position: absolute;
  right: 30%;
  width: 35%;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.el-header a {
  color: white;
  text-decoration: none;
  padding: 0 20px 0 20px;
}
.el-header a:hover {
  background-color: #000;
}
.el-main {
  background-color: #e9eef3;
  color: #333;
  text-align: center;
  overflow: hidden;
}
.logOut {
  position: relative;
  right: 20px;
}
</style>
