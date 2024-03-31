import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithRedirect,
  FacebookAuthProvider,
} from "firebase/auth";

import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";
// import { auth } from "./firebase.utils";

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

const googleProvider = new GoogleAuthProvider();
const facebookProvider = new FacebookAuthProvider();

googleProvider.setCustomParameters({
  prompt: "select_account",
});

// facebookProvider.setCustomParameters({
//   prompt: "select_account",
// });

facebookProvider.setCustomParameters({
  // prompt: "select_account",
  display: "popup",
});

export const auth = getAuth(firebaseApp);
export const signInWithGooglePopup = () =>
  signInWithPopup(auth, googleProvider);
// export const signInWithGoogleRedirect = () =>
//   signInWithRedirect(auth, googleProvider);
export const signInWithFacebookPopUp = () =>
  signInWithPopup(auth, facebookProvider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (
  userAuth,
  additionalInformation = {}
) => {
  if (!userAuth) return;

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
        ...additionalInformation,
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

export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  return await createUserWithEmailAndPassword(auth, email, password);
};

export const signInAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  return await signInWithEmailAndPassword(auth, email, password);
  // .then(
  //   (userCredential) => {
  //     // Signed in
  //     const user = userCredential.user;
  //     console.log(user);
  //     // ...
  //     console.log(signInAuthUserWithEmailAndPassword(), "hello");
  //   }
  // );
};
