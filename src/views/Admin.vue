<template>
    <div class="menu">
      <el-col :span="3" class="left-menu">
        <el-menu
          style="height: 929px"
          active-text-color="#ffd04b"
          background-color="#545c64"
          class="el-menu-vertical-demo"
          default-active="/"
          default-openeds="1"
          text-color="#fff"
          router="true"
        >
          <el-sub-menu index="1">
            <template #title>
              <el-icon><location /></el-icon>
              <span>后台管理</span>
            </template>
            <el-menu-item-group title="歌曲管理">
              <el-menu-item index="/admin/">歌曲列表</el-menu-item>
              <el-menu-item index="/admin/songSheetList">歌单列表</el-menu-item>
              <el-menu-item index="/admin/singerList">歌手列表</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group title="首页推荐banner管理">
              <el-menu-item index="/admin/bannerList">banner更换</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group title="用户管理">
              <el-menu-item index="/admin/userList">用户列表</el-menu-item>
              <el-menu-item index="/admin/commentList">评论列表</el-menu-item>
            </el-menu-item-group>
          </el-sub-menu>
        </el-menu>
      </el-col>
      <router-view class="table" />
    </div>
    
</template>

<script>
import { defineComponent } from "vue";
import { Location } from "@element-plus/icons-vue";

export default defineComponent({
  components: {
    Location,
  },
  inject: ["changeAdmin"],
  data: () => ({}),
  methods: {
    logOut() {
      localStorage.removeItem("admin");
      this.changeAdmin();
      this.$router.push("/");
    },
  },
});
</script>

<style scoped>
.logOut {
  position: fixed;
  right: 50px;
  top: 20px;
}
.menu {
  display: flex;
  flex-direction: row;
}
.table {
  flex-grow: 1;
}
</style>