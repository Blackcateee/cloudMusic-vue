<template>
  <el-container>
    <el-header v-if="isRefreash">
      <div style="float:right" v-if="!admin"><el-button class="logOut" @click="logOut" type="primary">退出</el-button></div>
      <div id="nav" v-if="admin">
        <div class="logo">青听</div>
        <router-link to="/">发现音乐</router-link>
        <router-link to="/mySong">我的音乐</router-link>
        <router-link to="">下载客户端</router-link>
        <el-input v-model="input" class="w-50 m-2" placeholder="音乐/视频/歌手">
          <template #prefix>
            <el-icon class="el-input__icon"><search /></el-icon>
          </template>
        </el-input>
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
              src="http://121.40.137.246:9000/cloudmusic/images/%E5%BE%AE%E4%BF%A1%E5%9B%BE%E7%89%87_20220107173357.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=myMinio%2F20220502%2F%2Fs3%2Faws4_request&X-Amz-Date=20220502T080151Z&X-Amz-Expires=604800&X-Amz-SignedHeaders=host&X-Amz-Signature=63ee49ee180a0de6e544ce8042a31d0489d158389d4121ebade58cdda5dcc240"
              alt=""
            />
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item @click="goToMySong"
                  >我的音乐</el-dropdown-item
                >
                <el-dropdown-item>个人空间</el-dropdown-item>
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

export default defineComponent({
  components: {
    Search,
    AudioPlayer,
    Login,
  },
  data: () => ({
    admin: true,
    input: "",
    isRefreash: true,
    dialogVisible: false,
    logined: false,
    isRefreashPlayer: true,
  }),
  mounted() {
    if (localStorage.getItem("user") != null) {
      this.logined = true;
    }
    if (localStorage.getItem("admin") != null) {
      this.admin = false;
    } else {
      this.admin = true;
    }
  },
  provide() {
    return {
      changeAdmin: this.changeAdmin,
      reload: this.reload,
      reloadPlayer: this.reloadPlayer,
      loginDialogOpen: this.loginDialogOpen,
      play: this.play,
    };
  },
  methods: {
     logOut() {
      localStorage.removeItem("admin");
      this.changeAdmin();
      this.$router.push("/");
    },
    changeAdmin() {
    if (localStorage.getItem("admin") != null) {
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
  },
});
</script>


<style>
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
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
