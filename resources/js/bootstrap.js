import Vue from "vue";

import VueAlertify from "./plugins/VueAlertify";

import "~/init/axios";

Vue.use(VueAlertify, {
  notifier: {
    // auto-dismiss wait time (in seconds)
    delay: 5,
    // default position
    position: "top-right",
    // adds a close button to notifier messages
    closeButton: false
  },
  theme: {
    ok: "btn btn-primary",
    cancel: "btn btn-danger",
    input: "form-control"
  }
});
