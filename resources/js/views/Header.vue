<template>
  <v-app-bar app>
    <v-app-bar-nav-icon @click="SET_DRAWER(!drawer)" />
    <v-spacer />
    <v-avatar class="mr-3">
      <img
        :src="authUser.avatar"
        alt="User Image"
      >
    </v-avatar> {{ authUser.first_name + " " + authUser.last_name }}
    <v-menu
      offset-y
      eager
    >
      <template #activator="{ on, attrs }">
        <v-btn
          icon
          v-bind="attrs"
          v-on="on"
        >
          <v-icon>mdi-dots-vertical</v-icon>
        </v-btn>
      </template>
      <v-card>
        <v-card-title>
          <img
            :src="authUser.avatar"
            alt="User Image"
            class="mx-auto"
          >
        </v-card-title>
        <v-card-text>{{ authUser.first_name + " " + authUser.last_name }} <br> {{ authUser.email }}</v-card-text>
        <v-card-actions>
          <v-btn
            color="info"
            :to="{ name: 'users.edit', params: { id: authUser.id } }"
          >
            Profile
          </v-btn>
          <LogoutButton />
        </v-card-actions>
      </v-card>
    </v-menu>
  </v-app-bar>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import LogoutButton from "~/components/Logout";
import { SET_DRAWER } from "~/store/mutation-types";

export default {
  components: {
    LogoutButton
  },
  computed: {
    ...mapState(["drawer"]),
    ...mapState("auth", { authUser: "user" })
  },
  methods: {
    ...mapMutations([SET_DRAWER]),
  }
};
</script>
