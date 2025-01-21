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
} from "lucide-react";
import { getUserInfo, isAuthenticated, logoutApi } from "api/Authapi";

const Header = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");

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
    <header className="bg-gray-800 shadow-lg sticky top-0 z-50 py-4">
      <div className="container mx-auto px-4 flex justify-between items-center">
        {/* Logo Section */}
        <a href="/" className="flex items-center space-x-3">
          <img
            src="/assets/images/logo/itevent3.png"
            alt="IT Event Logo"
            className="h-9 w-auto object-contain"
          />
        </a>

        {/* Mobile Hamburger Menu */}
        <button className="lg:hidden text-white" onClick={toggleDrawer}>
          <Menu size={28} />
        </button>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex space-x-8 items-center">
          {[
            { label: "Trang chủ", href: "/", icon: <Home size={18} className="lg:hidden"/> },
            { label: "Sự kiện", href: "/events", icon: <Calendar size={18} className="lg:hidden"/> },
            { label: "Liên hệ", href: "/contact", icon: <MessageSquare size={18} className="lg:hidden"/> },
          ].map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="text-gray-200 hover:text-white transition-colors duration-300 font-medium text-lg flex items-center space-x-2"
            >
              {item.icon}
              <span>{item.label}</span>
            </a>
          ))}
        </nav>

        {/* Action Buttons */}
        <div className="hidden lg:flex items-center space-x-4">
          {!isLoggedIn ? (
            <>
              <a
                href="https://itcoder.hutech.edu.vn/site/signup"
                className="bg-blue-700 hover:bg-blue-800 text-white px-3 py-1.5 rounded-lg font-medium shadow-md transition-all duration-300 ease-in-out transform hover:-translate-y-0.5"
              >
                Đăng ký
              </a>
              <a
                href="/login"
                className="border-2 border-blue-700 text-blue-700 hover:bg-blue-700 hover:text-white px-3 py-1.5 rounded-lg font-medium transition-all duration-300 ease-in-out transform hover:-translate-y-0.5"
              >
                Đăng nhập
              </a>
            </>
          ) : (
            <div className="relative">
              <button
                onClick={toggleDropdown}
                className="flex items-center space-x-2 bg-blue-700 hover:bg-blue-800 text-white px-3 py-1.5 rounded-lg font-medium shadow-md transition-all duration-300"
              >
                <span className="truncate max-w-[200px]">{username}</span>
                {isDropdownOpen ? (
                  <ChevronUp size={16} />
                ) : (
                  <ChevronDown size={16} />
                )}
              </button>

              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-2xl ring-1 ring-black ring-opacity-5 overflow-hidden">
                  <div className="py-1">
                    <a
                      href="/admin"
                      className="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-100 transition-colors duration-200"
                    >
                      <User size={16} className="mr-3" />
                      Chế độ Quản trị viên
                    </a>
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center px-4 py-3 text-gray-700 hover:bg-gray-100 transition-colors duration-200 text-left"
                    >
                      <LogOut size={16} className="mr-3" />
                      Đăng xuất
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Mobile Drawer */}
      {isDrawerOpen && (
        <div
          className={`fixed inset-0 z-50 flex justify-end bg-black bg-opacity-50`}
          onClick={toggleDrawer}
        >
          <div
            className="bg-gray-800 w-64 h-full flex flex-col shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Drawer Header */}
            <div className="bg-blue-700 text-white p-4 flex items-center space-x-3">
              <UserCircle size={28} />
              <div className="truncate">
                <h4 className="font-semibold">{username || "User"}</h4>
                <p className="text-sm">Welcome back!</p>
              </div>
            </div>

            {/* Drawer Navigation */}
            <nav className="flex-1 p-4 space-y-4">
              {[
                { label: "Trang chủ", href: "/", icon: <Home size={18} /> },
                { label: "Sự kiện", href: "/events", icon: <Calendar size={18} /> },
                { label: "Liên hệ", href: "/contact", icon: <MessageSquare size={18} /> },
              ].map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="flex items-center space-x-3 text-gray-200 hover:text-white transition-colors duration-300"
                >
                  {item.icon}
                  <span>{item.label}</span>
                </a>
              ))}
            </nav>

            {/* Drawer Footer */}
            <div className="border-t border-gray-700 p-4 space-y-4">
              <a
                href="/admin"
                className="flex items-center space-x-3 text-gray-200 hover:text-white transition-colors duration-300"
              >
                <User size={18} />
                <span>Chế độ Quản trị viên</span>
              </a>
              <button
                onClick={handleLogout}
                className="flex items-center space-x-3 text-gray-200 hover:text-white transition-colors duration-300 w-full text-left"
              >
                <LogOut size={18} />
                <span>Đăng xuất</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
