import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { isAuthenticated } from "api/Authapi";
import UserProfile from "components/profile/UserProfile";

const UserProfilePage = () => {
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    if (!isAuthenticated()) {
      window.location.href = "/login";
    }
  }, []);
  return (
    <div className="flex flex-col min-h-screen">
        <UserProfile userId={id} />
    </div>
  );
};

export default UserProfilePage;
