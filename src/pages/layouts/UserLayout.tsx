import Footer from "components/common/Footer";
import Header from "components/common/Header";
import TopHeader from "components/common/TopHeader";
import React from "react";
import { Outlet } from "react-router-dom";
// import Header from "../components/Header";

const UserLayout = () => (
  <>
    <Header />
    <main>
      <Outlet />
    </main>
    <Footer />
  </>
);

export default UserLayout;
