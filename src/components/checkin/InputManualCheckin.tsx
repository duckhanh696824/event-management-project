import React, { useState } from "react";

const InputManualCheckin: React.FC = () => {
  const [studentId, setStudentId] = useState("");

  const handleCheckin = () => {
    console.log("MSSV cần checkin:", studentId);
    // Thêm logic xử lý checkin tại đây
  };

  return (
    <div className="flex items-center">
      <input
        type="text"
        placeholder="Nhập MSSV cần checkin"
        value={studentId}
        onChange={(e) => setStudentId(e.target.value)}
        className="w-full px-4 py-3 text-lg border-2 border-gray-300 rounded-l-xl focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
      />
      <button
        onClick={handleCheckin}
        className="px-5 py-3 bg-indigo-600 border-2 border-indigo-600 text-lg text-white rounded-r-xl hover:bg-indigo-700 transition"
      >
        Thêm
      </button>
    </div>
  );
};

export default InputManualCheckin;