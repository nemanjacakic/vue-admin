import Vue from "vue";

import App from "~/App.vue";

import router from "~/router/router";
import store from "~/store/store";

import vuetify from "~/plugins/Vuetify";

import "~/bootstrap";
import "~/components";

Vue.config.productionTip = false;

store.dispatch("auth/setUser").finally(() => {
  new Vue({
    router,
    store,
    vuetify,
    render: h => h(App)
  }).$mount("#app");
});
