import LoginPage from "pages/login/Login";
import React from "react";
import { Routes, Route } from "react-router-dom";


const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage/>} />
    </Routes>
  );
};

export default AppRoutes;
