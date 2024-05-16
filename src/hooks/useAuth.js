import { useState, useEffect } from "react";
import { getAuth } from "firebase/auth";

const useAuth = () => {
  const [username, setUsername] = useState("");
  const auth = getAuth();

  useEffect(() => {
    if (auth.currentUser) {
      setUsername(auth.currentUser.displayName);
      console.log("User is logged in");
    } else {
      console.log("User is not logged in");
    }
  }, [auth.currentUser]);

  return username;
};

export default useAuth;
