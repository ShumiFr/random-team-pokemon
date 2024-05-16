import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Pokedex from "./pages/Pokedex";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { UserPokemonsProvider } from "./contexts/UserPokemonsContext";
import { UserProvider } from "./contexts/UserContext";

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <UserProvider>
          <UserPokemonsProvider>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/pokedex" element={<Pokedex />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
            </Routes>
          </UserPokemonsProvider>
        </UserProvider>
      </BrowserRouter>
    </div>
  );
};

export default App;
