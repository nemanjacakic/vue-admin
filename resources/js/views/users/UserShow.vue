<template>
  <v-card :loading="loading">
    <v-card-text>
      <div class="text-center">
        <v-avatar
          size="100"
          class="mt-3"
        >
          <img :src="user.avatar">
        </v-avatar>
      </div>
      <p class="display-1 text--primary">
        {{ user.first_name }} {{ user.last_name }}
      </p>
      <p>{{ user.email }}</p>
      <p>{{ user.role.name }}</p>
      <p>{{ user.bio }}</p>
    </v-card-text>
  </v-card>
</template>

<script>
import { mapActions } from "vuex";

export default {
  props: {
    id: {
      type: Number,
      required: true
    },
  },
  data() {
    return {
      user: {},
      loading: false
    };
  },
  mounted() {
    this.loading = true;

    this.get(this.id)
      .then((data) => {
        this.user = data;

        this.loading = false;
      })
      .catch(() => this.loading = false);
  },
  methods: {
    ...mapActions("users", ["get"]),
  }
};
</script>
