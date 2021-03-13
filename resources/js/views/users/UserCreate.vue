<template>
  <v-container fluid>
    <v-row>
      <v-col
        cols="12"
        md="8"
        offset-md="2"
      >
        <v-card>
          <v-card-title>Create User</v-card-title>
          <v-card-text>
            <v-form @submit.prevent="createUser">
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
                v-model="user.role"
                :items="roles"
                item-text="name"
                item-value="id"
                label="Role*"
                :error-messages="errors.role"
              />

              <v-text-field
                v-model="user.password"
                label="Password*"
                type="password"
                :error-messages="errors.password"
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
                Create
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

import { FULL_PAGE_LOADING, LOADING } from "~/store/mutation-types";

import router from "~/router/router";

export default {
  data() {
    return {
      user: {
        first_name: "",
        last_name: "",
        email: "",
        role: "",
        bio: "",
        password: ""
      },
      errors: {}
    };
  },
  computed: {
    ...mapState("roles", ["roles"])
  },
  mounted() {
    this.FULL_PAGE_LOADING(true);

    this.getRoles()
      .then(() =>  this.FULL_PAGE_LOADING(false))
      .catch(() => this.FULL_PAGE_LOADING(false));
  },
  methods: {
    ...mapMutations([LOADING, FULL_PAGE_LOADING]),
    ...mapActions("users", ["store"]),
    ...mapActions("roles", { getRoles: "getAll" }),
    createUser() {
      this.store(this.user)
        .then(() => {
          this.LOADING(false);

          this.$alertify.success("User created");

          router.push({ name: "users.list" });
        })
        .catch(data => {
          this.LOADING(false);

          this.errors = data.errors;
        });
    }
  }
};
</script>
