import React, { useState, useEffect } from "react";
import { Plus, QrCode, ListChecks, FileText } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import CreateCheckinSession from "./CreateCheckinSession";
import { getEventCheckins } from "api/eventsApi";
import { getUserById } from "api/userApi";


const MainCheckinList = () => {
  const [showDetail, setShowDetail] = useState(false);
  const [selectedSession, setSelectedSession] = useState<any>(null);
  const [showCreatePopup, setShowCreatePopup] = useState(false);
  const [sessions, setSessions] = useState<any[]>([]);
  const [creatorNickname, setCreatorNickname] = useState<string | null>(null);
  const { eventId } = useParams();
  const navigate = useNavigate();

  const fetchCheckinList = async () => {
    try {
      if (!eventId) return;
      const response = await getEventCheckins(eventId);
      setSessions(response.data);
    } catch (error) {
      console.error("Lỗi khi lấy danh sách phiên:", error);
    }
  };
  
  useEffect(() => {
    fetchCheckinList();
  }, [eventId]);
  

  useEffect(() => {
    const fetchUser = async () => {
      if (!selectedSession?.created_by) return;
  
      try {
        console.log("Gọi API user với ID:", selectedSession.created_by);
        const user = await getUserById(selectedSession.created_by); // Sử dụng apiClient
        console.log("Kết quả user:", user);
        const nickname = user.nickname || "Không rõ"; // Cập nhật nickname
        setCreatorNickname(nickname);
      } catch (error) {
        console.error("Lỗi khi lấy nickname người tạo:", error);
      }
    };
  
    fetchUser();
  }, [selectedSession]);

  const handleDetailClick = (item: any) => {
    setSelectedSession(item);
    setShowDetail(true);
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">Danh sách các phiên điểm danh</h1>

      {/* Nút thêm */}
      <div className="mb-4">
      <button
        onClick={() => setShowCreatePopup(true)}
        className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-xl shadow mb-4"
      >
        <Plus className="w-5 h-5" />
        Thêm phiên điểm danh
      </button>
      </div>

      {/* Phần hiển thị Table + Detail */}
      <div className={`flex gap-6 transition-all duration-300`}>
        {/* Bảng danh sách */}
        <div className={`${showDetail ? "w-2/3" : "w-full"} transition-all duration-300`}>
          <table className="min-w-full bg-white border border-gray-200 rounded-xl shadow">
            <thead className="bg-blue-600 text-white">
              <tr>
                <th className="py-3 px-4 text-left">Tên phiên điểm danh</th>
                {!showDetail && <th className="py-3 px-4 text-left">Thời gian</th>}
                <th className="py-3 px-4 text-left">Trạng thái</th>
                <th className="py-3 px-4 text-left">Chức năng</th>
              </tr>
            </thead>
            <tbody className="text-gray-700">
             {sessions.map((item: any, index) => ( 
                <tr key={item.id || item._id || index} className="border-t border-gray-200 hover:bg-gray-50">
                  <td className="py-4 px-4">{item.name}</td>
                  {!showDetail && <td className="py-4 px-4">{item.created_at}</td>}
                  <td className="py-4 px-4">
                    <div className="flex flex-col items-start">
                      {/* Toggle switch */}
                      <label className="inline-flex relative items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" checked={item.status} readOnly />
                        <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-green-600 relative">
                          <div className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-all duration-300 ${item.status ? "translate-x-5" : ""}`}></div>
                        </div>
                      </label>
                      <span className={`mt-1 text-sm ${item.status ? "text-green-600" : "text-red-600"}`}>
                        {item.status ? "Đang mở" : "Đã đóng"}
                      </span>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex gap-4">
                      <QrCode className="w-5 h-5 text-gray-600 hover:text-blue-600 cursor-pointer" />
                      <ListChecks className="w-5 h-5 text-gray-600 hover:text-blue-600 cursor-pointer" />
                      <FileText
                        className="w-5 h-5 text-gray-600 hover:text-blue-600 cursor-pointer"
                        onClick={() => handleDetailClick(item)}
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Panel chi tiết */}
        {showDetail && selectedSession && (
          <div className="w-1/3 bg-white rounded-xl shadow p-6 space-y-4">
            <h2 className="text-lg font-semibold">Chi tiết phiên</h2>
            <p><span className="font-medium">Thời gian:</span> {selectedSession.created_at}</p>
            <p><span className="font-medium">Người tạo phiên:</span> {creatorNickname}</p>
            <p><span className="font-medium">Đã checkin:</span> {selectedSession.checkedIn} người</p>

            <div className="flex gap-4 mt-6">
              <button className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg">
                <QrCode className="w-4 h-4" />
                QR Checkin
              </button>
              <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg">
                <ListChecks className="w-4 h-4" />
                Checkin thủ công
              </button>
            </div>

            <button
              onClick={() => setShowDetail(false)}
              className="mt-6 text-red-600 hover:underline"
            >
              Đóng chi tiết
            </button>
          </div>
        )}
      </div>
            {/* Popup Tạo phiên điểm danh */}
            {showCreatePopup && (
              <CreateCheckinSession 
                eventId={eventId as string} 
                onClose={() => setShowCreatePopup(false)} 
                onCreated={fetchCheckinList} 
              />
            )}
    </div>
  );
};

export default MainCheckinList;
