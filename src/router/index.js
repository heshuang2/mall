import Vue from "vue"
import vueRouter from "vue-router"

const Home = () => import("../views/home/Home");
const Category = () => import("../views/category/Category");
const Cart = () => import("../views/cart/Carts");
const Profile = () => import("../views/profile/Profile");
const Detail = () => import("../views/detail/Detail");
const Registered = () => import("../views/registered/Registered");
const AreaCode = () => import("../views/registered/childComps/AreaCode");

Vue.use(vueRouter)

const routes = [
  {
    path:　"",
    redirect: "./Home"
  },
  {
    path: "/Home",
    component: Home
  },
  {
    path: "/Category",
    component: Category
  },
  {
    path: "/Cart",
    component: Cart
  },
  {
    path: "/profile",
    component: Profile
  },
  {
    path: "/detail/:iid",
    component: Detail
  },
  {
    path: "/registered",
    component: Registered
  },
  {
    path: "/areaCode",
    component: AreaCode,
  }
]

const router = new vueRouter({
  routes,
  mode: "history"
})


export default router
