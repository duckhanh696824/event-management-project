import React, { useState, useEffect } from "react";
import {
  UserCircle,
  LogOut,
  User,
  ChevronDown,
  ChevronUp,
  Menu,
  Home,
  Calendar,
  MessageSquare,
  Bell,
} from "lucide-react";
import { getUserInfo, isAuthenticated, logoutApi } from "api/Authapi";
import TopHeader from "./TopHeader";
import Hero from "./Hero";

const Header = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [activeTab, setActiveTab] = useState("/"); // Mặc định chọn Trang chủ

  useEffect(() => {
    setActiveTab(window.location.pathname); // Cập nhật tab theo URL khi load trang
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

  return (
    <>
      <TopHeader />
      <header className="w-full sticky top-0 left-0 right-0 z-50">
        {/* Main Header */}
        <div className=" bg-white">
          <div className="pt-5 pb-4">
            <div className="container mx-auto flex justify-between items-center">
              {/* Logo */}
              <a href="/" className="flex items-center ml-7">
                <img
                  src="/assets/images/logo/itevent1.png"
                  alt="IT Event Logo"
                  className="h-10 w-auto object-contain"
                />
              </a>

              {/* Navigation */}
              <nav>
                <ul className="flex space-x-8 uppercase font-bold text-gray-800 ml-7">
                <li>
                      <a
                        href="/"
                        className={`hover:text-indigo-700 ${
                          activeTab === "/" ? "text-indigo-700" : ""
                        }`}
                        onClick={() => setActiveTab("/")}
                      >
                        TRANG CHỦ
                      </a>
                    </li>
                    <li>
                      <a
                        href="/events"
                        className={`hover:text-indigo-700 ${
                          activeTab === "/shop" ? "text-indigo-700" : ""
                        }`}
                        onClick={() => setActiveTab("/shop")}
                      >
                        SỰ KIỆN
                      </a>
                    </li>
                    <li>
                      <a
                        href="/certificates"
                        className={`hover:text-indigo-700 ${
                          activeTab === "/about" ? "text-indigo-700" : ""
                        }`}
                        onClick={() => setActiveTab("/about")}
                      >
                        GIẤY CHỨNG NHẬN
                      </a>
                    </li>
                    <li>
                      <a
                        href="/contact"
                        className={`hover:text-indigo-700 ${
                          activeTab === "/contact" ? "text-indigo-700" : ""
                        }`}
                        onClick={() => setActiveTab("/contact")}
                      >
                        LIÊN HỆ
                      </a>
                    </li>
                </ul>
              </nav>

              {/* Right Section (Cart & Notifications) */}
              <div className="flex items-center space-x-6 mr-10">
                {/* Notification Icon */}
                <div className="relative">
                  <Bell className="w-6 h-6 text-gray-700" />
                  <span className="absolute -top-2 -right-2 bg-indigo-600 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
                    3
                  </span>
                </div>
              </div>
            </div>
          </div>
        {/* Hero Section (Cố định trên trang) */}
        <div className="w-full">
          <Hero />
        </div>  
      </div>
    </header>
  </>
);
};

export default Header;
