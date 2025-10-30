<template>
  <div
    class="min-h-screen bg-gray-900 flex flex-col items-center justify-center p-8"
  >
    <h1 class="text-4xl font-bold mb-12 text-white">Dashboard Lumière</h1>

    <div
      class="bg-gray-800 p-8 rounded-3xl shadow-xl flex flex-col items-center"
    >
      <!-- Bouton ON / OFF -->
      <button
        @click="toggleLight"
        :class="
          lightOn
            ? 'bg-green-500 hover:bg-green-600'
            : 'bg-red-500 hover:bg-red-600'
        "
        class="w-32 h-32 rounded-full text-2xl font-bold text-white flex items-center justify-center shadow-lg transition transform hover:scale-105 mb-6"
      >
        {{ lightOn ? "ON" : "OFF" }}
      </button>

      <!-- Sélecteur de couleur -->
      <label class="mb-2 font-medium text-white">Couleur :</label>
      <select
        @change="onSelectChange"
        v-model="lightColor"
        class="w-48 p-2 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
      >
        <option v-for="c in colors" :key="c" :value="c">{{ c }}</option>
      </select>

      <!-- Jauge de luminosité -->
      <label class="mb-2 font-medium text-white"
        >Luminosité : {{ brightness }}%</label
      >
      <input
        @change="onBrightnessChange"
        type="range"
        min="1"
        max="100"
        v-model="brightness"
        class="w-48 h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer mb-2"
      />

      <!-- Hue -->
      <label class="mb-2 font-medium text-white">Hue : {{ hue }}</label>
      <input
        @change="onHueSaturationChange"
        type="range"
        min="1"
        max="360"
        v-model="hue"
        class="w-48 h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer mb-4"
      />

      <!-- Saturation -->
      <label class="mb-2 font-medium text-white"
        >Saturation : {{ saturation }}%</label
      >
      <input
        @change="onHueSaturationChange"
        type="range"
        min="1"
        max="100"
        v-model="saturation"
        class="w-48 h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer mb-4"
      />

      <!-- Température -->
      <label class="mb-2 font-medium text-white"
        >Température : {{ colorTemp }}</label
      >
      <input
        @change="onTemperatureChange"
        type="range"
        min="2500"
        max="6500"
        v-model="colorTemp"
        class="w-48 h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer mb-4"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  getDeviceStatusAPI,
  setBrightnessAPI,
  setColorTemperatureAPI,
  setHueSaturationAPI,
  setLightColorAPI,
  turnOffLightAPI,
  turnOnLightAPI,
} from "@/service/API";
import { useApiStore } from "@/stores/APITokenStore";
import { ref } from "vue";

const lightOn = ref(false);
const lightColor = ref("CoolWhite");
const brightness = ref(100);
const hue = ref(0);
const saturation = ref(100);
const colorTemp = ref(2500);

const colors = [
  "CoolWhite",
  "Daylight",
  "Ivory",
  "WarmWhite",
  "Incandescent",
  "Candlelight",
  "Snow",
  "GhostWhite",
  "AliceBlue",
  "LightGoldenrod",
  "LemonChiffon",
  "AntiqueWhite",
  "Gold",
  "Peru",
  "Chocolate",
  "SandyBrown",
  "Coral",
  "Pumpkin",
  "Tomato",
  "Vermilion",
  "OrangeRed",
  "Pink",
  "Crimson",
  "DarkRed",
  "HotPink",
  "Smitten",
  "MediumPurple",
  "BlueViolet",
  "Indigo",
  "LightSkyBlue",
  "CornflowerBlue",
  "Ultramarine",
  "DeepSkyBlue",
  "Azure",
  "NavyBlue",
  "LightTurquoise",
  "Aquamarine",
  "Turquoise",
  "LightGreen",
  "Lime",
  "ForestGreen",
];

const onTemperatureChange = () => {
  setColorTemperatureAPI(colorTemp.value);
  // Appeler l'API pour régler la température si nécessaire
};

const onHueSaturationChange = () => {
  // Appeler l'API pour régler la teinte et la saturation si nécessaire
  setHueSaturationAPI(hue.value, saturation.value);
};

const onBrightnessChange = () => {
  setBrightnessAPI(brightness.value);
  // Appeler l'API pour régler la luminosité si nécessaire
};
const onSelectChange = () => {
  if (!lightOn.value) {
    lightOn.value = true;
  }
  saturation.value = 100;
  hue.value = 0;
  brightness.value = 100;
  colorTemp.value = 0;
  setLightColorAPI(lightColor.value);
};
const toggleLight = () => {
  lightOn.value = !lightOn.value;

  if (lightOn.value) {
    turnOnLightAPI();
  } else {
    turnOffLightAPI();
  }
};

const getDeviceInfos = async () => {
  const apiStore = useApiStore();
  if (!apiStore.token) {
    await apiStore.loginApi();
  }
  const allInfos = await getDeviceStatusAPI();
  lightOn.value = allInfos.device_on;
  // Récupérer l'état initial de la lumière et la couleur depuis l'API
  // Simuler avec des valeurs par défaut pour l'instant
  lightColor.value = "#ffffff";
  brightness.value = allInfos.default_states.state.brightness;
  hue.value = allInfos.default_states.state.hue;
  saturation.value = allInfos.default_states.state.saturation;
  colorTemp.value = allInfos.default_states.state.color_temp;
};
getDeviceInfos();
</script>
