<template>
  <el-table v-loading="loading" :data="commentList" style="width: 100%">
    <el-table-column label="序号" type="index" />
    <el-table-column label="评论内容" prop="comment" />
    <el-table-column label="用户" prop="userNickName" />
    <el-table-column label="评论时间" prop="commentTime" />
    <el-table-column align="right" label="操作">
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
    commentList: [],
    loading: false,
  }),
  methods: {
    getData() {
      axios({
        method: "POST",
        url: "/admin/getAllComment",
        data: {
          pageNum: 1,
          pageSize: 20,
        }
      }).then(res => {
        this.commentList = res.data.comments;
        this.loading = false;
      })
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
