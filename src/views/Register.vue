<template>
  <div class="register">
    <div style="height:500px;width:400px" >
      <el-form
        label-position="right"
        label-width="100px"
        :model="formLabelAlign"
        style="max-width: 460px"
      >
        <el-form-item label="账号" prop="userName" >
          <el-input v-model="formLabelAlign.userName" clearable 
            ><template #prefix>
              <el-icon class="el-input__icon"><Avatar /></el-icon> </template
          ></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="userPwd">
          <el-input v-model="formLabelAlign.userPwd" clearable show-password>
            <template #prefix>
              <el-icon class="el-input__icon"><Lock /></el-icon>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="pwd">
          <el-input v-model="formLabelAlign.pwd" clearable show-password>
            <template #prefix>
              <el-icon class="el-input__icon"><Lock /></el-icon>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="userEmail">
          <el-input v-model="formLabelAlign.userEmail" clearable
            ><template #prefix>
              <el-icon class="el-input__icon"><message /></el-icon> </template
          ></el-input>
        </el-form-item>
      </el-form>
      <el-button type="primary" :loading="loading" class="registerBTN" @click="register">注册
        <el-icon class="el-input__icon"><Check /></el-icon>
      </el-button>
    </div>
  </div>
</template>
<script>
import { defineComponent } from "vue";
import { Avatar, Lock, Message, Check } from "@element-plus/icons-vue";
import axios from "axios";
import { ElMessage } from 'element-plus'

export default defineComponent({
  components: {
    Avatar,
    Lock,
    Message,
    Check,
  },
  data: () => ({
    formLabelAlign: {
      userName: "",
      userPwd: "",
      userEmail: "",
      pwd: "",
    },
    loading: false,
    rule: [
      {
        required: true,
        message: "账号/密码不能为空",
      },
    ],
  }),
  methods: {
    register() {
      console.log(this.formLabelAlign);
      axios({
        method: "POST",
        url: "/user/register",
        data: { 
          userName: this.formLabelAlign.userName,
          userPwd: this.formLabelAlign.userPwd,
          userEmail: this.formLabelAlign.userEmail
        }
      }).then(res => {
        if(res.data.success) {
          ElMessage.success(res.data.message);
          this.$router.push("/");
        } else {
          ElMessage.error(res.data.message);
        }
      })
    },
  },
});
</script>


<style scoped>
.register {
  position: relative;
  height: 830px;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
}
.registerBTN {
  width: 100px;
  margin-left: 80px;
}
</style>