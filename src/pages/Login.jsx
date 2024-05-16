import React, { useState, useEffect } from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import Header from "../components/layout/Header";
import "../styles/Login.css";
import FormField from "../components/form/FormField";
import ErrorMessage from "../components/messages/ErrorMessage";
import SuccessMessage from "../components/messages/SuccessMessage";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const auth = getAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (auth.currentUser) {
      setUsername(auth.currentUser.displayName);
    }
  }, [auth.currentUser]);

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  const handleLogin = async () => {
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setUsername(auth.currentUser.displayName);
      setSuccessMessage("Connexion réussie, redirection en cours...");
      setTimeout(() => navigate("/"), 2000);
    } catch (error) {
      if (error.code === "auth/user-not-found") {
        setError("L'adresse email n'est pas utilisée.");
      } else if (error.code === "auth/wrong-password") {
        setError("Le mot de passe est incorrect.");
      } else {
        setError("Une erreur est survenue lors de la connexion.");
      }
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <Header username={username} />
      <div className="login-page_content">
        <h2 className="login-page_h2">Connexion</h2>
        <SuccessMessage message={successMessage} />
        <ErrorMessage message={error} />
        <FormField type="email" value={email} onChange={handleEmailChange} label="Email:" />
        <FormField
          type="password"
          value={password}
          onChange={handlePasswordChange}
          label="Mot de passe:"
        />
        <button className="login-page_button" onClick={handleLogin} disabled={loading}>
          Se connecter
        </button>
      </div>
    </div>
  );
};

export default Login;
