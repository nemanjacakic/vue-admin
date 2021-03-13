<template>
  <v-app>
    <v-container fill-height>
      <v-row>
        <v-col
          cols="12"
          md="4"
          offset-md="4"
        >
          <h1 class="text-center mb-3">
            Admin
          </h1>
          <v-card>
            <v-card-title>Sign in</v-card-title>
            <v-card-text>
              <v-form @submit.prevent="loginUser">
                <v-alert
                  v-if="error"
                  outlined
                  type="error"
                >
                  <div>
                    {{ error }}
                  </div>
                </v-alert>

                <v-text-field
                  v-model="email"
                  label="Email*"
                  type="email"
                />

                <v-text-field
                  v-model="password"
                  label="Password*"
                  type="password"
                />

                <v-checkbox
                  v-model="remember"
                  label="Remember me"
                  required
                />


                <v-btn
                  color="primary"
                  type="submit"
                >
                  Sign In
                </v-btn>
              </v-form>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  data() {
    return {
      email: "",
      password: "",
      remember: "",
      error: false
    };
  },
  computed: {
    ...mapState("auth", ["user"])
  },
  methods: {
    ...mapActions("auth", ["login"]),
    loginUser() {
      this.error = "";

      this.login({ email: this.email, password: this.password, remember: this.remember })
        .then(() =>
          this.$alertify.success(
            "Welcome " + this.user.first_name + " " + this.user.last_name
          )
        )
        .catch(() => {
          this.error = "Email or password is wrong";
        });
    }
  }
};
</script>
