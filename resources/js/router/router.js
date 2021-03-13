import Vue from "vue";
import VueRouter from "vue-router";

import Admin from "~/views/Admin";

import Dashboard from "~/views/Dashboard";
import Login from "~/views/auth/Login";
import PageNotFound from "~/views/PageNotFound";

import store from "~/store/store";

import users from "./users";

Vue.use(VueRouter);

const routes = [
  {
    name: "login",
    path: "/admin/login",
    component: Login,
    meta: { requiresGuest: true }
  },
  {
    path: "/admin",
    component: Admin,
    meta: { requiresUser: true },
    redirect: { name: "dashboard" },
    children: [
      {
        name: "dashboard",
        path: "dashboard",
        component: Dashboard
      },
      ...users,
    ]
  },
  {
    name: "404",
    path: "/404",
    alias: "*",
    component: PageNotFound,
    beforeEnter: () => {
      window.location = "/error";
    }
  }
];

const router = new VueRouter({
  mode: "history",
  routes,
  linkActiveClass: "active"
});

router.beforeEach((to, from, next) => {
  let requiresUser = to.matched.some(record => record.meta.requiresUser);
  let requiresGuest = to.matched.some(record => record.meta.requiresGuest);
  let userLoggedIn = store.getters["auth/isLoggedIn"];

  if ((requiresUser && userLoggedIn) || (requiresGuest && !userLoggedIn)) {
    next();
  } else if (requiresUser && !userLoggedIn) {
    next({
      name: "login"
    });
  } else if (requiresGuest && userLoggedIn) {
    next({
      name: "dashboard"
    });
  } else {
    return next();
  }
});

export default router;
