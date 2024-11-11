import CheckOutView from "@/views/CheckOutView.vue";
import HomepageView from "@/views/HomepageView.vue";
import LoginView from "@/views/LoginView.vue";
import OrderItemView from "@/views/OrderItemView.vue";
import OrderTrackerView from "@/views/OrderTrackerView.vue";
import RegisterView from "@/views/RegisterView.vue";

import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "home",
    component: LoginView,
  },
  {
    path: "/register",
    name: "register",
    component: RegisterView,
  },
  {
    path: "/homepage",
    name: "homepage",
    component: HomepageView,
  },
  {
    path: "/order",
    name: "order",
    component: OrderItemView,
  },
  {
    path: "/checkout",
    name: "checkout",
    component: CheckOutView,
  },
  {
    path: "/trackorder",
    name: "order tracker",
    component: OrderTrackerView,
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: routes,
});

export default router;
