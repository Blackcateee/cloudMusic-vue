<template>
  <el-table v-loading="loading" :data="singerList" style="width: 100%">
      <el-table-column label="序号" type="index" />
      <el-table-column label="歌手名字" prop="singerName" width="400"/>
      <el-table-column label="歌手别名" prop="singerAlias" width="400"/>
      <el-table-column label="歌手图片">
      <template #default="scope">
        <!-- <img width="60" height="60" :src="scope.row.songAlbumPicture" alt="" /> -->
        <div
          class="demo-image__preview"
          style="display: flex; align-items: center"
        >
          <el-image
            style="width: 100px; height: 100px"
            :src="scope.row.singerImg"
            :preview-src-list="imagesList"
            :initial-index="scope.$index"
            preview-teleported
          />
        </div>
      </template>
    </el-table-column>
      <el-table-column align="right">
        <template #header>
          <el-input
            v-model="search"
            size="small"
            placeholder="Type to search"
          />
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
import axios from 'axios'
import { defineComponent } from 'vue'

export default defineComponent({
  data:() => ({
    singerList: [],
    loading: false,
    imagesList: [],
  }),
  methods: {
    getDatas() {
      axios({
        method: "POST",
        url: "/admin/getAllSinger",
        data: {
          pageNum: 1,
          pageSize: 20,
        }
      }).then(res => {
        this.singerList = res.data.singer;
         for (const e of this.singerList) {
          this.imagesList.push(e.singerImg);
        }
        this.loading = false;
      })
    }
  },
  mounted() {
    this.loading = true;
    this.getDatas();
  },
})
</script>
<style scoped>

</style>
