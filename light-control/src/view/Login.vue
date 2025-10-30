<template>
  <div class="flex items-center justify-center min-h-screen bg-gray-900">
    <form
      class="bg-gray-800 p-8 rounded-xl shadow-lg w-full max-w-md"
      @submit.prevent="login"
    >
      <h2 class="text-3xl font-bold mb-6 text-center text-white">Connexion</h2>

      <input
        v-model="email"
        type="email"
        placeholder="Email"
        class="mb-4 w-full p-3 rounded bg-gray-700 text-white placeholder-gray-400 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <input
        v-model="password"
        type="password"
        placeholder="Mot de passe"
        class="mb-6 w-full p-3 rounded bg-gray-700 text-white placeholder-gray-400 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <p>{{ errorMessage }}</p>

      <button
        type="submit"
        class="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition font-semibold"
      >
        Se connecter
      </button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { getUsersFromFirestore } from "@/model/firebaseCrud";
import { useAuthStore } from "@/stores/auth";
import { decrypteData } from "@/tools/encryption";
import { ref } from "vue";

const email = ref("");
const password = ref("");
const errorMessage = ref("");

const login = async () => {
  errorMessage.value = "";
  console.log("Email:", email.value);
  console.log("Mot de passe:", password.value);
  // Ici tu géreras le backend plus tard
  if (!email.value || !password.value) {
    errorMessage.value = "Tous les champs sont obligatoires.";
    return;
  }
  // Simuler une connexion réussie
  const usersWithMail = await getUsersFromFirestore(email.value);
  if (usersWithMail.length === 0) {
    errorMessage.value = "Aucun utilisateur trouvé avec cet email.";
    return;
  }

  const user = usersWithMail[0];
  console.log("Utilisateur trouvé :", user);
  console.log(
    "Mot de passe décrypté de la base de données :",
    user ? decrypteData(user.password) : "Utilisateur non défini"
  );
  console.log("mot de passe saisi :", password.value);

  if (decrypteData(user?.password) == password.value) {
    console.log("Connexion réussie pour l'utilisateur :", user);
    const auth = useAuthStore();
    auth.login(user!);
  } else {
    errorMessage.value = "Mot de passe incorrect.";
    return;
  }
};
</script>
