import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Bell } from "lucide-react";
import { getUserInfo, isAuthenticated, logoutApi } from "api/Authapi";
import TopHeader from "./TopHeader";
import Hero from "./Hero";
import NotificationDropdown from "components/notification/NotificationDropdown";

const Header = () => {
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [activeTab, setActiveTab] = useState("/");

  useEffect(() => {
    setActiveTab(window.location.pathname);
  }, []);

  useEffect(() => {
    const userInfo = getUserInfo();
    if (isAuthenticated() && userInfo) {
      setIsLoggedIn(true);
      setUsername(userInfo.nickname || userInfo.username || "User");
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);
  const toggleDrawer = () => setIsDrawerOpen(!isDrawerOpen);

  const handleLogout = () => {
    logoutApi();
  };

  const handleNavigation = (path: string) => {
    setActiveTab(path);
    navigate(path);
  };

  return (
    <>
      <TopHeader setActiveTab={setActiveTab}/>
      <header className="w-full sticky top-0 left-0 right-0 z-40">
        <div className=" bg-white">
          <div className="pt-5 pb-4">
            <div className="container mx-auto flex justify-between items-center">
              <a onClick={() => handleNavigation("/")} className="flex items-center ml-7 cursor-pointer">
                <img
                  src="/assets/images/logo/itevent1.png"
                  alt="IT Event Logo"
                  className="h-10 w-auto object-contain"
                />
              </a>
              <nav>
                <ul className="flex space-x-8 uppercase font-bold text-gray-800 ml-7">
                  <li>
                    <span
                      className={`hover:text-indigo-700 cursor-pointer ${
                        activeTab === "/" ? "text-indigo-700" : ""
                      }`}
                      onClick={() => handleNavigation("/")}
                    >
                      TRANG CHỦ
                    </span>
                  </li>
                  <li>
                    <span
                      className={`hover:text-indigo-700 cursor-pointer ${
                        activeTab === "/events" ? "text-indigo-700" : ""
                      }`}
                      onClick={() => handleNavigation("/events")}
                    >
                      SỰ KIỆN
                    </span>
                  </li>
                  <li>
                    <span
                      className={`hover:text-indigo-700 cursor-pointer ${
                        activeTab === "/certificates" ? "text-indigo-700" : ""
                      }`}
                      onClick={() => handleNavigation("/certificates")}
                    >
                      GIẤY CHỨNG NHẬN
                    </span>
                  </li>
                  <li>
                    <span
                      className={`hover:text-indigo-700 cursor-pointer ${
                        activeTab === "/contact" ? "text-indigo-700" : ""
                      }`}
                      onClick={() => handleNavigation("/contact")}
                    >
                      LIÊN HỆ
                    </span>
                  </li>
                </ul>
              </nav>
              <div className="flex items-center space-x-6 mr-10 relative">
                {/* Chỉ hiển thị Bell khi đã đăng nhập */}
                {isLoggedIn && (
                  <div className="relative">
                    <NotificationDropdown />
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="w-full">
            <Hero />
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
