<template>
  <div>
    <el-form
      :model="item"
      status-icon
      label-width="120px"
      class="demo-ruleForm"
    >
      <el-form-item label="歌手名字" prop="singerName">
        <el-input v-model="item.singerName" type="text" autocomplete="off" />
      </el-form-item>
      <el-form-item label="歌手别名" prop="singerAlias">
        <el-input v-model="item.singerAlias" type="text" autocomplete="off" />
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
              v-if="item.singerImg"
              :src="item.singerImg"
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
import { defineComponent } from 'vue';
import axios from "axios";
import { ElMessage } from "element-plus";
import { Plus } from "@element-plus/icons-vue";

export default defineComponent({
  components: {
    Plus,
  },
  props: ["editItem"],
  inject: ["closeDialog"],
  data:() => ({
    item: {}
  }),
  mounted() {
    if(this.editItem != null) {
      this.item = this.editItem;
    } else {
      this.item = {};
    }
  },
  methods: {
     handleAvatarSuccess(res) {
      this.item.singerImg = res;
    },
    submitForm() {
      axios({
        method: "POST",
        url: "/song/insertSinger",
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
})
</script>
<style scoped>

</style>
