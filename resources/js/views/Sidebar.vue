<template>
  <v-card
    tile
    flat
  >
    <v-navigation-drawer
      :value="drawer"
      dark
      app
      @input="SET_DRAWER($event)"
    >
      <v-list>
        <v-list-item>
          <v-list-item-avatar>
            <v-img
              src="/images/AdminLogo.png"
              alt="Admin Logo"
            />
          </v-list-item-avatar>
          <v-list-item-title>
            Admin
          </v-list-item-title>
        </v-list-item>
      </v-list>
      <v-divider />
      <v-list>
        <v-list-item
          exact-path
          :to="{ name: 'users.edit', params: { id: authUser.id } }"
        >
          <v-list-item-avatar>
            <v-img
              :src="authUser.avatar"
              alt="User Image"
            />
          </v-list-item-avatar>
          <v-list-item-title>
            {{ authUser.first_name + " " + authUser.last_name }}
          </v-list-item-title>
        </v-list-item>
      </v-list>

      <v-divider />

      <v-list>
        <v-list-item-group color="primary">
          <v-list-item
            exact-path
            :to="{ name: 'dashboard' }"
          >
            <v-list-item-icon>
              <v-icon v-text="'mdi-tablet-dashboard'" />
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>
                Dashboard
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item
            v-if="userCan('view users')"
            exact-path
            :to="{ name: 'users.list' }"
          >
            <v-list-item-icon>
              <v-icon v-text="'mdi-account-group'" />
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>
                Users
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
  </v-card>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import { SET_DRAWER } from "~/store/mutation-types";

import auth from "~/mixins/auth";

export default {
  mixins: [
    auth
  ],
  computed: {
    ...mapState(["drawer"]),
    ...mapState("auth", { authUser: "user" })
  },
  methods: {
    ...mapMutations([SET_DRAWER])
  }
};
</script>
