import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import Antd from "ant-design-vue";
import "ant-design-vue/dist/antd.css";
import MyLink from "@/components/MyLink.vue";
import BreadCrumb from "@/components/BreadCrumb.vue";
import { test, mytool } from "@/api/mytool.js";
import "@/main.less";

//require("./mock/m-index.js");

Vue.use(Antd);
Vue.component("MyLink", MyLink);
Vue.component("BreadCrumb", BreadCrumb);

// 全局引用方法
Vue.prototype.test = test;
Vue.prototype.mytool = mytool;

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
