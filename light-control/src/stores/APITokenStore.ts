// src/stores/api.ts
import { defineStore } from "pinia";
import axios from "axios";
import { ref } from "vue";

export const useApiStore = defineStore("api", () => {
  const token = ref<string | null>(null);
  const loginApi = async () => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/login`,
        {
          password: import.meta.env.VITE_API_PASSWORD,
        }
      );
      token.value = response.data; // récupérer le token
    } catch (err) {
      console.error("Erreur login API :", err);
    }
  };

  return { token, loginApi };
});
