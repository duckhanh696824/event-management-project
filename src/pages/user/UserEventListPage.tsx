import React, { useEffect } from "react";
import { isAuthenticated } from "api/Authapi";
import EventList from "components/event/user/EventListUser";

const UserEventListPage = () => {

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <div className="container mx-auto mt-12 mb-10 text-center">
        <h3 className="text-3xl font-bold text-gray-800 mb-3">
          Danh sách sự kiện
        </h3>
        <div className="w-[70px] h-[5px] bg-indigo-700 rounded-full mx-auto mt-4"></div>   
      </div>
      <EventList/>
    </div>
  );
};

export default UserEventListPage;
