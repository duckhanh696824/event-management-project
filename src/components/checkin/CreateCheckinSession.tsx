import React, { useState } from "react";
import { XCircle } from "lucide-react";
import { createEventCheckin } from "api/eventsApi";
import { toast } from "react-toastify";

const CreateCheckinSession = ({
  onClose,
  eventId,
  onCreated
}: { 
  onClose: () => void;
  eventId: string;
  onCreated: () => void;
}) => {
  const [sessionName, setSessionName] = useState("");
  const [repeatCount, setRepeatCount] = useState(1);
  const [qrLoadTime, setQrLoadTime] = useState(5);

  const handleCreate = async () => {
    try {
      console.log("✅ Tham số gửi lên:", {
        eventId,
        times: repeatCount,
        refreshSec: qrLoadTime,
      });
  
      const response = await createEventCheckin(eventId, repeatCount, qrLoadTime);
  
      toast.success("Tạo phiên điểm danh thành công!");
      onClose();
      onCreated();
    } catch (error: any) {
      console.error("❌ Lỗi khi tạo phiên điểm danh:", error);
      toast.error(
        error?.response?.data?.message || "Tạo phiên điểm danh thất bại!"
      );
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-lg relative">
        <h2 className="text-2xl font-bold mb-6 text-center">Tạo phiên điểm danh</h2>

        {/* Nút đóng */}
        <button
          className="absolute top-4 right-4 text-gray-500 hover:text-red-600"
          onClick={onClose}
        >
          <XCircle className="w-6 h-6" />
        </button>

        <div className="space-y-4">
          <div>
            <label className="block text-gray-700 mb-1">Tên phiên điểm danh</label>
            <input
              type="text"
              value={sessionName}
              onChange={(e) => setSessionName(e.target.value)}
              className="w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Nhập tên phiên"
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-1">Số lần</label>
            <input
              type="number"
              value={repeatCount}
              min={1}
              onChange={(e) => setRepeatCount(Number(e.target.value))}
              className="w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Số lần"
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-1">Thời gian load QR (giây)</label>
            <input
              type="number"
              value={qrLoadTime}
              min={1}
              onChange={(e) => setQrLoadTime(Number(e.target.value))}
              className="w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Thời gian QR"
            />
          </div>
        </div>

        <div className="flex justify-end gap-4 mt-8">
          <button
            onClick={onClose}
            className="px-6 py-3 bg-gray-300 text-gray-800 rounded-xl hover:bg-gray-400"
          >
            Hủy
          </button>
          <button
            onClick={handleCreate}
            className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700"
          >
            Lưu
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateCheckinSession;
