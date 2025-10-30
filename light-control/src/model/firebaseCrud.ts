import { db } from "@/firebase";
import { collection, addDoc, getDocs, query, where } from "firebase/firestore";
import type { User } from "./User";

export const addUserToFirestore = async (user: User) => {
  try {
    const docRef = await addDoc(collection(db, "users"), {
      pseudo: user.pseudo,
      email: user.email,
      password: user.password,
      role: user.role,
    });
    return docRef;
  } catch (error) {
    console.log("Error adding document: ", error);
  }
};

export const getUsersFromFirestore = async (email: string): Promise<User[]> => {
  try {
    const q = query(collection(db, "users"), where("email", "==", email));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((doc) => doc.data() as User);
  } catch (error) {
    console.error("Error getting users: ", error);
    return [];
  }
};
