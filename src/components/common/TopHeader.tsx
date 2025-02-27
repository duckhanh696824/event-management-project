  import { getUserInfo, isAuthenticated, logoutApi } from "api/Authapi";
  import { LogIn, Mail, MapPin, User } from "lucide-react";
  import React, { useEffect, useState } from "react";


  const TopHeader = () => {
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

    const handleLogout = () => {
      logoutApi();
    };

    return (
      <div className="bg-gray-100 pt-2 pb-3 text-gray-800 text-sm">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-4 ml-8">
            {/* Email */}
            <div className="flex items-center">
              <Mail className="w-4 h-4 mr-2 text-gray-900 font-bold" strokeWidth={2} />
              <span>support@example.com</span>
            </div>

            {/* Line Separator */}
            <div className="h-4 w-px bg-gray-400 opacity-40"></div>

            {/* Location */}
            <div className="flex items-center">
              <MapPin className="w-4 h-4 mr-2 text-gray-900 font-bold strokeWidth={2}" />
              <span>Hồ Chí Minh, Việt Nam</span>
            </div>
          </div>

          {/* Right: Đăng ký & Đăng nhập */}
          <div className="flex items-center space-x-4 mr-8">
            {/* Đăng ký */}
            <a href="/register" className="flex items-center hover:text-green-600">
              <User className="w-4 h-4 mr-2 text-gray-900 font-bold strokeWidth={2}" />
              <span>Đăng ký</span>
            </a>

            {/* Line Separator */}
            <div className="h-4 w-px bg-gray-400 opacity-60"></div>

            {/* Đăng nhập */}
            <a
              href="/login"
              className="flex items-center text-indigo-700 px-3 py-1 border border-gray-600 rounded-md 
              hover:bg-indigo-600 hover:text-white transition"
            >
              <LogIn className="w-4 h-4 mr-2 font-bold strokeWidth={2}" />
              <span>Đăng nhập</span>
            </a>
          </div>
        </div>
      </div>
    );
  };

  export default TopHeader;
