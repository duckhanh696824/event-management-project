import React, { useEffect } from "react";
import Header from "components/common/Header";
import Footer from "components/common/Footer";
import { isAuthenticated } from "api/Authapi";
import EventDetail from "components/event/user/EventDetail";

const EventDetailPage = () => {
  useEffect(() => {
    if (!isAuthenticated()) {
      window.location.href = "/login";
    }
  }, []);
  return (
    <div className="flex flex-col min-h-screen">
      <EventDetail/>
    </div>
  );
};

export default EventDetailPage;
