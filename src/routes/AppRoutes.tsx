import UserLayout from "pages/layouts/UserLayout";
import UserEventListPage from "pages/user/UserEventListPage";
import UserProfilePage from "pages/user/UserProfilePage";
import UserSettingPage from "pages/user/UserSettingPage";
import React, { lazy } from "react";
import { Routes, Route } from "react-router-dom";

const LoginPage = lazy(() => import("pages/login/Login"));
const Home = lazy(() => import("pages/user/Home"));
const Contact = lazy(() => import("pages/user/Contact"));
const EventDetailPage = lazy(() => import("pages/user/EventDetail"));

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage/>} />
      <Route path="/" element={<UserLayout />}>
        <Route index element={<Home />} />
        <Route path="/events" element={<UserEventListPage/>} />
        <Route path="/events/:eventTypeId" element={<UserEventListPage/>} />
        <Route path="/event/:id" element={<EventDetailPage/>} />
        <Route path="/contact" element={<Contact/>} />
        <Route path="/profile/:id" element={<UserProfilePage/>} />
        <Route path="/setting" element={<UserSettingPage />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
