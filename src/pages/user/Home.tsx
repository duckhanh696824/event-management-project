import React, { useEffect } from "react";
import BannerUser from "components/common/BannerUser";
import { isAuthenticated } from "api/Authapi";
import UserEventTypeList from "components/event-type/user/UserEventTypeList";
import EventList from "components/event/user/EventListUser";

const Home = () => {
  useEffect(() => {
    if (!isAuthenticated()) {
      window.location.href = "/login";
    }
  }, []);
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <BannerUser />
      <UserEventTypeList />
      <EventList />
    </div>
  );
};

export default Home;
