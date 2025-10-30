<script setup lang="ts">
import { computed, onMounted } from "vue";
import { useApiStore } from "./stores/APITokenStore";
import { useAuthStore } from "./stores/auth";

const auth = useAuthStore();
const isConnected = computed(() => auth.isAuthenticated);

const apiStore = useApiStore();
apiStore.loginApi();

onMounted(() => {
  auth.initAuth();
});
</script>

<template>
  <div class="app min-h-screen bg-gray-900 text-white">
    <!-- Navbar -->
    <nav class="bg-gray-800 shadow-lg p-4 flex justify-between items-center">
      <h1 class="text-2xl font-bold">LightControl</h1>
      <div class="space-x-6">
        <RouterLink
          v-if="isConnected"
          to="/"
          class="px-4 py-2 rounded-lg hover:bg-blue-600 transition"
        >
          Accueil</RouterLink
        >

        <RouterLink
          v-if="!isConnected"
          to="/register"
          class="px-4 py-2 rounded-lg hover:bg-blue-600 transition"
        >
          Créer un compte
        </RouterLink>
        <RouterLink
          v-if="!isConnected"
          to="/login"
          class="px-4 py-2 rounded-lg hover:bg-blue-600 transition"
        >
          Se connecter
        </RouterLink>
        <RouterLink
          v-if="isConnected"
          to="/logout"
          class="px-4 py-2 rounded-lg hover:bg-red-700 transition"
        >
          Se déconnecter
        </RouterLink>
      </div>
    </nav>

    <!-- Main content -->
    <main class="p-8">
      <RouterView />
    </main>
  </div>
</template>
