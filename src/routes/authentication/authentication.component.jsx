import SignUpForm from "./../../components/sign-up/sign-up.form.component";
import SignInForm from "./../../components/sign-in/sign-in.form.component";
import "./authentication.styles.scss";

const Authentication = () => {
  return (
    <div className="authentication-container">
      <SignInForm />
      <SignUpForm />
    </div>
  );
};

export default Authentication;

// import {
//   signInWithGooglePopup,
//   createUserDocumentFromAuth,
// } from "../../utils/firebase/firebase.utils";

// const Authentication = () => {
//   const logGoogleUser = async () => {
//     const { user } = await signInWithGooglePopup();
//     const userDocRef = await createUserDocumentFromAuth(user);
//   };
//   return (
//     <div>
//       <h1>Sign in Page</h1>
//       <button onClick={logGoogleUser}>Sign in with Google Popup</button>
//     </div>
//   );
// };

// export default Authentication;
