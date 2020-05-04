import Vue from 'vue'
import VueRouter from 'vue-router'
import Menu from '../views/Menu.vue'
import Date from '../views/Date.vue'
import Dishes from '../views/Dishes.vue'
import Dish from '../views/Dish.vue'


Vue.use(VueRouter)

const routes = [{
    path: '/',
    component: Menu,
  },
  {
    path: "/date/:_id/",
    component: Date,
  },
  {
    path: "/dishes",
    component: Dishes
  },
  {
    path: "/dishes/:_id",
    component: Dish
  }
]

const router = new VueRouter({
  mode: "history",
  routes,
})

export default router
