<template>
  <div class="main">
    <div class="header">个人设置</div>
    <div class="detail">
      <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
        <el-tab-pane label="基本信息" name="first">
          <el-form
            ref="ruleFormRef"
            :model="ruleForm"
            status-icon
            :rules="rules"
            label-width="120px"
            class="demo-ruleForm"
          >
            <el-form-item label="昵称" prop="nickName">
              <el-input
                v-model="ruleForm.nickName"
                type="text"
                autocomplete="off"
              />
            </el-form-item>
            <el-form-item>
              <div class="upload">
                <el-upload
                  class="avatar-uploader"
                  action="/user/uploadAvatar"
                  :show-file-list="false"
                  :on-success="handleAvatarSuccess"
                  :before-upload="beforeAvatarUpload"
                >
                  <img
                    v-if="ruleForm.userImage"
                    :src="ruleForm.userImage"
                    class="avatar"
                  />
                  <el-icon v-else class="avatar-uploader-icon"
                    ><Plus
                  /></el-icon>
                </el-upload>
                头像上传
              </div>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="submitForm()">提交</el-button>
              <el-button @click="resetForm(ruleForm)">重置</el-button>
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="密码修改" name="second">
          <el-form
            ref="ruleFormRef"
            :model="form"
            status-icon
            :rules="rules"
            label-width="120px"
            class="demo-ruleForm"
          >
            <el-form-item label="密码" prop="password">
              <el-input
                v-model="form.password"
                type="password"
                autocomplete="off"
                clearable
                show-password
              />
            </el-form-item>
            <el-form-item label="确认密码" prop="confirm">
              <el-input
                v-model="form.confirm"
                type="password"
                autocomplete="off"
                clearable
                show-password
              />
            </el-form-item>
            <el-form-item>
              <el-button :disabled="disabled" type="primary" @click="submit(form)">提交</el-button>
              <el-button @click="reset(form)">重置</el-button>
            </el-form-item>
          </el-form>
        </el-tab-pane>
      </el-tabs>
    </div>
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
  inject: ["changeLogin"],
  data() {
    var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          callback()
        }
      };
    var validateConfirm = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else if(value !== this.form.password) {
          this.disabled = true;
          callback(new Error('两次输入的密码不一致'))
        } else {
          this.disabled = false;
          callback()
        }
      };
    return {
      disabled: false,
      activeName: "first",
      imageUrl: "",
      ruleForm: {
        nickName: "",
        userImage: "",
      },
      form: {
        password: "",
        confirm: "",
      },
      rules: {
        password: [
          {
            validator: validatePass,
            trigger: "blur",
          },
        ],
        confirm: [
          {
            validator: validateConfirm,
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    resetForm() {
      this.ruleForm = {};
    },
    submit() {
      axios({
        method: "GET",
        url: "/user/updatePassword",
        params: {
          userName: localStorage.getItem("user"),
          password: this.form.password
        }
      }).then(res => {
        ElMessage.success(res.data.message);
        localStorage.removeItem("user");
        this.changeLogin();
        this.$router.push("/");
      })
    },
    reset() {
      this.form = {};
    },
    submitForm() {
      axios({
        method: "GET",
        url: "/user/updateUser",
        params: {
          userName: localStorage.getItem("user"),
          nickName: this.ruleForm.nickName,
          userImage: this.ruleForm.userImage,
        },
      }).then((res) => {
        ElMessage.success(res.data.message);
        this.$router.go(0);
      });
    },
    handleAvatarSuccess(res) {
      this.ruleForm.userImage = res;
      console.log(this.imageUrl);
    },
    beforeAvatarUpload(rawFile) {
      console.log(rawFile);
    },
  },
});
</script>
<style scoped>
.header {
  margin-top: 20px;
}
.main {
  position: relative;
  left: 15%;
  width: 70%;
  height: 838px;
  background-color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.detail {
  width: 900px;
}
.avatar-uploader .avatar {
  width: 178px;
  height: 178px;
  float: right;
}
</style>
<style>
.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}
</style>
