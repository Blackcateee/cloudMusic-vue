<template>
  <el-table v-loading="loading" v-if="!isRereash" :data="songSheetList" style="width: 100%">
    <el-table-column align="center" type="index" width="100">
      <template #header>
        <el-button type="primary" @click="insertSongSheet">添加歌单</el-button>
      </template>
    </el-table-column>
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
        <el-input v-model="search" size="small" placeholder="通过歌单名字搜索" />
      </template>
      <template #default="scope">
        <el-button size="small" @click="handleEdit(scope.row)"
          >Edit</el-button
        >
        <el-button
          size="small"
          type="danger"
          @click="handleDelete(scope.row)"
          >Delete</el-button
        >
      </template>
    </el-table-column>
  </el-table>
  <el-dialog v-model="dialogVisible" width="30%">
    <EditSongSheet :editItem="editItem" v-if="dialogVisible" />
  </el-dialog>
</template>
<script>
import axios from "axios";
import { ElMessage } from "element-plus/lib/components";
import { defineComponent } from "vue";
import EditSongSheet from "../../components/EditSongSheet.vue"

export default defineComponent({
  components: {
    EditSongSheet,
  },
  provide() {
    return {
      closeDialog: this.closeDialog,
    };
  },
  data: () => ({
    dialogVisible: false,
    songSheetList: [],
    loading: false,
    imagesList: [],
    editItem: {},
    isRereash: false,
    search: "",
  }),
  mounted() {
    this.loading = true;
    this.getDatas();
  },
  methods: {
    handleDelete(row) {
      axios({
        method: "GET",
        url: "/song/deleteSongSheet",
        params: {
          songSheetId: row.listId
        }
      }).then(res => {
        if(res.data) {
          ElMessage.success("删除成功");
          this.getDatas();
          this.reloadTable();
        }
      })
    },
    reloadTable() {
      this.isRereash = true;
      this.$nextTick(() => {
        this.isRereash = false;
      })
    },
    closeDialog() {
      this.dialogVisible = false;
    },
    handleEdit(row) {
      this.editItem = row;
      this.dialogVisible = true;
    },
    insertSongSheet() {
      this.dialogVisible = true;
      this.editItem = {}
    },
    getDatas() {
      axios({
        method: "POST",
        url: "/admin/getAllSongSheet",
        data: {
          query: this.search,
          pageNun: 1,
          pageSize: 20,
        },
      }).then((res) => {
        this.songSheetList = res.data.sheet;
        this.imagesList = [];
        for (const e of this.songSheetList) {
          this.imagesList.push(e.listImg);
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
    }
  }
});
</script>
<style scoped>
</style>
