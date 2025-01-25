import React from "react";
import { Link, useLocation } from "react-router-dom";

const AdminSidebar: React.FC = () => {
  const location = useLocation();

  const menuItems = [
    { to: "/admin", icon: "fas fa-home", label: "Trang chủ" },
    { to: "/admin/events", icon: "fas fa-calendar-alt", label: "Sự kiện" },
    {
      to: "/admin/registration",
      icon: "fas fa-user-plus",
      label: "Đăng ký tham gia",
    },
    { to: "/admin/event-types", icon: "fas fa-bell", label: "Loại sự kiện" },
    {
      to: "/admin/attendance",
      icon: "fas fa-check-square",
      label: "Điểm danh",
    },
    { to: "/admin/results", icon: "fas fa-trophy", label: "Kết quả" },
    { to: "/admin/statistics", icon: "fas fa-chart-bar", label: "Thống kê" },
    { to: "/admin/settings", icon: "fas fa-cog", label: "Cài đặt" },
  ];

  return (
    <div className="fixed top-0 left-0 h-screen w-72 bg-gradient-to-br from-blue-500 to-purple-600 text-white shadow-lg transition-all overflow-y-auto">
      <div className="text-center py-8">
        <div className="bg-white w-20 h-20 rounded-full mx-auto flex items-center justify-center text-blue-500 text-2xl font-bold shadow-md">
          QSK
        </div>
        <h2 className="mt-4 text-lg font-semibold uppercase tracking-wide">
          Quản lý Sự kiện
        </h2>
      </div>

      <nav className="px-4">
        {menuItems.map((item) => (
          <Link
            key={item.label}
            to={item.to}
            className={`flex items-center px-4 py-3 mb-2 rounded-lg cursor-pointer transition-transform ${
              location.pathname === item.to
                ? "bg-gradient-to-br from-purple-500 to-blue-500 shadow-md translate-x-2"
                : "hover:translate-x-2"
            }`}
          >
            <i className={`${item.icon} w-6 text-center mr-3`}></i>
            <span className="text-sm font-medium">{item.label}</span>
          </Link>
        ))}
      </nav>
    </div>
  );
};

export default AdminSidebar;
