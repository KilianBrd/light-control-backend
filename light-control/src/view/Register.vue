<template>
  <div class="flex items-center justify-center min-h-screen bg-gray-900">
    <form
      class="bg-gray-800 p-8 rounded-xl shadow-lg w-full max-w-md"
      @submit.prevent="register"
    >
      <h2 class="text-3xl font-bold mb-6 text-center text-white">
        Inscription
      </h2>

      <input
        v-model="username"
        type="text"
        placeholder="Pseudo"
        class="mb-4 w-full p-3 rounded bg-gray-700 text-white placeholder-gray-400 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

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
        class="mb-4 w-full p-3 rounded bg-gray-700 text-white placeholder-gray-400 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <input
        v-model="confirmPassword"
        type="password"
        placeholder="Confirmer mot de passe"
        class="mb-6 w-full p-3 rounded bg-gray-700 text-white placeholder-gray-400 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <p>{{ errorMessage }}</p>

      <button
        type="submit"
        class="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition font-semibold"
      >
        S'inscrire
      </button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { User } from "@/model/User";
import { addUserToFirestore } from "@/model/firebaseCrud.js";
import { encrypteData } from "@/tools/encryption";
import { useAuthStore } from "@/stores/auth";
import { useRouter } from "vue-router";

const username = ref("");
const email = ref("");
const password = ref("");
const confirmPassword = ref("");
const errorMessage = ref("");
const router = useRouter();

const register = () => {
  errorMessage.value = "";
  // Ici tu géreras le backend plus tard
  if (password.value !== confirmPassword.value) {
    errorMessage.value = "Les mots de passe ne correspondent pas.";
    return;
  }
  const user = new User({
    pseudo: username.value,
    email: email.value,
    password: encrypteData(password.value),
    role: "user",
  });
  console.log("Utilisateur enregistré :", user);
  addUserToFirestore(user)
    .then(() => {
      console.log("Utilisateur ajouté à Firestore");
      useAuthStore().login(user, router);
    })
    .catch((error) => {
      console.error(
        "Erreur lors de l'ajout de l'utilisateur à Firestore :",
        error
      );
    });
};
</script>
