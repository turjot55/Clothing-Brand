import { useState } from "react";
import {
  createUserDocumentFromAuth,
  signInWithGooglePopup,
  signInWithGoogleRedirect,
  signInAuthUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithFacebookPopUp,
} from "../../utils/firebase/firebase.utils.ts";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import FormInput from "./../form-input/form-input.component";
import "./sign-in.form.styles.scss";
import Button from "./../button/button.component";
import { ReactComponent as GOOGLE } from "../../google.png";

const defaultFormFields = {
  email: "",
  password: "",
};

const SignInForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { email, password } = formFields;

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await signInAuthUserWithEmailAndPassword(
        email,
        password
      );
      console.log(response);
      resetFormFields();
    } catch (error) {
      switch (error.code) {
        case "auth/invalid-credential":
          toast.error("Invalid password or invalid emai");
          break;
        // case "auth/"

        default:
          console.log(error);
          break;
      }
      // if (error.code === "auth/invalid-credential") {
      //    toast.error("Invalid password or invalid email");
      //   alert("Invalid password or invalid email");
      // }
    }
  };

  const signIn = async () => {
    const { user } = await signInWithGooglePopup();
    await createUserDocumentFromAuth(user);
  };

  const signInFacebook = async () => {
    const { user } = await signInWithFacebookPopUp();
    await createUserDocumentFromAuth(user);
  };

  return (
    <div className="sign-up-container">
      <h2>Already have an account?</h2>
      <span>Sign in with your email and password</span>
      <form onSubmit={handleSubmit}>
        <FormInput
          label="Email"
          type="email"
          required
          onChange={handleChange}
          name="email"
          value={email}
        />

        <FormInput
          label="Password"
          type="password"
          required
          onChange={handleChange}
          name="password"
          value={password}
        />
        <div className="buttons-container">
          <Button type="submit">Sign In</Button>
          <Button type="button" buttonType="google" onClick={signIn}>
            Google
            {/* <GOOGLE /> */}
          </Button>
          <br />
          {/* <Button type="button" buttonType="facebook" onClick={signInFacebook}>
            facebook sign in
          </Button> */}
        </div>
      </form>
    </div>
  );
};

export default SignInForm;
