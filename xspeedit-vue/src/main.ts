import Vue from "vue";
import "bulma/css/bulma.css";
import "@fortawesome/fontawesome-free/css/all.css";
import App from "./App.vue";

Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
}).$mount("#app");
