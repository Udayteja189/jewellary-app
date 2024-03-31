import React from "react";
import "./App.css";
import Login from "../src/components/Login";
import Home from "./components/Home";
import Signup from "./components/Signup";
import { Route, Routes } from "react-router-dom";
import Wishlist from "./components/Wishlist";
import Cart from "./components/Cart";
import IndividualProduct from "./components/molecules/IndividualProduct";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="product/:id" element={<IndividualProduct/>} />
        <Route path="wishlist" element={<Wishlist />} />
        <Route path="cart" element={<Cart />} />
        <Route path="*" element = {<h1>404</h1>} />
      </Routes>
    </div>
  );
}

export default App;
