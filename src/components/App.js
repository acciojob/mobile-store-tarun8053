import React from "react";
import "./../styles/App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./home";
import Header from "./header";
import Admin from "./admin";
import Product from "./product";
import AdminProdcut from "./adminProduct";

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/products/:id" element={<Product />} />
        <Route path="/admin/products/:id" element={<AdminProdcut />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
