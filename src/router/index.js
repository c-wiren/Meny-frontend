import Vue from 'vue'
import VueRouter from 'vue-router'
import Menu from '../views/Menu.vue'
import Date from '../views/Date.vue'


Vue.use(VueRouter)

const routes = [{
    path: '/',
    component: Menu,
  },
  {
    path: "/date/:_id",
    component: Date
  }
]

const router = new VueRouter({
  mode: "history",
  routes,
})

export default router