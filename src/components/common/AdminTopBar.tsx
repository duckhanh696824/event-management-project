// src/components/AdminTopBar.tsx
import React from "react";
import { Menu, Settings, LogOut } from "lucide-react"; // Import icons

interface AdminTopBarProps {
  onMenuClick: () => void; // Hàm xử lý khi nhấn nút menu
}

const AdminTopBar: React.FC<AdminTopBarProps> = ({ onMenuClick }) => {
  return (
    <div className="bg-white shadow-md rounded-b-lg px-3 py-[6px] flex items-center justify-between">
      {/* Nút menu */}
      <button onClick={onMenuClick} className="p-2 ml-2 rounded-md bg-indigo-500 text-indigo-50 hover:bg-indigo-600 hover:text-white">
        <Menu size={24} />
      </button>

      {/* Nhóm các icon Setting và Logout */}
      <div className="flex gap-2">
        <button className="p-3 rounded-full text-gray-600 hover:bg-gray-200 hover:bg-opacity-50">
          <Settings size={24} />
        </button>
        <button className="p-3 mr-2 rounded-full text-red-500 hover:bg-gray-200 hover:bg-opacity-50">
          <LogOut size={24} />
        </button>
      </div>
    </div>
  );
};

export default AdminTopBar;
