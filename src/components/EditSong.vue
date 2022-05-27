<template>
  <div>
    <el-form
      :model="item"
      status-icon
      label-width="120px"
      class="demo-ruleForm"
    >
      <el-form-item label="歌曲名字" prop="songName">
        <el-input v-model="item.songName" type="text" autocomplete="off" />
      </el-form-item>
      <el-form-item label="歌曲作者" prop="songArtist">
        <el-input v-model="item.songArtist" type="text" autocomplete="off" />
      </el-form-item>
      <el-form-item label="歌曲所属专辑" prop="songAlbum">
        <el-input v-model="item.songAlbum" />
      </el-form-item>
      <el-form-item>
        <div class="upload">
          <el-upload
            class="avatar-uploader"
            action="/song/upload"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img
              v-if="item.songAlbumPicture"
              :src="item.songAlbumPicture"
              class="avatar"
              width="300"
              height="300"
            />
            <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
          </el-upload>
          封面修改
        </div>
      </el-form-item>
      <el-form-item>
        <el-upload
          ref="uploadRef"
          class="upload-demo"
          action="/song/uploadSong"
          :auto-upload="false"
          :on-success="handleSuccess"
        >
          <template #trigger >
            <el-button :disabled="!edit" type="primary">音源</el-button>
          </template>
          <template #tip="edit" >
            <div v-if="edit" class="el-upload__tip">
              请选择音频文件
            </div>
            <div v-if="!edit">
              暂不支持音频修改
            </div>
          </template>
        </el-upload>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm()"
          >提交</el-button
        >
        <el-button @click="resetForm()">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { defineComponent } from "vue";
import { Plus } from "@element-plus/icons-vue";
import axios from "axios";
import { ElMessage } from "element-plus";

export default defineComponent({
  components: {
    Plus,
  },
  props: ["editItem"],
  inject: ["closeDialog"],
  data: () => ({
    item: {},
    edit: false,
  }),
  mounted() {
    if (this.editItem != null) {
      this.item = this.editItem;
      this.edit = true;
    } else {
      this.item = {};
      this.edit = false;
    }
  },
  methods: {
    handleSuccess(res) {
      this.item.songUrl = res;
      this.transferData();
    },
    handleAvatarSuccess(res) {
      this.item.songAlbumPicture = res;
    },
    submitForm() {
      this.$refs.uploadRef.submit();
    },
    transferData() {
      axios({
        method: "POST",
        url: "/song/insertSong",
        data: this.item
      }).then(res => {
        if(res.data.success) {
          ElMessage.success(res.data.message);
          this.closeDialog();
        } else {
          ElMessage.error(res.data.message);
        }
      })
    },
  },
});
</script>
<style scoped>
</style>
