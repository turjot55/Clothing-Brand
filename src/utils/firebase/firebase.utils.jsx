import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";

import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAz0QQYxfzOEM-V715JCRLkhkq1bRAe5NY",
  authDomain: "clothing4-e9adb.firebaseapp.com",
  projectId: "clothing4-e9adb",
  storageBucket: "clothing4-e9adb.appspot.com",
  messagingSenderId: "397864042686",
  appId: "1:397864042686:web:fed33f3eae9f96bc1ddeef",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

// const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();
provider.setCustomParameters({
  promt: "select_account",
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth) => {
  const userDocRef = doc(db, "users", userAuth.uid);
  console.log(userDocRef);

  const userSnapshot = await getDoc(userDocRef);
  console.log(userSnapshot);
  console.log(userSnapshot.exists());

  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
      });
    } catch (error) {
      console.log("error creating the user", error.message);
    }
  }

  return userDocRef;

  // if user data exists
  // create/ set the document with the data from userAuth in my collection

  // if user data exists

  // return
};
