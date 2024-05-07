import React, { useState } from "react";
import { getAuth, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import Header from "../components/layout/Header";
import "../assets/Signup.css";
import "../data/firebase";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const auth = getAuth();
  const navigate = useNavigate();

  const handleUsernameChange = (e) => setUsername(e.target.value);
  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  const handleSignup = () => {
    setLoading(true);
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // L'inscription a réussi
        const user = userCredential.user;
        return updateProfile(user, { displayName: username });
      })
      .then(() => {
        setLoading(false);
        setSuccessMessage("Inscription réussie, redirection en cours...");
        setTimeout(() => navigate("/"), 2000);
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
        {successMessage && <div className="success-message">{successMessage}</div>}
        <div className="field">
          <label className="field_label">Pseudo:</label>
          <input
            className="field_input"
            type="text"
            value={username}
            onChange={handleUsernameChange}
          />
        </div>
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
        <button className="signup-page_button" onClick={handleSignup} disabled={loading}>
          S'inscrire
        </button>
      </div>
    </div>
  );
};

export default Signup;
