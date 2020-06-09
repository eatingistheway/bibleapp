import Vue from "vue";
import VueTouch from "vue-touch";
import App from "./App.vue";
import { BootstrapVue, IconsPlugin } from "bootstrap-vue";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import axios from "axios";
import store from "./store";
Vue.config.productionTip = false;
Vue.use(BootstrapVue);
Vue.use(IconsPlugin);
Vue.prototype.$http = axios;
Vue.use(VueTouch);

new Vue({
  store: store,
  render: (h) => h(App),
}).$mount("#app");
