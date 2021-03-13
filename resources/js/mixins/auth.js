import { userCan } from "~/helpers/auth";

export default {
  methods: {
    userCan(permission, user) {
      return userCan(permission, user);
    }
  }
};
