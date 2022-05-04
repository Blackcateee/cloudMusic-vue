<template>
  <div class="singer-main">
     <div class="recommend-top">
      <el-icon color="red" :size="20"><flag /></el-icon>
      <p style="font-size: 30px; margin-left: 10px">全部</p>
      <a href="/#/sheet" style="margin-left: auto; top: 0; cursor: pointer"
        >热门<i style="color: red; font-weight: bold">-></i></a
      >
    </div>
    <div class="main">
      <div class="singerDetail" v-for="item in singers" :key="item.index">
        <img
          width="203"
          height="203"
          :src="item.singerImg.replace('?param=640y300')"
          alt=""
          style="cursor:pointer"
          @click="goToDetail(item.singerId)"
        />
        <div class="singerName">
          <span class="name" @click="goToDetail(item.singerId)">{{ item.singerName }}</span>
          <span class="alias">{{ item.singerAlias }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import axios from "axios";

export default defineComponent({
  data: () => ({
    visited: 1,
    singers: [],
  }),
  methods: {
    isVisited(val) {
      this.visited = val;
    },
    goToDetail(id) {
      this.$router.push(`/singerDetail/${id}`)
    }
  },
  mounted() {
    axios({
      method: "GET",
      url: "/song/getSingerList",
    }).then((res) => {
      this.singers = res.data;
    });
  },
});
</script>
<style scoped>
.main {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 100%;
  flex-wrap: wrap;
}
.name {
  cursor: pointer;
}
.name:hover {
  text-decoration: underline;
}
.singer-main {
  background-color: white;
  width: 70%;
  left: 15%;
  position: relative;
  border: 2px solid rgba(0, 0, 0, 0.2);
}
.recommend-top {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  border-bottom: 3px solid red;
  padding: 5px;
  margin: 0 20px;
  text-align: center;
  align-items: baseline;
}
.singerDetail {
  width: 205px;
  height: 233px;
  /* border: 1px solid rgba(0, 0, 0, 0.5); */
  box-shadow: 1px 5px 5px gray;
  margin: 20px;
  border-radius: 5px;
}
.alias {
  font-size: 15px;
  color: grey;
}
.singerName {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
}
</style>