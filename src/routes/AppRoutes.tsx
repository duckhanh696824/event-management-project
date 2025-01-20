import LoginPage from "pages/login/Login";
import Contact from "pages/user/Contact";
import Home from "pages/user/Home";
import React from "react";
import { Routes, Route } from "react-router-dom";


const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<LoginPage/>} />
      <Route path="/contact" element={<Contact/>} />
    </Routes>
  );
};

export default AppRoutes;
