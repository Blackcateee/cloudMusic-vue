<template>
  <div class="comment">
    <div class="comment-top">
      <p style="font-size: 30px; margin-left: 10px">
        评论<span class="comment-amount">共{{ total }}条评论</span>
      </p>
    </div>
    <div class="comment-area" v-if="logined">
      <img
        style="margin: 20px"
        width="70"
        height="70"
        :src="user.userImage"
        alt=""
      />
      <el-input
        style="margin: 20px 20px 20px 0"
        v-model="comment"
        :rows="3"
        type="textarea"
        placeholder="评论"
      ></el-input>
    </div>
    <div class="operate"  v-if="logined">
      <el-button style="margin-right: 20px" type="primary" @click="addComment"
        >评论</el-button
      >
    </div>
    <div class="table">
      <div
        v-for="item in commentData"
        :key="item.index"
        style="margin: 20px"
        class="comment-detail"
      >
        <img
          style="margin: 20px"
          width="70"
          height="70"
          :src="item.userImg"
          alt=""
        />
        <div class="detail">
          <div>
            <a href="" class="userName">{{ item.userNickName }}</a> :
            <span>{{ item.comment }}</span>
          </div>
          <span>{{ item.commentTime }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { defineComponent } from "vue";
import { ElMessage } from "element-plus";

export default defineComponent({
  props: ["songSheetId"],
  inject: ["refreash"],
  data: () => ({
    comment: "",
    content: [],
    user: {},
    queryMessage: "",
    pageNum: 1,
    pageSize: 20,
    commentData: [],
    total: "",
    logined: false,
  }),
  mounted() {
    if (localStorage.getItem("user") != null) {
      axios({
        method: "GET",
        url: "/user/getUserInfo",
        params: {
          userName: localStorage.getItem("user"),
        },
      }).then((res) => {
        this.user = res.data;
        this.logined = true;
      });
    }
    axios({
      method: "POST",
      url: "/user/getComment",
      data: {
        pageNum: this.pageNum,
        pageSize: this.pageSize,
        query: this.songSheetId,
      },
    }).then((res) => {
      this.commentData = res.data.comments;
      this.total = res.data.total;
      console.log(res.data);
    });
  },
  methods: {
    addComment() {
      if (this.comment == "") {
        ElMessage.error("评论不能为空");
      } else {
        axios({
          method: "POST",
          url: "/user/insertComment",
          data: {
            userName: localStorage.getItem("user"),
            songSheetId: this.songSheetId,
            songId: 0,
            comment: this.comment,
          },
        }).then((res) => {
          if (res.data.success) {
            ElMessage.success(res.data.message);
            this.refreash();
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
.comment-top {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  border-bottom: 3px solid red;
  padding: 5px;
  margin: 0 20px;
  text-align: center;
  align-items: baseline;
}
.comment-amount {
  font-size: 15px;
  margin-left: 30px;
}
.comment-area {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
}
.operate {
  width: 100%;
  display: flex;
  justify-content: right;
}
.userName {
  color: #409eff;
  text-decoration: none;
}
.comment-detail {
  display: flex;
  flex-direction: row;
}
.comment-detail {
  border-top: 1px solid rgba(0, 0, 0, 0.3);
}
.detail {
  display: flex;
  justify-content: space-around;
  flex-direction: column;
}
</style>