import { useApiStore } from "@/stores/APITokenStore";
import axios from "axios";

const baseUrl = import.meta.env.VITE_BASE_URL;

export const turnOnLightAPI = async () => {
  try {
    console.log("Turning on light via API");

    const apiStore = useApiStore();
    const token = apiStore.token;
    console.log("Using token:", token);
    console.log("Using baseUrl:", `${baseUrl}/actions/l530/on?device=lumiere`);

    const { data } = await axios.get(
      `${baseUrl}/actions/l530/on?device=Lumière`,
      {
        headers: { Authorization: `Bearer ${apiStore.token}` },
      }
    );

    return data;
  } catch (error) {
    console.error("Error turning on light: ", error);
  }
};

export const turnOffLightAPI = async () => {
  try {
    const token = useApiStore().token;
    const { data } = await axios.get(
      `${baseUrl}/actions/l530/off?device=Lumière`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return data;
  } catch (error) {
    console.error("Error turning off light: ", error);
  }
};

export const setLightColorAPI = async (color: string) => {
  try {
    const token = useApiStore().token;
    const { data } = await axios.get(
      `${baseUrl}/actions/l530/set-color?device=Lumière&color=${color}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return data;
  } catch (error) {
    console.error("Error setting light color: ", error);
  }
};

export const getDeviceStatusAPI = async () => {
  try {
    const token = useApiStore().token;
    console.log("Getting device status with token:", token);
    const { data } = await axios.get(
      `${baseUrl}/actions/l530/get-device-info?device=Lumière`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return data;
  } catch (error) {
    console.error("Error getting device status: ", error);
  }
};

export const setBrightnessAPI = async (brightness: number) => {
  try {
    const token = useApiStore().token;
    const { data } = await axios.get(
      `${baseUrl}/actions/l530/set-brightness?device=Lumière&level=${brightness}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return data;
  } catch (error) {
    console.error("Error setting brightness: ", error);
  }
};

export const setHueSaturationAPI = async (hue: number, saturation: number) => {
  try {
    const token = useApiStore().token;
    const { data } = await axios.get(
      `${baseUrl}/actions/l530/set-hue-saturation?device=Lumière&hue=${hue}&saturation=${saturation}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return data;
  } catch (error) {
    console.error("Error setting hue and saturation: ", error);
  }
};

export const setColorTemperatureAPI = async (temperature: number) => {
  try {
    const token = useApiStore().token;
    const { data } = await axios.get(
      `${baseUrl}/actions/l530/set-color-temperature?device=Lumière&color_temperature=${temperature}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return data;
  } catch (error) {
    console.error("Error setting color temperature: ", error);
  }
};
