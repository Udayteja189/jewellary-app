import React from "react";
import "./App.css";
import Login from "./components/organisms/Login";
import Home from "./components/organisms/Home";
import Signup from "./components/organisms/Signup";
import { Route, Routes } from "react-router-dom";
import Wishlist from "./components/organisms/Wishlist";
import Cart from "./components/organisms/Cart";
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
