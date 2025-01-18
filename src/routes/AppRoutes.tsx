import LoginPage from "pages/login/Login";
import Home from "pages/user/Home";
import React from "react";
import { Routes, Route } from "react-router-dom";


const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<LoginPage/>} />
    </Routes>
  );
};

export default AppRoutes;
