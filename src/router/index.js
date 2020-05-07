import Vue from 'vue'
import VueRouter from 'vue-router'
import Menu from '../views/Menu.vue'
import Date from '../views/Date.vue'
import Dishes from '../views/Dishes.vue'
import Dish from '../views/Dish.vue'
import EditDish from '../views/EditDish.vue'


Vue.use(VueRouter)

const routes = [{
  path: '/',
  component: Menu,
},
{
  path: "/date/:_id/",
  component: Date,
  name: "Date",
  children: [
    {
      path: "add",
      component: Dishes
    },
    {
      path: "add/:dishId",
      component: Dish
    },
    {
      path: "add/:dishId/edit",
      component: EditDish
    },
    {
      path: "edit/:dishId",
      component: EditDish
    }
  ]
},
{
  path: "/dishes",
  component: Dishes
},
{
  path: "/dishes/:dishId",
  component: Dish
},
{
  path: "/dishes/:dishId/edit",
  component: EditDish
}
]

const router = new VueRouter({
  mode: "history",
  routes,
})

export default router