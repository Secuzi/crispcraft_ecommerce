import AdminView from "@/views/AdminView.vue";
import CheckOutView from "@/views/CheckOutView.vue";
import HomepageView from "@/views/HomepageView.vue";
import LoginView from "@/views/LoginView.vue";
import OrderItemView from "@/views/OrderItemView.vue";
import OrderTrackerView from "@/views/OrderTrackerView.vue";
import RegisterView from "@/views/RegisterView.vue";
import { useAuthStore } from "@/stores/auth";
import { createRouter, createWebHistory } from "vue-router";

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
    meta: { requiresAuth: true, role: "customer" },
  },
  {
    path: "/trackorder",
    name: "order tracker",
    component: OrderTrackerView,
    meta: { requiresAuth: true, role: "customer" },
  },
  {
    path: "/admin",
    name: "admin dashboard",
    component: AdminView,
    meta: { requiresAuth: true, role: "admin" },
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: routes,
});

router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore();

  // Ensure session is checked
  if (!authStore.authenticated) {
    await authStore.checkSession();
  }

  // Guard routes based on auth and role
  if (to.meta.requiresAuth) {
    if (authStore.authenticated) {
      if (to.meta.role && authStore.role !== to.meta.role) {
        next({ name: "Login" }); // Redirect if role doesn't match
      } else {
        next(); // Allow access
      }
    } else {
      next({ name: "Login" }); // Redirect to login if not authenticated
    }
  } else {
    next(); // Allow navigation if no auth required
  }
});
export default router;
