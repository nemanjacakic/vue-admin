<template>
  <v-container fluid>
    <v-row>
      <v-col
        cols="12"
        md="8"
        offset-md="2"
      >
        <v-card>
          <v-card-title>Edit {{ user.id === authUser.id ? 'Profile' : 'User' }} </v-card-title>
          <v-card-text>
            <v-form @submit.prevent="updateUser">
              <v-text-field
                v-model="user.first_name"
                label="First Name*"
                :error-messages="errors.first_name"
              />

              <v-text-field
                v-model="user.last_name"
                label="Last Name*"
                :error-messages="errors.last_name"
              />

              <v-text-field
                v-model="user.email"
                label="Email*"
                type="email"
                :error-messages="errors.email"
              />

              <v-select
                v-if="userCan('edit users')"
                v-model="user.role"
                :items="roles"
                item-text="name"
                item-value="id"
                label="Role"
              />

              <v-text-field
                v-model="user.old_password"
                label="Old Password"
                type="password"
                :error-messages="errors.old_password"
              />

              <v-text-field
                v-model="user.new_password"
                label="New Password"
                type="password"
                :error-messages="errors.new_password"
              />

              <v-text-field
                v-model="user.new_password_confirmation"
                label="New Password Confirmation"
                type="password"
                :error-messages="errors.new_password_confirmation"
              />

              <v-textarea
                v-model="user.bio"
                label="Bio"
                :error-messages="errors.bio"
              />

              <v-btn
                color="primary"
                type="submit"
              >
                Update
              </v-btn>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapState, mapMutations, mapActions } from "vuex";

import { FULL_PAGE_LOADING, LOADING, SET_USER } from "~/store/mutation-types";

import auth from "~/mixins/auth";

export default {
  mixins: [
    auth
  ],
  data() {
    return {
      user: {
        id: "",
        first_name: "",
        last_name: "",
        role: "",
        email: "",
        old_password: "",
        new_password: "",
        new_password_confirmation: "",
        bio: "",
      },
      errors: {}
    };
  },
  computed: {
    ...mapState("roles", ["roles"]),
    ...mapState("auth", { authUser: "user" })
  },
  mounted() {
    this.FULL_PAGE_LOADING(true);

    Promise.all([
      this.get(this.$route.params.id),
      this.getRoles()
    ])
      .then(([data]) => {
        this.user = data;
        this.user.role = data.role.id;

        this.FULL_PAGE_LOADING(false);
      })
      .catch(() => this.FULL_PAGE_LOADING(false));
  },
  methods: {
    ...mapMutations([LOADING, FULL_PAGE_LOADING]),
    ...mapMutations("auth", [SET_USER]),
    ...mapActions("users", ["get", "update"]),
    ...mapActions("roles", { getRoles: "getAll" }),
    updateUser() {
      this.LOADING(true);

      this.update(this.user)
        .then((user) => {
          this.errors = {};

          if ( this.user.id === this.authUser.id ) {
            this.SET_USER(user);
          }

          this.LOADING(false);

          this.$alertify.success("User updated");
        })
        .catch(data => {
          this.LOADING(false);

          this.errors = data.errors;
        });
    }
  }
};
</script>
