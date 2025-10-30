import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { VueFire } from "vuefire";

const firebaseApp = initializeApp({
  apiKey: "AIzaSyAw3J3gfyg6Uyup6w_fdxbsV-29YbBr5LM",
  authDomain: "light-control-9deeb.firebaseapp.com",
  projectId: "light-control-9deeb",
  storageBucket: "light-control-9deeb.firebasestorage.app",
  messagingSenderId: "949159346683",
  appId: "1:949159346683:web:2513f1205a24a833230b5e",
  measurementId: "G-PQFDP59NX6",
});
export const db = getFirestore(firebaseApp);
export default VueFire;
