<template>
  <v-main>
    <router-view
      v-show="!fullPageLoading"
      :key="$route.fullPath"
    />
    <loader v-if="fullPageLoading" />
  </v-main>
</template>

<script>
import { mapState } from "vuex";
import Loader from "~/components/Loader";
export default {
  components: {
    Loader
  },
  computed: {
    ...mapState(["fullPageLoading"])
  }
};
</script>
