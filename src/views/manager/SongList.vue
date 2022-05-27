<template>
  <el-table
    v-loading="loading"
    v-if="!isRefreash"
    :data="tableData"
    style="width: 100%"
  >
    <el-table-column align="center" type="index" width="100">
      <template #header>
        <el-button type="primary" @click="insertSong">添加歌曲</el-button>
      </template>
    </el-table-column>
    <el-table-column label="歌曲名字" prop="songName" />
    <el-table-column label="歌曲作者" prop="songArtist" />
    <el-table-column label="歌曲所属专辑" prop="songAlbum" />
    <!-- <el-table-column label="歌词" prop="songLyric" /> -->
    <el-table-column label="歌曲评论数" prop="songComment" />
    <el-table-column label="专辑封面">
      <template #default="scope">
        <!-- <img width="60" height="60" :src="scope.row.songAlbumPicture" alt="" /> -->
        <div
          class="demo-image__preview"
          style="display: flex; align-items: center"
        >
          <el-image
            style="width: 100px; height: 100px"
            :src="scope.row.songAlbumPicture"
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
          placeholder="通过歌曲名字搜索"
        />
      </template>
      <template #default="scope">
        <el-button size="small" @click="handleEdit(scope.row)">Edit</el-button>
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
    <EditSong :editItem="editItem" v-if="dialogVisible" />
  </el-dialog>
</template>
<script>
import axios from "axios";
import { defineComponent } from "vue";
import EditSong from "../../components/EditSong.vue";

export default defineComponent({
  components: {
    EditSong,
  },
  provide() {
    return {
      closeDialog: this.closeDialog,
    };
  },
  data: () => ({
    loading: false,
    search: "",
    imagesList: [],
    isRereash: true,
    tableData: [],
    dialogVisible: false,
    editItem: {},
  }),
  mounted() {
    this.loading = true;
    this.getDatas();
  },
  methods: {
    closeDialog() {
      this.dialogVisible = false;
    },
    reloadTable() {
      this.isRereash = false;
      this.$nextTick(() => {
        this.isRereash = true;
      });
    },
    insertSong() {
      this.dialogVisible = true;
      this.editItem = {};
    },
    handleEdit(item) {
      this.dialogVisible = true;
      this.editItem = item;
    },
    handleDelete() {},
    getDatas() {
      axios({
        method: "POST",
        url: "/admin/getAllSongs",
        data: {
          query: this.search,
          pageNum: 1,
          pageSize: 20,
        },
      }).then((res) => {
        this.tableData = res.data.songs;
        for (const e of this.tableData) {
          this.imagesList.push(e.songAlbumPicture);
        }
        this.loading = false;
      });
    },
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
.demo-image__error .image-slot {
  font-size: 30px;
}
.demo-image__error .image-slot .el-icon {
  font-size: 30px;
}
.demo-image__error .el-image {
  width: 100%;
  height: 200px;
}
</style>
