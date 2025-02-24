import { BarChart, Bell, Calendar, CheckSquare, Home, LogOut, Menu, Settings, Trophy, UserPlus } from "lucide-react";
import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";

interface SidebarProps {
  isCollapsed: boolean;
  setIsCollapsed: (val: boolean) => void;
}

const AdminSidebar: React.FC<SidebarProps> = ({ isCollapsed, setIsCollapsed }) => {
  const location = useLocation();

  const menuSections = [
    {
      title: "TỔNG QUÁT",
      items: [{ to: "/admin", icon: <Home />, label: "Trang chủ" }],
    },
    {
      title: "CHI TIẾT",
      items: [
        { to: "/admin/events", icon: <Calendar />, label: "Sự kiện" },
        { to: "/admin/registration", icon: <UserPlus />, label: "Đăng ký tham gia" },
        { to: "/admin/event-types", icon: <Bell />, label: "Loại sự kiện" },
        { to: "/admin/attendance", icon: <CheckSquare />, label: "Điểm danh" },
        { to: "/admin/results", icon: <Trophy />, label: "Kết quả" },
      ],
    },
    {
      title: "VÙNG NGUY HIỂM",
      items: [
        { to: "/admin/settings", icon: <Settings />, label: "Cài đặt" },
        { to: "/login", icon: <LogOut />, label: "Đăng xuất" },
      ],
    },
  ];

  return (
    <div className={`fixed top-0 left-0 h-screen ${
     isCollapsed ? "w-[82px]" : "w-72"
    } bg-gradient-to-br from-blue-500 to-purple-600 text-white shadow-lg transition-all overflow-y-auto`}
    >

      {/* Nút Menu để thu gọn/mở rộng */}
      {!isCollapsed && (
        <button onClick={() => setIsCollapsed(true)} className="px-4 pt-4 focus:outline-none">
          <Menu size={24} />
        </button>
      )}

      
      {/* Logo và tiêu đề sidebar */}
      <div className={`text-center ${isCollapsed ? "pt-2" : "pt-2 pb-4"}`}>
        {/* Logo */}
        <div
          className={`bg-white w-20 h-20 rounded-full mx-auto flex items-center justify-center text-blue-500 text-2xl font-bold shadow-md ${
            isCollapsed && "scale-75"
          } transition-all`}
        >
          QSK
        </div>

        {/* Tiêu đề sidebar (ẩn khi thu gọn) */}
        {!isCollapsed && (
          <>
            <h2 className="mt-3 text-xl font-semibold uppercase tracking-wide">
              Quản lý Sự kiện
            </h2>
            <span className="block mt-1 text-sm text-white opacity-60">Mô tả nhỏ</span>
          </>
        )}
      </div>

      <hr className="border-t border-white/40 opacity-75 my-3 pt-2" />

      {/* Danh sách menu */}
      <nav>
        {menuSections.map((section) => {
          // Ẩn VÙNG NGUY HIỂM khi thu gọn sidebar
          if (isCollapsed && section.title === "VÙNG NGUY HIỂM") return null;
          return(
          <div key={section.title} className="mb-4">
            {/* Ẩn tiêu đề nhóm menu khi thu gọn */}
            {!isCollapsed && (
              <h3 className="px-9 py-2 text-sm font-bold uppercase opacity-60">
                {section.title}
              </h3>
            )}
            <div className={`${isCollapsed ? "flex flex-col items-center gap-2" : ""}`}>
            {section.items.map((item) => (
              <Link
                key={item.label}
                to={item.to}
                className={`group flex items-center ${isCollapsed ? "pb-[10px]" : "py-3 mb-1 px-9"} cursor-pointer transition-transform 
                  ${location.pathname === item.to
                    ? ` ${isCollapsed 
                      ? "pl-8" 
                      : "bg-gradient-to-br from-purple-500 to-indigo-500 shadow-md border-l-4 border-white pl-10"}`
                    : isCollapsed ? "" : "hover:translate-x-2"
                }${isCollapsed ? "flex flex-col items-center" : ""}`}
              >

                {/* Icon */}
                <span className={`mr-3 ml-2 flex items-center justify-center
                  ${isCollapsed 
                    ? (location.pathname === item.to 
                      ? "p-3 bg-indigo-200 bg-opacity-40 rounded-xl text-white" 
                      : "text-white/60 pb-2 pt-3 group-hover:text-white")
                    : "text-white"}`}>
                  {React.cloneElement(item.icon, { 
                    size: isCollapsed ? 24 : 20, // Kích thước icon
                    className: isCollapsed && location.pathname === item.to
                      ? 'text-white fill-none'  // Khi được chọn: Fill trắng, không viền
                      : 'text-current fill-none' // Khi không chọn: Không fill, viền giữ nguyên màu chữ
                  })}
                </span>

              {/* Hiển thị label khi sidebar rút gọn */}
              {isCollapsed ? (
                <span className={`text-[12px] text-center w-full max-w-[65px] overflow-hidden text-ellipsis whitespace-nowrap
                  ${location.pathname === item.to ? "text-white font-semibold" : "text-white/60 group-hover:text-white"}`}>
                    {item.label}
                </span>
              ) : (
                <span className="text-[15px] font-medium text-center">{item.label}</span>
              )}         
              </Link>
            ))}    
            </div>        
          </div>
          );
      })}
      </nav>
    </div>
  );
};

export default AdminSidebar;
