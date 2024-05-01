import React, { useState } from "react";
import {
  getAuth,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import "../data/firebase";
import "../assets/Signup.css";
import Header from "../components/Header";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const auth = getAuth();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleEmailSignup = () => {
    setLoading(true);
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        setLoading(false);
        // L'inscription a réussi
        const user = userCredential.user;
      })
      .catch((error) => {
        setLoading(false);
        // Une erreur s'est produite lors de l'inscription
        console.error(error);
      });
  };

  const handleGoogleSignup = () => {
    setLoading(true);
    const provider = new GoogleAuthProvider();

    signInWithPopup(auth, provider)
      .then((result) => {
        setLoading(false);
        // L'inscription a réussi
        const user = result.user;
      })
      .catch((error) => {
        setLoading(false);
        // Une erreur s'est produite lors de l'inscription
        console.error(error);
      });
  };

  return (
    <div className="signup-page">
      <Header />
      <div className="signup-page_content">
        <h2 className="signup-page_h2">Inscription</h2>
        <div className="field">
          <label className="field_label">Email:</label>
          <input className="field_input" type="email" value={email} onChange={handleEmailChange} />
        </div>
        <div className="field">
          <label className="field_label">Mot de passe:</label>
          <input
            className="field_input"
            type="password"
            value={password}
            onChange={handlePasswordChange}
          />
        </div>
        <button className="signup-page_button" onClick={handleEmailSignup} disabled={loading}>
          S'inscrire avec email et mot de passe
        </button>
        <div className="signup-page_separator"></div>
        <button className="signup-page_button" onClick={handleGoogleSignup} disabled={loading}>
          <img src={process.env.PUBLIC_URL + "/GoogleLogo.png"} alt="Google Logo" /> S'inscrire avec
          Google
        </button>
      </div>
    </div>
  );
};

export default Signup;
