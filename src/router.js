import Vue from 'vue'
import Router from 'vue-router'
// import Home from './views/home/Home.vue'
// import Users from './views/user/Users'
import Player from './views/music/player'
import newPlayer from './views/music/new-player'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('./views/home/index'),
      children: [{
        path: 'my',
        name: 'my-home',
        component: () => import('./views/home/myHome')
      }]
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('./views/user/login')
    },
    {
      path: '/music',
      name: 'music',
      component: Player
    },
    {
      path: '/new',
      name: 'new',
      component: newPlayer
    }
  ]
})
