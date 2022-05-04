import { createRouter, createWebHashHistory } from 'vue-router'
import FindSong from '../views/FindSong.vue'
import Singer from '../views/FindSongDetail/Singer.vue'
import Recommend from '../views/FindSongDetail/Recommend.vue'
import Sheet from '../views/FindSongDetail/Sheet.vue'
import SongSheetDetail from '../views/SongSheetDetail/SongSheetDetail.vue'
import Register from "../views/Register.vue"
import SingerDetail from "../views/SingerDetail/SingerDetail.vue"
import BannerList from "../views/manager/BannerList.vue"
import CommentList from "../views/manager/CommentList.vue"
import SingerList from "../views/manager/SingerList.vue"
import SongList from "../views/manager/SongList.vue"
import SongSheetList from "../views/manager/SongSheetList.vue"
import UserList from "../views/manager/UserList.vue"
import Admin from "../views/Admin.vue"

const routes = [
  {
    path: '/',
    name: 'FindSong',
    component: FindSong,
    children: [{
      path: 'singer',
      name: 'Singer',
      component: Singer,
    },
    {
      path: 'sheet',
      name: 'Sheet',
      component: Sheet,
    },
    {
      path: '/',
      name: 'Recommend',
      component: Recommend,
    },
    {
      path: 'songSheetDetail/:listId',
      name: 'SongSheetDetail',
      props: true,
      component: SongSheetDetail
    },
    {
      path: 'singerDetail/:id',
      name: 'SingerDetail',
      props: true,
      component: SingerDetail
    }
    ]
  },
  {
    path: '/mySong',
    name: 'MySong',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/MySong.vue'),
  },
  {
    path: '/admin',
    name: 'Admin',
    component: Admin,
    children: [
      {
        path: '/admin/bannerList',
        name: 'BannerList',
        component: BannerList,
      },
      {
        path: '/admin/commentList',
        name: 'CommentList',
        component: CommentList,
      },
      {
        path: '/admin/singerList',
        name: 'SingerList',
        component: SingerList,
      },
      {
        path: '/admin/',
        name: 'SongList',
        component: SongList,
      },
      {
        path: '/admin/songSheetList',
        name: 'SongSheetList',
        component: SongSheetList,
      },
      {
        path: '/admin/userList',
        name: 'UserList',
        component: UserList,
      },
    ]
  },
  {
    path: '/register',
    name: 'Registert',
    component: Register,
  },

]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
