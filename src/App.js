import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Pokedex from "./pages/Pokedex";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { UserPokemonProvider } from "./contexts/UserPokemonContext";

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <UserPokemonProvider>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/pokedex" element={<Pokedex />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
          </Routes>
        </UserPokemonProvider>
      </BrowserRouter>
    </div>
  );
};

export default App;
