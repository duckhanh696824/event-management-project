import React from "react";
import { Eye, Info, Paperclip, List, Trash } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface ManualCheckinCardProps {
  event: any;
  index: number; // Thêm prop index để truyền số thứ tự
}

const ManualCheckinCard: React.FC<ManualCheckinCardProps> = ({ event, index }) => {
  const navigate = useNavigate();

  const handleViewRegistrations = () => {
    navigate(`/admin/event-registrations/${event.id}`);
  };

  const handleUploadPoster = () => {
    navigate(`/admin/events/${event.id}/poster/edit`);
  };

  const handleViewDetail = () => {
    navigate(`/admin/event-detail/${event.id}`);
  };

  const handleCheckin = () => {
    navigate(`/admin/event-update/${event.id}`);
  };

  return (
    <tr className="border-b hover:bg-indigo-50 transition-colors group">
      <td className="px-4 py-3 text-center">{index + 1}</td> {/* Cột STT */}
      <td className="px-4 py-3 text-left">{event.studentName}</td> {/* Họ tên */}
      <td className="px-4 py-3 text-center">{event.studentId}</td> {/* MSSV */}
      <td className="px-4 py-3 text-center">{event.className}</td> {/* Lớp */}
      <td className="px-4 py-3 text-center">{new Date(event.checkinTime).toLocaleString()}</td> {/* Checkin lúc */}
      <td className="px-4 py-3 text-center">{event.checkedBy}</td> {/* Người Checkin */}
      <td className="px-4 py-3 text-center">
        <div className="flex space-x-2 justify-center">
          <button className="text-red-500 hover:text-red-700 p-2 rounded-full hover:bg-blue-100" >
            <Trash size={18} />
          </button>
        </div>
      </td>
    </tr>
  );
};

export default ManualCheckinCard;
