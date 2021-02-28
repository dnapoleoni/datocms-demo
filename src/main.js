import Vue from "vue";
import router from './router'
import { DatocmsImagePlugin } from "vue-datocms";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import VueMeta from "vue-meta";
import App from "./App.vue";

library.add(faAngleLeft);

Vue.component("font-awesome-icon", FontAwesomeIcon);
Vue.use(DatocmsImagePlugin);
Vue.use(VueMeta);

Vue.config.productionTip = false;
Vue.config.devtools = true;

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");