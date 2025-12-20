import React from "react";
import "./App.css";
import Home from "./components/organisms/Home";
import Login from "./components/organisms/Login";
import Signup from "./components/organisms/Signup";
import { Route, Routes } from "react-router-dom";
import Wishlist from "./components/organisms/Wishlist";
import Cart from "./components/organisms/Cart";
import IndividualProduct from "./components/molecules/IndividualProduct";
import { Toaster } from "sonner";
import RequireAuth from "./components/molecules/RequireAuth";

function App() {


  return (
    <div className="App">
      
      <Toaster position="bottom-right" richColors closeButton />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/home" element={<RequireAuth><Home /></RequireAuth>} />
          <Route path="/product/:id" element={<RequireAuth><IndividualProduct/></RequireAuth>} />
        <>
          <Route path="/wishlist" element={<RequireAuth><Wishlist /></RequireAuth>} />
          <Route path="/cart" element={<RequireAuth><Cart /></RequireAuth>} />
        </>
        <Route path="*" element = {<h1>404</h1>} />
      </Routes>
      
      {/*  */}
    </div>
  );
}

export default App;
