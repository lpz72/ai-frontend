import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import HomeView from "../views/HomeView.vue";
import NlpPage from "@/pages/NlpPage.vue";
import WordPage from "@/pages/WordPage.vue";
import ImgPage from "@/pages/ImgPage.vue";
import HomePage from "@/pages/HomePage.vue";
import HistoryPage from "@/pages/HistoryPage.vue";
import UserLoginPage from "@/pages/UserLoginPage.vue";
import UserRegisterPage from "@/pages/UserRegisterPage.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "home",
    component: NlpPage,
  },
  {
    path: "/user/login",
    name: "login",
    component: UserLoginPage,
  },
  {
    path: "/user/register",
    name: "register",
    component: UserRegisterPage,
  },
  {
    path: "/nlp",
    name: "nlp",
    component: NlpPage,
  },
  {
    path: "/word",
    name: "word",
    component: WordPage,
  },
  {
    path: "/img",
    name: "img",
    component: ImgPage,
  },
  {
    path: "/list",
    name: "list",
    component: HistoryPage,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
