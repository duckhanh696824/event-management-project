import { Lock, Globe, Trash2 } from "lucide-react";
import { useState } from "react";
import UserChangePassword from "./UserChangePassword"; // Import file vừa tách

const UserSetting = () => {
  const [selectedTab, setSelectedTab] = useState("password");

  return (
    <div className="w-full min-h-screen flex flex-col bg-indigo-50 bg-opacity-50 pl-[66px] pr-[62px] py-6">
      <nav aria-label="breadcrumb" className="mb-4 ml-1">
        <ol className="flex space-x-2 text-indigo-700">
          <li>
            <a href="/" className="hover:underline">Trang chủ</a>
          </li>
          <li>/</li>
          <li className="text-indigo-700 font-semibold">Cài đặt</li>
        </ol>
      </nav>
      
      <div className="flex w-full">
        <div className="w-1/4 bg-white rounded-lg shadow-md">
          <nav>
            <ul>
              <li
                className={`flex items-center space-x-3 px-4 py-5 cursor-pointer rounded-tr-md ${
                  selectedTab === "password" 
                  ? "bg-indigo-100 text-indigo-700 border-l-[6px] border-indigo-600 font-semibold" 
                  : "hover:bg-gray-200 border-l-[6px] border-transparent"
                }`}
                onClick={() => setSelectedTab("password")}
              >
                <Lock size={20} />
                <span>Thay đổi mật khẩu</span>
              </li>
              <li
                className={`flex items-center space-x-3 px-4 py-5 cursor-pointer ${
                  selectedTab === "language" 
                  ? "bg-indigo-100 text-indigo-700 border-l-[6px] border-indigo-600 font-semibold" 
                  : "hover:bg-gray-200 border-l-[6px] border-transparent"
                }`}
                onClick={() => setSelectedTab("language")}
              >
                <Globe size={20} />
                <span>Ngôn ngữ</span>
              </li>
              <li
                className={`flex items-center space-x-3 px-4 py-5 cursor-pointer rounded-br-md ${
                  selectedTab === "delete" 
                  ? "bg-red-100 text-red-600 border-l-[6px] border-red-600 font-semibold" 
                  : "hover:bg-gray-200 border-l-[6px] border-transparent"
                }`}
                onClick={() => setSelectedTab("delete")}
              >
                <Trash2 size={20} />
                <span>Xóa tài khoản</span>
              </li>
            </ul>
          </nav>
        </div>

        <div className="w-3/4 bg-white p-6 rounded-lg shadow-md ml-6">
          {selectedTab === "password" && <UserChangePassword />}
          {selectedTab === "language" && (
            <div>
              <h2 className="text-xl font-semibold text-indigo-800">NGÔN NGỮ</h2>
              <p className="text-gray-600">Tính năng này chưa khả dụng.</p>
            </div>
          )}
          {selectedTab === "delete" && (
            <div>
              <h2 className="text-xl font-semibold text-red-600">XÓA TÀI KHOẢN</h2>
              <p className="text-gray-600">Tính năng này chưa khả dụng.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserSetting;
