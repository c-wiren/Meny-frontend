import Vue from 'vue'
import VueRouter from 'vue-router'
import Menu from '../views/Menu.vue'
import Date from '../views/Date.vue'
import Dishes from '../views/Dishes.vue'
import Dish from '../views/Dish.vue'
import EditDish from '../views/EditDish.vue'
import NotFound from '../views/404.vue'


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
      component: Dishes,
      name: "DateDishes"
    },
    {
      path: "add/:dishId",
      component: Dish,
      name: "DateDish"
    },
    {
      path: "add/:dishId/edit",
      component: EditDish,
      name: "DateAddEditDish"
    },
    {
      path: "edit/:dishId",
      component: EditDish,
      name: "DateEditDish"
    }
  ]
},
{
  path: "/dishes",
  component: Dishes,
  name: "Dishes"
},
{
  path: "/dishes/:dishId",
  component: Dish,
  name: "Dish"
},
{
  path: "/dishes/:dishId/edit",
  component: EditDish,
  name: "EditDish"
},
{
  path: "/404",
  component: NotFound,
  name: "404"
},
{
  path: "*",
  redirect: "/404"
}
]

const router = new VueRouter({
  mode: "history",
  routes,
})

export default router