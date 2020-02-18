import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/lists",
    name: "Lists",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Lists.vue")
  },
  {
    path: "/new-integration",
    name: "NewIntegration",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/NewIntegration.vue")
  }
];

const router = new VueRouter({
  mode: "history",
  routes
});

export default router;
