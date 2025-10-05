// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { AuthCredential } from "firebase/auth/web-extension";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBk-DpsklIsij8a8K3Nm5j0YptsDqSm7_o",
  authDomain: "gcep-f7d05.firebaseapp.com",
  databaseURL: "https://gcep-f7d05-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "gcep-f7d05",
  storageBucket: "gcep-f7d05.firebasestorage.app",
  messagingSenderId: "887963071057",
  appId: "1:887963071057:web:3f533d9555c452c29a7e70",
  measurementId: "G-GEVJBELBQ1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialize a service like Firestore
const db = getFirestore(app);
export const auth = getAuth(app);

export async function registerUser(email: string, password: string, accountType: string) {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;

    const baseName = email.split("@")[0];
    const defaultPfp = "/assets/pfp.png";

    const userData: any = {
      email: user.email,
      name: baseName,
      username: baseName,
      pfp: defaultPfp,
      accountType: accountType,
      studentid: accountType === "student" ? baseName : "",
      createdAt: new Date(),
    };

    console.log("Firestore userData being written:", userData);

    await setDoc(doc(db, "users", user.uid), userData);

    return user;
  } catch (error) {
    console.error("Registration error:", error);
    throw error;
  }
}


export async function loginUser(email: string, password: string) {
  try {
    const res = await signInWithEmailAndPassword(auth, email, password);
    console.log("User logged in:", res.user);
    return res.user;
  } catch (error) {
    throw error;
  }
}

export async function logoutUser() {
  try {
    await signOut(auth);
    console.log("User signed out successfully");
    return true; // optional: return true on success
  } catch (error) {
    console.error("Error signing out:", error);
    return false; // optional: return false on error
  }
}

export { db };