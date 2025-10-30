// router/index.ts
import {
  createRouter,
  createWebHistory,
  type NavigationGuardNext,
  type RouteLocationNormalized,
} from "vue-router";
import Dashboard from "@/view/Dashboard.vue";
import Login from "@/view/Login.vue";
import Register from "@/view/Register.vue";
import { useAuthStore } from "@/stores/auth";

const routes = [
  { path: "/", redirect: "/dashboard" },
  { path: "/login", component: Login },
  { path: "/register", component: Register },
  {
    path: "/dashboard",
    component: Dashboard,
    meta: { requiresAuth: true }, // indique que cette route nécessite une connexion
  },
  {
    path: "/logout",
    component: { template: "<div>Logging out...</div>" },
    beforeEnter: (
      _to: RouteLocationNormalized,
      _from: RouteLocationNormalized,
      next: NavigationGuardNext
    ) => {
      const auth = useAuthStore();
      auth.logout();
      next("/login");
    },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Route guard
router.beforeEach((to, from, next) => {
  const auth = useAuthStore();
  if (to.meta.requiresAuth && !auth.isAuthenticated) {
    next("/login"); // redirige vers la page login
  } else {
    next(); // autorise la navigation
  }
});

export default router;
