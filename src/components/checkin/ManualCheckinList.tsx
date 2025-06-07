import React from "react";
import { ArrowLeft, CalendarCheck, ClipboardCheck, ClipboardX, Download, Loader } from "lucide-react";
import { useNavigate } from "react-router-dom";
import InputManualCheckin from "./InputManualCheckin";
import ManualCheckinCard from "./ManualCheckinCard";

const mockCheckins = [
  {
    id: 1,
    studentName: "Nguyễn Văn A",
    studentId: "B1234567",
    className: "IT01",
    checkinTime: "2024-02-09T08:30:00",
    checkedBy: "Admin1",
  },
  {
    id: 2,
    studentName: "Trần Thị B",
    studentId: "B7654321",
    className: "IT02",
    checkinTime: "2024-02-09T09:00:00",
    checkedBy: "Admin2",
  },
  {
    id: 3,
    studentName: "Lê Văn C",
    studentId: "B2345678",
    className: "IT03",
    checkinTime: "2024-02-09T10:15:00",
    checkedBy: "Admin3",
  },
];

const ManualCheckinList: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-background min-h-screen p-1 max-h-[1000px]">
      <div className="text-center mt-5 mb-9">
        <h2 className="text-4xl font-bold text-indigo-800 mb-3">
          Danh sách Checkin, Checkout
        </h2>
        <p className="text-2xl text-gray-700">
          HỘI THI TÌM KIẾM TÀI NĂNG
        </p>
      </div>

      <div className="bg-gray-50 rounded-2xl px-7 py-12">
        <InputManualCheckin/>

        {/* Card thống kê */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 py-8">
          <div
            className={`
              bg-gradient-to-br from-green-100 via-emerald-200 to-teal-300
              rounded-3xl p-6 flex items-center space-x-6 
              shadow-2xl hover:scale-105 transition duration-500 
              transform hover:shadow-2xl relative overflow-hidden
              border border-white/20
            `}
          >
            <ClipboardCheck
              className={`w-14 h-14 text-green-700 z-10`}
              strokeWidth={1.5}
            />
            <div className="z-10">
              <p className="text-green-700 text-bs font-medium">
                Tổng số người đã checkin
              </p>
              <p className="text-3xl font-black text-green-800">15</p>
            </div>
          </div>
          <div
            className={`
              bg-gradient-to-br from-purple-100 via-violet-200 to-pink-300
              rounded-3xl p-6 flex items-center space-x-6 
              shadow-2xl hover:scale-105 transition duration-500 
              transform hover:shadow-2xl relative overflow-hidden
              border border-white/20
            `}
          >
            <ClipboardX
              className={`w-14 h-14 text-purple-700 z-10`}
              strokeWidth={1.5}
            />
            <div className="z-10">
              <p className="text-purple-700 text-bs font-medium">
                Tổng số người đã checkout
              </p>
              <p className="text-3xl font-black text-purple-800">15</p>
            </div>
          </div>
        </div>
    
        {/* Bảng chi tiết checkin */}
        <div className="bg-white shadow-xl rounded-3xl overflow-hidden border border-slate-200">
          <div className="flex justify-between items-center p-6 bg-gradient-to-r from-indigo-50 to-white border-b">
            <h2 className="text-2xl font-bold text-slate-800">Danh sách Check-in</h2>
            <div className="flex space-x-3">
              <a
                href="/"
                className="flex items-center bg-gradient-to-r from-indigo-600 to-blue-600 text-white px-4 py-2 rounded-lg hover:from-indigo-700 hover:to-blue-700 transition-all shadow-lg hover:shadow-xl"
              >
                <Loader className="mr-2 h-5 w-5" />Tải lại danh sách
              </a>
              <a
                href="/"
                className="flex items-center bg-gradient-to-r from-emerald-600 to-green-600 text-white px-4 py-2 rounded-lg hover:from-emerald-700 hover:to-green-700 transition-all shadow-lg hover:shadow-xl"
              >
                <Download className="mr-2 h-5 w-5" />Xuất file Excel
              </a>
            </div>
          </div>
          <table className="w-full border-collapse border">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-4 py-2">STT</th>
                <th className="px-4 py-2 text-left">Họ tên</th>
                <th className="px-4 py-2">MSSV</th>
                <th className="px-4 py-2">Lớp</th>
                <th className="px-4 py-2">Checkin lúc</th>
                <th className="px-4 py-2">Người Checkin</th>
                <th className="px-4 py-2">Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {mockCheckins.map((event, index) => (
                <ManualCheckinCard key={event.id} event={event} index={index} />
              ))}
            </tbody>
          </table>
        </div>  
      </div>
    </div>
  );
};

export default ManualCheckinList;
