import Vue from "vue";
import VueRouter from "vue-router";
import Layout from "@/views/Layout.vue";
import Login from "@/views/LogIn.vue";
import ControlAdminer from "@/views/sub-pages/ControlAdminer.vue";
import ControlUser from "@/views/sub-pages/ControlUser.vue";
import EatestFlow from "@/views/sub-pages/EatestFlow.vue";
import Column from "@/views/sub-pages/Column.vue";
import UserHomepage from "@/views/sub-pages/UserHomepage.vue";
import UserHomeDetail from "@/views/sub-pages/UserHomeDetail.vue";
import LabelTopicSet from "@/views/sub-pages/LabelTopicSet.vue";
import Feedback from "@/views/sub-pages/Feedback.vue";
import Report from "@/views/sub-pages/Report.vue";
import Appeal from "@/views/sub-pages/Appeal.vue";
import Advertise from "@/views/sub-pages/Advertise.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Layout",
    component: Layout,
    children: [
      {
        path: "",
        redirect: "flow"
      },
      {
        path: "flow",
        component: EatestFlow
      },
      {
        path: "essay",
        component: Column
      },
      {
        path: "eatest-set",
        component: LabelTopicSet
      },
      {
        path: "examine",
        component: Feedback
      },
      {
        path: "tip-off",
        component: Report
      },
      {
        path: "appeal",
        component: Appeal
      },
      {
        path: "user",
        component: ControlUser
      },
      {
        path: "adminer",
        component: ControlAdminer
      },
      {
        path: "home",
        component: UserHomepage
      },
      {
        path: "detail",
        component: UserHomeDetail
      },
      {
        path: "advertise",
        component: Advertise
      }
    ]
  },
  {
    path: "/login",
    name: "LogIn",
    component: Login
  }
];

const router = new VueRouter({
  mode: "hash",
  base: process.env.BASE_URL,
  routes
});

export default router;
