import store from "~/store/store";

export const userCan = (permission, user = store.getters["auth/user"]) => {
  return user.permissions.includes(permission);
};

export const isLoggedIn = ( id ) => {
  return id === store.getters["auth/user"].id;
};
