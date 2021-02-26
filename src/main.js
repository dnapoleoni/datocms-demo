import Vue from "vue";
import router from './router'
import { DatocmsImagePlugin } from "vue-datocms";
import VueMeta from "vue-meta";
import App from "./App.vue";

Vue.use(DatocmsImagePlugin);
Vue.use(VueMeta);

Vue.config.productionTip = false;
Vue.config.devtools = true;

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");