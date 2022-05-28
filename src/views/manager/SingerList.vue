<template>
  <el-table
    v-loading="loading"
    v-if="load"
    :data="singerList"
    style="width: 100%"
  >
    <el-table-column align="center" type="index" width="100">
      <template #header>
        <el-button type="primary" @click="insertSinger">添加歌手</el-button>
      </template>
    </el-table-column>
    <el-table-column label="歌手名字" prop="singerName" width="400" />
    <el-table-column label="歌手别名" prop="singerAlias" width="400" />
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
        <el-input v-model="search" size="small" placeholder="输入歌手名字" />
      </template>
      <template #default="scope">
        <el-button size="small" @click="handleEdit(scope.row)"
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
  <el-dialog v-model="dialogVisible" width="30%">
    <EditSinger :editItem="editItem" v-if="dialogVisible" />
  </el-dialog>
</template>
<script>
import axios from "axios";
import { defineComponent } from "vue";
import EditSinger from "../../components/EditSinger.vue"

export default defineComponent({
  components: {
    EditSinger,
  },
  provide() {
    return {
      closeDialog: this.closeDialog,
    }
  },
  data: () => ({
    singerList: [],
    loading: false,
    imagesList: [],
    search: "",
    load: true,
    dialogVisible: false,
    editItem: {},
  }),
  methods: {
    handleEdit(row) {
      this.editItem = row;
      this.dialogVisible = true;
    },
    closeDialog() {
      this.dialogVisible = false;
    },
    insertSinger() {
      this.editItem = {};
      this.dialogVisible = true;
    },
    reloadTable() {
      this.load = false;
      this.$nextTick(() => {
        this.load = true;
      });
    },
    getDatas() {
      axios({
        method: "POST",
        url: "/admin/getAllSinger",
        data: {
          query: this.search,
          pageNum: 1,
          pageSize: 20,
        },
      }).then((res) => {
        this.singerList = res.data.singer;
        for (const e of this.singerList) {
          this.imagesList.push(e.singerImg);
        }
        this.loading = false;
      });
    },
  },
  mounted() {
    this.loading = true;
    this.getDatas();
  },
  watch: {
    search() {
      this.loading = true;
      this.getDatas();
      this.reloadTable();
    },
  },
});
</script>
<style scoped>
</style>
