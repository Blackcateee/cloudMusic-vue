<template>
  <div class="main">
    <div class="recommend-top">
      <el-icon color="red" :size="20"><flag /></el-icon>
      <p style="font-size: 30px; margin-left: 10px">全部</p>
      <a href="/#/sheet" style="margin-left: auto; top: 0; cursor: pointer"
        >热门<i style="color: red; font-weight: bold">-></i></a
      >
    </div>
    <song-sheet :song-sheet="songSheet"></song-sheet>
    <div class="page">
      <el-pagination
        background
        layout="prev, pager, next"
        :total="page.total"
        :page-size="pageInfo.pageSize"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import SongSheet from "../../components/SongSheet.vue";
import axios from "axios";

export default defineComponent({
  components: {
    SongSheet,
  },
  data: () => ({
    songSheet: [
      {
        id: 1,
        url: "http://p2.music.126.net/LsRKVImeGXGnRYpSQ4FgXg==/109951167146831219.jpg?param=140y140",
        describe: "1",
        playNum: 100,
      },
      {
        id: 1,
        url: "http://p2.music.126.net/LsRKVImeGXGnRYpSQ4FgXg==/109951167146831219.jpg?param=140y140",
        describe: "简短介绍",
        playNum: 100,
      },
      {
        id: 1,
        url: "http://p2.music.126.net/LsRKVImeGXGnRYpSQ4FgXg==/109951167146831219.jpg?param=140y140",
        describe: "简短介绍",
        playNum: 100,
      },
      {
        id: 1,
        url: "http://p2.music.126.net/LsRKVImeGXGnRYpSQ4FgXg==/109951167146831219.jpg?param=140y140",
        describe: "简短介绍1313123123112312312313",
        playNum: 100,
      },
      {
        url: "http://p2.music.126.net/a4RUDBj-LDKN7WMClV65OQ==/109951164735432462.jpg?param=140y140",
        describe: "简短介绍1231231231231",
        playNum: 100,
      },
      {
        id: 2,
        url: "http://p2.music.126.net/a4RUDBj-LDKN7WMClV65OQ==/109951164735432462.jpg?param=140y140",
        describe: "简短介绍",
        playNum: 100,
      },
      {
        id: 2,
        url: "http://p2.music.126.net/a4RUDBj-LDKN7WMClV65OQ==/109951164735432462.jpg?param=140y140",
        describe: "简短介绍",
        playNum: 100,
      },
      {
        id: 2,
        url: "http://p2.music.126.net/a4RUDBj-LDKN7WMClV65OQ==/109951164735432462.jpg?param=140y140",
        describe: "简短介绍132132123132123123323",
        playNum: 100,
      },
      {
        id: 1,
        url: "http://p2.music.126.net/LsRKVImeGXGnRYpSQ4FgXg==/109951167146831219.jpg?param=140y140",
        describe: "简短介绍",
        playNum: 100,
      },
      {
        id: 1,
        url: "http://p2.music.126.net/LsRKVImeGXGnRYpSQ4FgXg==/109951167146831219.jpg?param=140y140",
        describe: "简短介绍",
        playNum: 100,
      },
      {
        id: 1,
        url: "http://p2.music.126.net/LsRKVImeGXGnRYpSQ4FgXg==/109951167146831219.jpg?param=140y140",
        describe: "简短介绍",
        playNum: 100,
      },
      {
        id: 1,
        url: "http://p2.music.126.net/LsRKVImeGXGnRYpSQ4FgXg==/109951167146831219.jpg?param=140y140",
        describe: "简短介绍",
        playNum: 100,
      },
      {
        id: 1,
        url: "http://p2.music.126.net/LsRKVImeGXGnRYpSQ4FgXg==/109951167146831219.jpg?param=140y140",
        describe: "简短介绍",
        playNum: 100,
      },
      {
        id: 1,
        url: "http://p2.music.126.net/LsRKVImeGXGnRYpSQ4FgXg==/109951167146831219.jpg?param=140y140",
        describe: "简短介绍",
        playNum: 100,
      },
      {
        id: 1,
        url: "http://p2.music.126.net/LsRKVImeGXGnRYpSQ4FgXg==/109951167146831219.jpg?param=140y140",
        describe: "简短介绍",
        playNum: 100,
      },
      {
        id: 1,
        url: "http://p2.music.126.net/LsRKVImeGXGnRYpSQ4FgXg==/109951167146831219.jpg?param=140y140",
        describe: "简短介绍",
        playNum: 100,
      },
      {
        id: 1,
        url: "http://p2.music.126.net/LsRKVImeGXGnRYpSQ4FgXg==/109951167146831219.jpg?param=140y140",
        describe: "简短介绍",
        playNum: 100,
      },
      {
        id: 1,
        url: "http://p2.music.126.net/LsRKVImeGXGnRYpSQ4FgXg==/109951167146831219.jpg?param=140y140",
        describe: "简短介绍",
        playNum: 100,
      },
      {
        id: 1,
        url: "http://p2.music.126.net/LsRKVImeGXGnRYpSQ4FgXg==/109951167146831219.jpg?param=140y140",
        describe: "简短介绍",
        playNum: 100,
      },
      {
        id: 1,
        url: "http://p2.music.126.net/LsRKVImeGXGnRYpSQ4FgXg==/109951167146831219.jpg?param=140y140",
        describe: "简短介绍",
        playNum: 100,
      },
      {
        id: 1,
        url: "http://p2.music.126.net/LsRKVImeGXGnRYpSQ4FgXg==/109951167146831219.jpg?param=140y140",
        describe: "简短介绍",
        playNum: 100,
      },
      {
        id: 1,
        url: "http://p2.music.126.net/LsRKVImeGXGnRYpSQ4FgXg==/109951167146831219.jpg?param=140y140",
        describe: "简短介绍",
        playNum: 100,
      },
      {
        id: 1,
        url: "http://p2.music.126.net/LsRKVImeGXGnRYpSQ4FgXg==/109951167146831219.jpg?param=140y140",
        describe: "简短介绍",
        playNum: 100,
      },
      {
        id: 1,
        url: "http://p2.music.126.net/LsRKVImeGXGnRYpSQ4FgXg==/109951167146831219.jpg?param=140y140",
        describe: "简短介绍",
        playNum: 100,
      },
      {
        id: 1,
        url: "http://p2.music.126.net/LsRKVImeGXGnRYpSQ4FgXg==/109951167146831219.jpg?param=140y140",
        describe: "简短介绍",
        playNum: 100,
      },
    ],
    songSheet1: [
      {
        id: 1,
        url: "http://p2.music.126.net/LsRKVImeGXGnRYpSQ4FgXg==/109951167146831219.jpg?param=140y140",
        describe: "1",
        playNum: 100,
      },
      {
        id: 1,
        url: "http://p2.music.126.net/LsRKVImeGXGnRYpSQ4FgXg==/109951167146831219.jpg?param=140y140",
        describe: "简短介绍",
        playNum: 100,
      },
      {
        id: 1,
        url: "http://p2.music.126.net/LsRKVImeGXGnRYpSQ4FgXg==/109951167146831219.jpg?param=140y140",
        describe: "简短介绍",
        playNum: 100,
      },
      {
        id: 1,
        url: "http://p2.music.126.net/LsRKVImeGXGnRYpSQ4FgXg==/109951167146831219.jpg?param=140y140",
        describe: "简短介绍1313123123112312312313",
        playNum: 100,
      },
      {
        url: "http://p2.music.126.net/a4RUDBj-LDKN7WMClV65OQ==/109951164735432462.jpg?param=140y140",
        describe: "简短介绍1231231231231",
        playNum: 100,
      },
      {
        id: 2,
        url: "http://p2.music.126.net/a4RUDBj-LDKN7WMClV65OQ==/109951164735432462.jpg?param=140y140",
        describe: "简短介绍",
        playNum: 100,
      },
      {
        id: 2,
        url: "http://p2.music.126.net/a4RUDBj-LDKN7WMClV65OQ==/109951164735432462.jpg?param=140y140",
        describe: "简短介绍",
        playNum: 100,
      },
      {
        id: 2,
        url: "http://p2.music.126.net/a4RUDBj-LDKN7WMClV65OQ==/109951164735432462.jpg?param=140y140",
        describe: "简短介绍132132123132123123323",
        playNum: 100,
      },
      {
        id: 1,
        url: "http://p2.music.126.net/LsRKVImeGXGnRYpSQ4FgXg==/109951167146831219.jpg?param=140y140",
        describe: "简短介绍",
        playNum: 100,
      },
      {
        id: 1,
        url: "http://p2.music.126.net/LsRKVImeGXGnRYpSQ4FgXg==/109951167146831219.jpg?param=140y140",
        describe: "简短介绍",
        playNum: 100,
      },
      {
        id: 1,
        url: "http://p2.music.126.net/LsRKVImeGXGnRYpSQ4FgXg==/109951167146831219.jpg?param=140y140",
        describe: "简短介绍",
        playNum: 100,
      },
      {
        id: 1,
        url: "http://p2.music.126.net/LsRKVImeGXGnRYpSQ4FgXg==/109951167146831219.jpg?param=140y140",
        describe: "简短介绍",
        playNum: 100,
      },
      {
        id: 1,
        url: "http://p2.music.126.net/LsRKVImeGXGnRYpSQ4FgXg==/109951167146831219.jpg?param=140y140",
        describe: "简短介绍",
        playNum: 100,
      },
      {
        id: 1,
        url: "http://p2.music.126.net/LsRKVImeGXGnRYpSQ4FgXg==/109951167146831219.jpg?param=140y140",
        describe: "简短介绍",
        playNum: 100,
      },
      {
        id: 1,
        url: "http://p2.music.126.net/LsRKVImeGXGnRYpSQ4FgXg==/109951167146831219.jpg?param=140y140",
        describe: "简短介绍",
        playNum: 100,
      },
      {
        id: 1,
        url: "http://p2.music.126.net/LsRKVImeGXGnRYpSQ4FgXg==/109951167146831219.jpg?param=140y140",
        describe: "简短介绍",
        playNum: 100,
      },
      {
        id: 1,
        url: "http://p2.music.126.net/LsRKVImeGXGnRYpSQ4FgXg==/109951167146831219.jpg?param=140y140",
        describe: "简短介绍",
        playNum: 100,
      },
      {
        id: 1,
        url: "http://p2.music.126.net/LsRKVImeGXGnRYpSQ4FgXg==/109951167146831219.jpg?param=140y140",
        describe: "简短介绍",
        playNum: 100,
      },
      {
        id: 1,
        url: "http://p2.music.126.net/LsRKVImeGXGnRYpSQ4FgXg==/109951167146831219.jpg?param=140y140",
        describe: "简短介绍",
        playNum: 100,
      },
      {
        id: 1,
        url: "http://p2.music.126.net/LsRKVImeGXGnRYpSQ4FgXg==/109951167146831219.jpg?param=140y140",
        describe: "简短介绍",
        playNum: 100,
      },
      {
        id: 1,
        url: "http://p2.music.126.net/LsRKVImeGXGnRYpSQ4FgXg==/109951167146831219.jpg?param=140y140",
        describe: "简短介绍",
        playNum: 100,
      },
      {
        id: 1,
        url: "http://p2.music.126.net/LsRKVImeGXGnRYpSQ4FgXg==/109951167146831219.jpg?param=140y140",
        describe: "简短介绍",
        playNum: 100,
      },
      {
        id: 1,
        url: "http://p2.music.126.net/LsRKVImeGXGnRYpSQ4FgXg==/109951167146831219.jpg?param=140y140",
        describe: "简短介绍",
        playNum: 100,
      },
      {
        id: 1,
        url: "http://p2.music.126.net/LsRKVImeGXGnRYpSQ4FgXg==/109951167146831219.jpg?param=140y140",
        describe: "简短介绍",
        playNum: 100,
      },
      {
        id: 1,
        url: "http://p2.music.126.net/LsRKVImeGXGnRYpSQ4FgXg==/109951167146831219.jpg?param=140y140",
        describe: "简短介绍",
        playNum: 100,
      },
    ],
    songSheet2: [
      {
        id: 1,
        url: "http://p2.music.126.net/LsRKVImeGXGnRYpSQ4FgXg==/109951167146831219.jpg?param=140y140",
        describe: "2",
        playNum: 100,
      },
      {
        id: 1,
        url: "http://p2.music.126.net/LsRKVImeGXGnRYpSQ4FgXg==/109951167146831219.jpg?param=140y140",
        describe: "简短介绍",
        playNum: 100,
      },
      {
        id: 1,
        url: "http://p2.music.126.net/LsRKVImeGXGnRYpSQ4FgXg==/109951167146831219.jpg?param=140y140",
        describe: "简短介绍",
        playNum: 100,
      },
      {
        id: 1,
        url: "http://p2.music.126.net/LsRKVImeGXGnRYpSQ4FgXg==/109951167146831219.jpg?param=140y140",
        describe: "简短介绍1313123123112312312313",
        playNum: 100,
      },
      {
        url: "http://p2.music.126.net/a4RUDBj-LDKN7WMClV65OQ==/109951164735432462.jpg?param=140y140",
        describe: "简短介绍1231231231231",
        playNum: 100,
      },
      {
        id: 2,
        url: "http://p2.music.126.net/a4RUDBj-LDKN7WMClV65OQ==/109951164735432462.jpg?param=140y140",
        describe: "简短介绍",
        playNum: 100,
      },
      {
        id: 2,
        url: "http://p2.music.126.net/a4RUDBj-LDKN7WMClV65OQ==/109951164735432462.jpg?param=140y140",
        describe: "简短介绍",
        playNum: 100,
      },
      {
        id: 2,
        url: "http://p2.music.126.net/a4RUDBj-LDKN7WMClV65OQ==/109951164735432462.jpg?param=140y140",
        describe: "简短介绍132132123132123123323",
        playNum: 100,
      },
      {
        id: 1,
        url: "http://p2.music.126.net/LsRKVImeGXGnRYpSQ4FgXg==/109951167146831219.jpg?param=140y140",
        describe: "简短介绍",
        playNum: 100,
      },
      {
        id: 1,
        url: "http://p2.music.126.net/LsRKVImeGXGnRYpSQ4FgXg==/109951167146831219.jpg?param=140y140",
        describe: "简短介绍",
        playNum: 100,
      },
      {
        id: 1,
        url: "http://p2.music.126.net/LsRKVImeGXGnRYpSQ4FgXg==/109951167146831219.jpg?param=140y140",
        describe: "简短介绍",
        playNum: 100,
      },
      {
        id: 1,
        url: "http://p2.music.126.net/LsRKVImeGXGnRYpSQ4FgXg==/109951167146831219.jpg?param=140y140",
        describe: "简短介绍",
        playNum: 100,
      },
      {
        id: 1,
        url: "http://p2.music.126.net/LsRKVImeGXGnRYpSQ4FgXg==/109951167146831219.jpg?param=140y140",
        describe: "简短介绍",
        playNum: 100,
      },
      {
        id: 1,
        url: "http://p2.music.126.net/LsRKVImeGXGnRYpSQ4FgXg==/109951167146831219.jpg?param=140y140",
        describe: "简短介绍",
        playNum: 100,
      },
      {
        id: 1,
        url: "http://p2.music.126.net/LsRKVImeGXGnRYpSQ4FgXg==/109951167146831219.jpg?param=140y140",
        describe: "简短介绍",
        playNum: 100,
      },
      {
        id: 1,
        url: "http://p2.music.126.net/LsRKVImeGXGnRYpSQ4FgXg==/109951167146831219.jpg?param=140y140",
        describe: "简短介绍",
        playNum: 100,
      },
      {
        id: 1,
        url: "http://p2.music.126.net/LsRKVImeGXGnRYpSQ4FgXg==/109951167146831219.jpg?param=140y140",
        describe: "简短介绍",
        playNum: 100,
      },
      {
        id: 1,
        url: "http://p2.music.126.net/LsRKVImeGXGnRYpSQ4FgXg==/109951167146831219.jpg?param=140y140",
        describe: "简短介绍",
        playNum: 100,
      },
      {
        id: 1,
        url: "http://p2.music.126.net/LsRKVImeGXGnRYpSQ4FgXg==/109951167146831219.jpg?param=140y140",
        describe: "简短介绍",
        playNum: 100,
      },
      {
        id: 1,
        url: "http://p2.music.126.net/LsRKVImeGXGnRYpSQ4FgXg==/109951167146831219.jpg?param=140y140",
        describe: "简短介绍",
        playNum: 100,
      },
      {
        id: 1,
        url: "http://p2.music.126.net/LsRKVImeGXGnRYpSQ4FgXg==/109951167146831219.jpg?param=140y140",
        describe: "简短介绍",
        playNum: 100,
      },
      {
        id: 1,
        url: "http://p2.music.126.net/LsRKVImeGXGnRYpSQ4FgXg==/109951167146831219.jpg?param=140y140",
        describe: "简短介绍",
        playNum: 100,
      },
      {
        id: 1,
        url: "http://p2.music.126.net/LsRKVImeGXGnRYpSQ4FgXg==/109951167146831219.jpg?param=140y140",
        describe: "简短介绍",
        playNum: 100,
      },
      {
        id: 1,
        url: "http://p2.music.126.net/LsRKVImeGXGnRYpSQ4FgXg==/109951167146831219.jpg?param=140y140",
        describe: "简短介绍",
        playNum: 100,
      },
      {
        id: 1,
        url: "http://p2.music.126.net/LsRKVImeGXGnRYpSQ4FgXg==/109951167146831219.jpg?param=140y140",
        describe: "简短介绍",
        playNum: 100,
      },
    ],
    songSheet3: [
      {
        id: 1,
        url: "http://p2.music.126.net/LsRKVImeGXGnRYpSQ4FgXg==/109951167146831219.jpg?param=140y140",
        describe: "3",
        playNum: 100,
      },
      {
        id: 1,
        url: "http://p2.music.126.net/LsRKVImeGXGnRYpSQ4FgXg==/109951167146831219.jpg?param=140y140",
        describe: "简短介绍",
        playNum: 100,
      },
      {
        id: 1,
        url: "http://p2.music.126.net/LsRKVImeGXGnRYpSQ4FgXg==/109951167146831219.jpg?param=140y140",
        describe: "简短介绍",
        playNum: 100,
      },
      {
        id: 1,
        url: "http://p2.music.126.net/LsRKVImeGXGnRYpSQ4FgXg==/109951167146831219.jpg?param=140y140",
        describe: "简短介绍1313123123112312312313",
        playNum: 100,
      },
      {
        url: "http://p2.music.126.net/a4RUDBj-LDKN7WMClV65OQ==/109951164735432462.jpg?param=140y140",
        describe: "简短介绍1231231231231",
        playNum: 100,
      },
      {
        id: 2,
        url: "http://p2.music.126.net/a4RUDBj-LDKN7WMClV65OQ==/109951164735432462.jpg?param=140y140",
        describe: "简短介绍",
        playNum: 100,
      },
      {
        id: 2,
        url: "http://p2.music.126.net/a4RUDBj-LDKN7WMClV65OQ==/109951164735432462.jpg?param=140y140",
        describe: "简短介绍",
        playNum: 100,
      },
      {
        id: 2,
        url: "http://p2.music.126.net/a4RUDBj-LDKN7WMClV65OQ==/109951164735432462.jpg?param=140y140",
        describe: "简短介绍132132123132123123323",
        playNum: 100,
      },
      {
        id: 1,
        url: "http://p2.music.126.net/LsRKVImeGXGnRYpSQ4FgXg==/109951167146831219.jpg?param=140y140",
        describe: "简短介绍",
        playNum: 100,
      },
      {
        id: 1,
        url: "http://p2.music.126.net/LsRKVImeGXGnRYpSQ4FgXg==/109951167146831219.jpg?param=140y140",
        describe: "简短介绍",
        playNum: 100,
      },
      {
        id: 1,
        url: "http://p2.music.126.net/LsRKVImeGXGnRYpSQ4FgXg==/109951167146831219.jpg?param=140y140",
        describe: "简短介绍",
        playNum: 100,
      },
      {
        id: 1,
        url: "http://p2.music.126.net/LsRKVImeGXGnRYpSQ4FgXg==/109951167146831219.jpg?param=140y140",
        describe: "简短介绍",
        playNum: 100,
      },
      {
        id: 1,
        url: "http://p2.music.126.net/LsRKVImeGXGnRYpSQ4FgXg==/109951167146831219.jpg?param=140y140",
        describe: "简短介绍",
        playNum: 100,
      },
      {
        id: 1,
        url: "http://p2.music.126.net/LsRKVImeGXGnRYpSQ4FgXg==/109951167146831219.jpg?param=140y140",
        describe: "简短介绍",
        playNum: 100,
      },
      {
        id: 1,
        url: "http://p2.music.126.net/LsRKVImeGXGnRYpSQ4FgXg==/109951167146831219.jpg?param=140y140",
        describe: "简短介绍",
        playNum: 100,
      },
      {
        id: 1,
        url: "http://p2.music.126.net/LsRKVImeGXGnRYpSQ4FgXg==/109951167146831219.jpg?param=140y140",
        describe: "简短介绍",
        playNum: 100,
      },
      {
        id: 1,
        url: "http://p2.music.126.net/LsRKVImeGXGnRYpSQ4FgXg==/109951167146831219.jpg?param=140y140",
        describe: "简短介绍",
        playNum: 100,
      },
      {
        id: 1,
        url: "http://p2.music.126.net/LsRKVImeGXGnRYpSQ4FgXg==/109951167146831219.jpg?param=140y140",
        describe: "简短介绍",
        playNum: 100,
      },
      {
        id: 1,
        url: "http://p2.music.126.net/LsRKVImeGXGnRYpSQ4FgXg==/109951167146831219.jpg?param=140y140",
        describe: "简短介绍",
        playNum: 100,
      },
      {
        id: 1,
        url: "http://p2.music.126.net/LsRKVImeGXGnRYpSQ4FgXg==/109951167146831219.jpg?param=140y140",
        describe: "简短介绍",
        playNum: 100,
      },
      {
        id: 1,
        url: "http://p2.music.126.net/LsRKVImeGXGnRYpSQ4FgXg==/109951167146831219.jpg?param=140y140",
        describe: "简短介绍",
        playNum: 100,
      },
      {
        id: 1,
        url: "http://p2.music.126.net/LsRKVImeGXGnRYpSQ4FgXg==/109951167146831219.jpg?param=140y140",
        describe: "简短介绍",
        playNum: 100,
      },
      {
        id: 1,
        url: "http://p2.music.126.net/LsRKVImeGXGnRYpSQ4FgXg==/109951167146831219.jpg?param=140y140",
        describe: "简短介绍",
        playNum: 100,
      },
      {
        id: 1,
        url: "http://p2.music.126.net/LsRKVImeGXGnRYpSQ4FgXg==/109951167146831219.jpg?param=140y140",
        describe: "简短介绍",
        playNum: 100,
      },
      {
        id: 1,
        url: "http://p2.music.126.net/LsRKVImeGXGnRYpSQ4FgXg==/109951167146831219.jpg?param=140y140",
        describe: "简短介绍",
        playNum: 100,
      },
    ],
    pageInfo: {
      pageSize: 35,
      pageNum: 1,
    },
    page: {
      total: 0,
    }
  }),
  methods: {
    handleCurrentChange(val)  {
      this.pageInfo.pageNum = val;
      this.pageInfo.pageSize = 35;
      axios({
        method: "POST",
        url: "/song/listAll",
        data: this.pageInfo,
      }).then(res =>{
        this.songSheet = res.data.sheet;
        this.page.total = res.data.num;
        console.log(res);
      })
    },
  },
  mounted() {
     axios({
        method: "POST",
        url: "/song/listAll",
        data: this.pageInfo,
      }).then(res =>{
        this.songSheet = res.data.sheet;
        this.page.total = res.data.num;
        console.log(res);
      })
  }
});
</script>

<style scoped>
.main {
  width: 70%;
  margin-left: 15%;
  background-color: white;
  border: 1px solid rgb(116, 115, 115);
  text-align: center;
}
.page {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
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
</style>