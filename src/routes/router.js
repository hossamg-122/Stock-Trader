import Vue from "vue";
import VueRouter from "vue-router";
import SignUp from "../components/SignUp/SignUp.vue";
import SignIn from "../components/SignIn/SignIn.vue";
import Home from "../components/Home/Home.vue";
import Portofolio from "../components/Portofolio/Portofolio.vue";
import Stocks from "../components/Stocks/Stocks.vue";
import { store } from "../store/store";
import * as types from "../store/types";

const routes = [
  {
    path: "/home/:id",
    component: Home,
    name: "Home"
  },
  {
    path: "/portofolio/:id",
    component: Portofolio,
    name: "Portofolio"
  },
  {
    path: "/stocks/:id",
    component: Stocks,
    name: "Stocks"
  },

  {
    path: "/sign-up",
    component: SignUp,
    name: "SignUp"
  },
  {
    path: "/sign-in",
    component: SignIn,
    name: "SignIn"
  },
  { path: "*", redirect: { name: "SignIn" } }
];
Vue.use(VueRouter);
const router = new VueRouter({
  routes,
  mode: "history"
});
router.beforeEach((to, from, next) => {
  const { token } = store.getters[types.GET_USER_DATA];

  if (token) {
    next();
  } else {
    if (to.name === "SignIn" || to.name === "SignUp") {
      next();
    } else {
      next("/sign-in");
    }
  }
});
export default router;
