<template>
  <div>
    <el-form
      :model="item"
      status-icon
      label-width="120px"
      class="demo-ruleForm"
    >
      <el-form-item label="歌单名字" prop="listTitle">
        <el-input v-model="item.listTitle" type="text" autocomplete="off" />
      </el-form-item>
      <el-form-item label="歌单作者" prop="listAuthor">
        <el-input v-model="item.listAuthor" type="text" autocomplete="off" />
      </el-form-item>
      <el-form-item label="歌单标签" prop="listTags">
        <el-input v-model="item.listTags" />
      </el-form-item>
      <el-form-item label="歌单描述" prop="listDescription">
        <el-input v-model="item.listDescription" type="textarea" />
      </el-form-item>
      <el-form-item>
        <div class="upload">
          <el-upload
            class="avatar-uploader"
            action="/song/upload"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
          >
            <img
              v-if="item.listImg"
              :src="item.listImg"
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
        <el-button type="primary" @click="submitForm()">提交</el-button>
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
  }),
  mounted() {
    if(this.editItem != null) {
      this.item = this.editItem;
    } else {
      this.item = {}
    }
  },
  methods: {
     handleAvatarSuccess(res) {
      this.item.listImg = res;
    },
    submitForm() {
      axios({
        method: "POST",
        url: "/song/insertSongSheet",
        data: this.item,
      }).then(res => {
        if(res.data.success) {
          ElMessage.success(res.data.message);
          this.closeDialog();
        } else {
          ElMessage.error(res.data.message);
        }
      })
    },
    resetForm() {
      this.item = {};
    }
  },
});
</script>
<style scoped>
</style>
