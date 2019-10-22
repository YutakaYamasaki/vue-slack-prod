import Vue from 'vue'
import VueRouter from 'vue-router'
import Chat from '../views/Chat.vue'
import Login from '../views/Login.vue'
import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'chat',
    component: Chat,
    beforeEnter: (to, from, next) => {
      if(!firebase.auth().currentUser){
        next('/login')
      }else{
        next()
      }
    }
  },
  {
    path: '/login',
    name: 'login',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: Login
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
