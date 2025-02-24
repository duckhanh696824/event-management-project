import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import AdminSidebar from "components/sidebar/AdminSidebar";
import AdminTopBar from "components/common/AdminTopBar";

const AdminLayout: React.FC = () => {
  const [isCollapsed, setIsCollapsed] = useState(false); // Trạng thái sidebar

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <AdminSidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed}/>

      {/* Nội dung chính */}
      <div         
        className={`flex-1 px-6 pb-6 transition-all bg-gray-100 ${
          isCollapsed ? "ml-[82px]" : "ml-72"
        }`}>

        {/* Gọi AdminTopBar khi sidebar rút gọn */}
        <div className="fixed w-full top-0 px-16 left-10 right-6 z-50">
          {isCollapsed && <AdminTopBar onMenuClick={() => setIsCollapsed(false)} />}
        </div>


        {/* Nội dung của trang */}
        <div className={`bg-white rounded-lg shadow-md p-6 ${isCollapsed ? "mt-[72px]" : "mt-4"}`}>
          <Outlet /> {/* Render các nested routes tại đây */}
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
