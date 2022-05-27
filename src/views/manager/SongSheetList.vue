<template>
  <el-table v-loading="loading" :data="songSheetList" style="width: 100%">
    <el-table-column label="序号" type="index" />
    <el-table-column label="歌单名字" prop="listTitle" />
    <el-table-column label="歌单作者" prop="listAuthor" />
    <el-table-column label="歌单标签" prop="listTags" />
    <el-table-column label="歌单播放量" prop="listAmount" />
    <el-table-column label="歌单收藏量" prop="listCollection" />
    <el-table-column label="歌单分享量" prop="listForward" />
    <el-table-column label="歌单封面">
      <template #default="scope">
        <!-- <img width="60" height="60" :src="scope.row.songAlbumPicture" alt="" /> -->
        <div
          class="demo-image__preview"
          style="display: flex; align-items: center"
        >
          <el-image
            style="width: 100px; height: 100px"
            :src="scope.row.listImg"
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
    songSheetList: [],
    loading: false,
    imagesList: [],
  }),
  mounted() {
    this.loading = true;
    this.getDatas();
  },
  methods: {
    getDatas() {
      axios({
        method: "POST",
        url: "/admin/getAllSongSheet",
        data: {
          pageNun: 1,
          pageSize: 20,
        },
      }).then((res) => {
        this.songSheetList = res.data.sheet;
        for (const e of this.songSheetList) {
          this.imagesList.push(e.listImg);
        }
        this.loading = false;
      });
    },
  },
});
</script>
<style scoped>
</style>
