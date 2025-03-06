import { getUserInfo, isAuthenticated, logoutApi } from "api/Authapi";
import { ChevronDown, LogIn, LogOut, Mail, MapPin, Settings, User } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const TopHeader = ({ setActiveTab }: { setActiveTab: (tab: string) => void }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [userId, setUserId] = useState(""); // Thêm state cho userId
  const dropdownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const userInfo = getUserInfo();
    if (isAuthenticated() && userInfo) {
      setIsLoggedIn(true);
      setUsername(userInfo.nickname || userInfo.username || "User");
      setUserId(userInfo.id ? userInfo.id.toString() : ""); // Chuyển id thành string
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  // Sự kiện đóng dropdown khi click ra ngoài
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    logoutApi();
  };

  const goToPage = (path: string) => {
    setActiveTab(""); // Bỏ chọn các tab chính
    navigate(path);
    setIsDropdownOpen(false); // Đóng dropdown sau khi chuyển trang
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
          {!isLoggedIn ? (
            <>
              {/* Đăng ký */}
              <a 
                href="https://itcoder.hutech.edu.vn/site/signup" 
                className="flex items-center hover:text-indigo-800"
              >
                <User className="w-4 h-4 mr-2 text-gray-900 font-bold strokeWidth={2} hover:text-indigo-800" />
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
            </>
          ) : (
            <div ref={dropdownRef} className="relative">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center space-x-1 focus:outline-none"
              >
                <img
                  src={"/assets/images/avatar.png"} // Avatar mặc định nếu không có ảnh
                  alt="User Avatar"
                  className="w-8 h-8 rounded-full border border-gray-300"
                />
                <span className="text-gray-900 font-bold pl-1">{username}</span>
                <ChevronDown className="w-4 h-4 text-gray-900 font-bold relative top-[1px]" />                
              </button>

              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md border border-gray-200 z-50">
                  <ul>
                    <li>
                      <button 
                        onClick={() => goToPage(`/profile/${userId}`)} 
                        className="flex w-full items-center px-4 pt-4 pb-3 text-gray-700 hover:bg-gray-100 hover:font-medium hover:text-indigo-800"
                      >
                        <User className="w-4 h-4 mr-2" />
                        Hồ sơ
                      </button>
                    </li>
                    <li>
                      <button 
                        onClick={() => goToPage("/setting")} 
                        className="flex w-full items-center px-4 py-3 text-gray-700 hover:bg-gray-100 hover:font-medium hover:text-indigo-800"
                      >
                        <Settings className="w-4 h-4 mr-2" />
                        Cài đặt
                      </button>
                    </li>
                    <li>
                      <button
                        onClick={handleLogout}
                        className="flex w-full items-center px-4 pt-3 pb-4 text-red-600 hover:bg-gray-100 hover:font-medium"
                      >
                        <LogOut className="w-4 h-4 mr-2" />
                        Đăng xuất
                      </button>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TopHeader;
