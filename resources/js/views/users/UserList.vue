<template>
  <v-container fluid>
    <v-row>
      <v-col>
        <v-data-table
          :headers="headers"
          :items="users"
          class="elevation-1"
          :loading="loading"
          loading-text="Loading... Please wait"
          :server-items-length="usersMeta.total"
          :options="queryParams"
          @update:options="updatePage"
        >
          <template #top>
            <v-toolbar flat>
              <v-toolbar-title>User List</v-toolbar-title>
              <v-divider
                class="mx-4"
                inset
                vertical
              />
              <v-spacer />
              <v-btn
                v-if="userCan('create users')"
                color="primary"
                dark
                class="mb-2"
                :to="{ name: 'users.create' }"
              >
                New User
              </v-btn>
            </v-toolbar>
          </template>

          <template #[`item.actions`]="{ item }">
            <v-icon
              v-if="userCan('view users')"
              small
              class="mr-2"
              @click="showUser(item.id)"
            >
              mdi-eye
            </v-icon>
            <v-icon
              v-if="userCan('edit users') || item.id === authUser.id"
              small
              class="mr-2"
              @click="editUser(item.id)"
            >
              mdi-pencil
            </v-icon>
            <v-icon
              v-if="userCan('delete users')"
              small
              @click="deleteUser(item.id)"
            >
              mdi-delete
            </v-icon>
          </template>
          <template #[`item.avatar`]="{ item }">
            <v-avatar>
              <img
                :src="item.avatar"
                :alt="'avatar of ' + item.first_name + ' ' + item.last_name"
              >
            </v-avatar>
          </template>
        </v-data-table>

        <v-dialog
          v-model="userShowDialog"
          max-width="400px"
        >
          <user-show
            :id="selectedUser"
            :key="selectedUser"
          />
        </v-dialog>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapState, mapMutations, mapActions } from "vuex";

import { FULL_PAGE_LOADING, LOADING } from "~/store/mutation-types";

import UserShow from "~/views/users/UserShow";

import router from "~/router/router";

import query from "~/mixins/query";
import auth from "~/mixins/auth";

export default {
  components: {
    UserShow
  },
  mixins: [
    query,
    auth
  ],
  data() {
    return {
      headers: [
        { text: "ID", value: "id" },
        { text: "Avatar", value: "avatar", sortable: false },
        { text: "First Name", value: "first_name" },
        { text: "Last Name", value: "last_name" },
        { text: "Role", value: "role.name", sortable: false },
        { text: "Email", value: "email" },
        { text: "Actions", value: "actions", sortable: false },
      ],
      loading: false,
      userShowDialog: false,
      selectedUser: null
    };
  },
  computed: {
    ...mapState("auth", { authUser: "user" }),
    ...mapState("users", ["users", "usersMeta"])
  },
  methods: {
    ...mapMutations([LOADING, FULL_PAGE_LOADING]),
    ...mapActions("users", ["getAll", "destroy"]),
    updatePage(options = {}) {
      let params = this.filterQueryParams(options);

      router.push({ path: null, query: params }).catch(() => {});

      this.loading = true;
      this.getAll(params)
        .then(() => {
          this.loading = false;
        })
        .catch(() => this.loading = false);
    },
    showUser(id) {
      this.selectedUser = id;
      this.userShowDialog = true;
    },
    editUser(id) {
      router.push({ name: "users.edit", params: { id } });
    },
    deleteUser(id) {
      this.$alertify.confirmWithTitle(
        "Are you sure ?",
        "This will delete selected user",
        () => {
          this.loading = true;
          this.destroy(id)
            .then(() => {
              this.updatePage(this.castQueryParams(this.$route.query));

              this.$alertify.success("User deleted");
            })
            .catch(error => {
              this.loading = false;

              this.$alertify.error(error.message);
            });
        },
        () => {}
      );
    }
  }
};
</script>
