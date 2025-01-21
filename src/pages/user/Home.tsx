import React, { useEffect } from "react";
import Header from "components/common/Header";
import Footer from "components/common/Footer";
import BannerUser from "components/common/BannerUser";
import { isAuthenticated } from "api/Authapi";
import EventList from "components/event/user/EventListUser";

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
      <EventList/>
      <Footer />
    </div>
  );
};

export default Home;
