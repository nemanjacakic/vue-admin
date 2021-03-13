import UserList from "~/views/users/UserList.vue";
import UserCreate from "~/views/users/UserCreate.vue";
import UserEdit from "~/views/users/UserEdit.vue";

import { userCan, isLoggedIn } from "~/helpers/auth";

export default [
  {
    name: "users.list",
    path: "users",
    component: UserList,
    beforeEnter: (to, from, next) => {
      if ( userCan("view users") ) {
        return next();
      }

      return next({ name: "404" });
    }
  },
  {
    name: "users.create",
    path: "users/create",
    component: UserCreate,
    beforeEnter: (to, from, next) => {
      if ( userCan("create users") ) {
        return next();
      }

      return next({ name: "404" });
    }
  },
  {
    name: "users.edit",
    path: "users/:id/profile",
    component: UserEdit,
    beforeEnter: (to, from, next) => {
      if ( userCan("edit users") || isLoggedIn(Number(to.params.id)) ) {
        return next();
      }

      return next({ name: "404" });
    }
  },
];
