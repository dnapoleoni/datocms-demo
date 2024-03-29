import Vue from "vue";
import router from './router'
import { DatocmsImagePlugin } from "vue-datocms";
import Vue2TouchEvents from "vue2-touch-events";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faAngleLeft, faAngleRight, faHome, faPhone, faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import VueMeta from "vue-meta";
import App from "./App.vue";

library.add(faAngleLeft);
library.add(faAngleRight);
library.add(faHome);
library.add(faPhone);
library.add(faEnvelope);

Vue.component("font-awesome-icon", FontAwesomeIcon);
Vue.use(DatocmsImagePlugin);
Vue.use(VueMeta);
Vue.use(Vue2TouchEvents)

Vue.config.productionTip = false;
Vue.config.devtools = true;

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");