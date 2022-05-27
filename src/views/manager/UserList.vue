<template>
  <el-table v-loading="loading" :data="userList" style="width: 100%">
    <el-table-column label="序号" type="index" />
    <el-table-column label="用户名" prop="userName" />
    <el-table-column label="用户邮箱" prop="userEmail" />
    <el-table-column label="用户密码" prop="userPwd" />
    <el-table-column label="用户昵称" prop="userNickname" />
    <el-table-column label="用户头像">
      <template #default="scope">
        <!-- <img width="60" height="60" :src="scope.row.songAlbumPicture" alt="" /> -->
        <div
          class="demo-image__preview"
          style="display: flex; align-items: center"
        >
          <el-image
            style="width: 100px; height: 100px"
            :src="scope.row.userImage"
            :preview-src-list="imagesList"
            :initial-index="scope.$index"
            preview-teleported
          />
        </div>
      </template>
    </el-table-column>
    <el-table-column align="right">
      <template #header>
        <el-input v-model="search" size="small" placeholder="Type to search" />
      </template>
      <template #default="scope">
        <el-button size="small" @click="handleEdit(scope.$index, scope.row)"
          >Edit</el-button
        >
        <el-button
          size="small"
          type="danger"
          @click="handleDelete(scope.$index, scope.row)"
          >Delete</el-button
        >
      </template>
    </el-table-column>
  </el-table>
</template>
<script>
import axios from "axios";
import { defineComponent } from "vue";

export default defineComponent({
  data: () => ({
    userList: [],
    loading: false,
    imagesList: [],
  }),
  methods: {
    getData() {
      axios({
        method: "POST",
        url: "/admin/getAllUser",
        data: {
          pageSize: 20,
          pageNum: 1,
        },
      }).then((res) => {
        this.userList = res.data.user;
        for (const e of this.userList) {
          this.imagesList.push(e.userImage);
        }
        this.loading = false;
      });
    },
  },
  mounted() {
    this.loading = true;
    this.getData();
  },
});
</script>
<style scoped>
</style>
