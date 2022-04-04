<template>
  <el-container>
    <el-header>
      <div id="nav">
        <div class="logo">青听</div>
        <router-link to="/">发现音乐</router-link>
        <router-link to="/mySong">我的音乐</router-link>
        <router-link to="">下载客户端</router-link>
        <el-input v-model="input" class="w-50 m-2" placeholder="音乐/视频/歌手">
          <template #prefix>
            <el-icon class="el-input__icon"><search /></el-icon>
          </template>
        </el-input>
        <a href="" style="font-size: 10px; color: grey">登录</a>
      </div></el-header
    >
    <el-main style="padding:0">
      <router-view />
    </el-main>
  </el-container>
</template>

<script>
import { defineComponent } from "vue";
import { Search } from "@element-plus/icons-vue";

export default defineComponent({
  components: {
    Search,
  },
  data: () => ({
    input: "",
  }),
});
</script>


<style>
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
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
}
</style>
