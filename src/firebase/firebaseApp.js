import { firebaseConfig } from "@/config";
import { initializeApp } from "firebase/app";

const firebaseApp = initializeApp(firebaseConfig);

export default firebaseApp
