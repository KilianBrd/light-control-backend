import CryptoJS from "crypto-js";
const keyValue = "S3Crt452@Key"; // Remplacez par votre clé
const ivKey = "mqpIhjY68@@!kqp7"; // Doit faire exactement 16 caractères pour AES

export function encrypteData(data: string) {
  if (data) {
    const key = CryptoJS.PBKDF2(keyValue, "salt", {
      keySize: 256 / 32,
      iterations: 100,
    });
    const iv = CryptoJS.enc.Utf8.parse(ivKey);
    const encrypted = CryptoJS.AES.encrypt(data, key, {
      iv: iv,
      mode: CryptoJS.mode.CBC,
    });
    return encrypted.ciphertext.toString(CryptoJS.enc.Hex);
  }
  return "";
}

export function decrypteData(data: string | null | undefined): string {
  if (!data) {
    return "";
  }

  try {
    const key = CryptoJS.PBKDF2(keyValue, "salt", {
      keySize: 256 / 32,
      iterations: 100,
    });

    const iv = CryptoJS.enc.Utf8.parse(ivKey);

    const decrypted = CryptoJS.AES.decrypt(
      { ciphertext: CryptoJS.enc.Hex.parse(data) } as CryptoJS.lib.CipherParams,
      key,
      {
        iv: iv,
        mode: CryptoJS.mode.CBC,
      }
    );

    return decrypted.toString(CryptoJS.enc.Utf8);
  } catch (error) {
    console.error("Erreur lors du décryptage:", error);
    return "";
  }
}
