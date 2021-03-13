<template>
  <v-btn
    color="error"
    @click="logout"
  >
    Sign out
  </v-btn>
</template>

<script>
import { mapActions } from "vuex";

export default {
  methods: {
    ...mapActions("auth", ["logout"])
  }
};
</script>
