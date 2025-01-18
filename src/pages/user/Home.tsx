import React, { useEffect } from "react";
import Header from "components/common/Header";
import Footer from "components/common/Footer";
import BannerUser from "components/common/BannerUser";
import { isAuthenticated } from "api/Authapi";

const Home = () => {
  useEffect(() => {
    if (!isAuthenticated()) {
      window.location.href = "/login";
    }
  }, []);
  return (
    <div className="flex flex-col min-h-screen">
      <Header></Header>
      <BannerUser />
      <Footer />
    </div>
  );
};

export default Home;
