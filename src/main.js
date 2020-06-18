// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import App from "./Home";
import router from "./router";
import ElementUI from "element-ui";
import VueQrcodeReader from "vue-qrcode-reader";
import firebase from "firebase/app";

import "element-ui/lib/theme-chalk/index.css";
import "element-ui/lib/theme-chalk/display.css";

Vue.use(ElementUI);
Vue.use(VueQrcodeReader);

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: "#app",
  router,
  components: { App },
  template: "<App/>"
});
