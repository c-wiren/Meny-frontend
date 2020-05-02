import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Date from '../views/Date.vue'


Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    children: [
      {
      path: 'date/:_id',
      component: Date
    }
    ]
  }
]

const router = new VueRouter({
    mode: "history",
  routes,
})

export default router
