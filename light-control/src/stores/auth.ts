import { defineStore } from "pinia";
import { ref, computed } from "vue";
import type { User } from "@/model/User";
import { useRouter, type Router } from "vue-router";

export const useAuthStore = defineStore("auth", () => {
  const user = ref<User | null>(null);
  const isAuthenticated = computed(() => user.value !== null);

  function login(userData: User, router?: Router) {
    user.value = userData;
    localStorage.setItem("user", JSON.stringify(userData));
    if (router) {
      router.push("/dashboard");
    }
  }

  function logout() {
    user.value = null;
    localStorage.removeItem("user");
  }

  function initAuth() {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      try {
        user.value = JSON.parse(savedUser);
        console.log("Session restaurée:", user.value);
      } catch (error) {
        console.error("Erreur lors de la restauration de la session:", error);
        localStorage.removeItem("user");
      }
    }
  }

  return {
    user,
    isAuthenticated,
    login,
    logout,
    initAuth,
  };
});
