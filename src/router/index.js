import { createRouter, createWebHashHistory } from 'vue-router'
import FindSong from '../views/FindSong.vue'
import Singer from '../views/FindSongDetail/Singer.vue'
import Recommend from '../views/FindSongDetail/Recommend.vue'
import  Sheet from '../views/FindSongDetail/Sheet.vue'

const routes = [
  {
    path: '/',
    name: 'FindSong',
    component: FindSong,
    children: [{
      path: '/singer',
      name: 'Singer',
      component: Singer,
    },
    {
      path: '/sheet',
      name: 'Sheet',
      component: Sheet,
    },
    {
      path: '/',
      name: 'Recommend',
      component: Recommend,
    }
    ]
  },
  {
    path: '/mySong',
    name: 'MySong',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/MySong.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
