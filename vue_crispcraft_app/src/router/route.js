import CheckOutView from "@/views/CheckOutView.vue";
import HomepageView from "@/views/HomepageView.vue";
import LoginView from "@/views/LoginView.vue";
import OrderItemView from "@/views/OrderItemView.vue";
import OrderTrackerView from "@/views/OrderTrackerView.vue";
import RegisterView from "@/views/RegisterView.vue";
import { useAuthStore } from "@/stores/auth";
import NotFoundView from "@/views/NotFoundView.vue";
import { createRouter, createWebHistory } from "vue-router";
import CreateProductView from "@/views/CreateProductView.vue";
import AdminStockView from "@/views/AdminStockView.vue";
import TransactionMonitoring from "@/views/TransactionMonitoring.vue";

const routes = [
  {
    path: "/login",
    name: "Login",
    component: LoginView,
  },
  {
    path: "/register",
    name: "register",
    component: RegisterView,
  },
  {
    path: "/",
    name: "homepage",
    component: HomepageView,
  },
  {
    path: "/order",
    name: "order",
    component: OrderItemView,
    meta: { requiresAuth: true, role: "customer" },
  },
  {
    path: "/checkout",
    name: "checkout",
    component: CheckOutView,
    meta: { requiresAuth: true, requiresActiveProduct: true, role: "customer" },
  },
  {
    path: "/track-order/:id",
    name: "order tracker",
    component: OrderTrackerView,
    meta: { requiresAuth: true, role: "customer" },
    props: true,
  },
  {
    path: "/admin/stock",
    name: "admin dashboard",
    component: AdminStockView,
    meta: { requiresAuth: false, role: "admin" },
  },
  {
    path: "/admin/create-product",
    name: "create product",
    component: CreateProductView,
    meta: { requiresAuth: false, role: "admin" },
  },
  {
    path: "/admin/transactions",
    name: "transactions",
    component: TransactionMonitoring,
    meta: { requiresAuth: false, role: "admin" },
  },
  {
    // path: "*",
    path: "/:catchAll(.*)*",
    name: "NotFound",
    component: NotFoundView,
    meta: {
      requiresAuth: false,
    },
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: routes,
});

router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore();

  console.log("Navigating to:", to.path);
  console.log("Meta.requiresAuth:", to.meta.requiresAuth);
  console.log("User authenticated:", authStore.authenticated);
  console.log("User role:", authStore.role);

  if (to.meta.requiresAuth) {
    if (!authStore.authenticated) {
      console.log("Checking session...");
      await authStore.checkSession();
    }

    if (authStore.authenticated) {
      if (to.meta.role && authStore.role !== to.meta.role) {
        console.log("Role mismatch. Redirecting to Login...");
        next({ name: "Login" });
      } else {
        console.log("Authentication and role valid. Proceeding...");
        next();
      }
    } else {
      console.log("Not authenticated. Redirecting to Login...");
      next({ name: "Login" });
    }
  } else {
    console.log("No authentication required. Proceeding...");
    next();
  }
});
export default router;
