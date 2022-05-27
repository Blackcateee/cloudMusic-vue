<template>
  <div class="login">
    <el-form
      label-position="right"
      label-width="100px"
      :model="formLabelAlign"
      style="max-width: 460px"
    >
      <el-form-item label="账号" prop="name">
        <el-input v-model="formLabelAlign.name" clearable
          ><template #prefix>
            <el-icon class="el-input__icon"><Avatar /></el-icon> </template
        ></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="pwd">
        <el-input v-model="formLabelAlign.pwd" clearable show-password>
          <template #prefix>
            <el-icon class="el-input__icon"><Lock /></el-icon>
          </template>
        </el-input>
      </el-form-item>
    </el-form>
    <a class="toRegister" href="/#/register" @click="closeForm"
      >没有账号？先注册</a
    >
  </div>
</template>

<script>
import { defineComponent } from "vue";
import { Avatar, Lock } from "@element-plus/icons-vue";
import axios from "axios";
import { ElMessage } from "element-plus";

export default defineComponent({
  components: {
    Avatar,
    Lock,
  },
  inject:["changeAdmin"],
  data: () => ({
    formLabelAlign: {
      name: "",
      pwd: "",
    },
    rule: [
      {
        required: true,
        message: "请输入账号/密码",
      },
    ],
  }),
  methods: {
    closeForm() {
      this.$emit("close");
    },
    login() {
      if (this.formLabelAlign.name == "admin") {
        axios({
          method: "GET",
          url: "/admin/login",
          params: {
            account: this.formLabelAlign.name,
            pwd: this.formLabelAlign.pwd,
          },
        }).then((res) => {
          if (res.data.success) {
            ElMessage.success(res.data.message);
            sessionStorage.setItem("admin", this.formLabelAlign.name);
            (this.formLabelAlign = {
              name: "",
              pwd: "",
            }),
              this.closeForm();
              this.changeAdmin();
            this.$router.push("/admin");
          } else {
            ElMessage.error(res.data.message);
          }
        });
      } else {
        axios({
          method: "POST",
          url: "/user/login",
          data: {
            userName: this.formLabelAlign.name,
            userPwd: this.formLabelAlign.pwd,
          },
        }).then((res) => {
          if (res.data.success) {
            ElMessage.success(res.data.message);
            localStorage.setItem("user", this.formLabelAlign.name);
            this.closeForm();
            this.$router.go(0);
          } else {
            ElMessage.error(res.data.message);
          }
        });
      }
    },
  },
});
</script>

<style scoped>
.toRegister {
  font-size: 10px;
  color: #409eff;
  position: relative;
  margin-left: 420px;
}
</style>
