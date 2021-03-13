<template>
  <v-alert
    v-if="!isEmpty(errors)"
    outlined
    type="error"
  >
    <div class="title">
      Error
    </div>
    <template v-for="(error, errorIndex) in errors">
      <div
        v-for="(message, messageIndex) in error"
        :key="errorIndex + messageIndex"
      >
        {{ message }}
      </div>
    </template>
  </v-alert>
</template>

<script>
export default {
  props: {
    errors: {
      type: Object,
      default() {
        return {};
      }
    },
  },
  methods: {
    isEmpty(object) {
      return Object.keys(object).length === 0;
    }
  }
};
</script>
<style lang="scss" scoped>
.title {
  line-height: 1;
  margin-bottom: 10px;
}
</style>
