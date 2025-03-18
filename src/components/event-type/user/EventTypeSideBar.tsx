import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { EventType } from "types/eventTypes";

interface EventTypeSideBarProps {
  selectedType: string;
  onSelectType: (type: string) => void;
  eventTypes: EventType[]; // Nhận danh sách loại sự kiện từ props
}

const EventTypeSideBar: React.FC<EventTypeSideBarProps> = ({ onSelectType, eventTypes }) => {
  const [searchParams] = useSearchParams();
  const selectedType = searchParams.get("eventTypeId") || ""; // Lấy ID từ URL
  return (
    <div className="flex flex-wrap justify-center gap-x-8 gap-y-1 w-full max-w-[600px] mx-auto pb-5">
      {/* Lựa chọn "Tất cả" */}
      <button
        className={`px-3 py-1 text-center text-lg ${
          selectedType === "" ? "border-b-[4px] border-indigo-800 font-semibold text-indigo-800" : "text-gray-400"
        }`}
        onClick={() => onSelectType("")}
      >
        Tất cả
      </button>

      {/* Render các loại sự kiện */}
      {eventTypes.map((eventType) => {
        console.log("📌 ID loại sự kiện:", eventType.id, "Tên:", eventType.name);
        
        return (
          <button
            key={eventType.id}
            className={`px-3 py-1 text-center text-lg ${
              selectedType === eventType.id.toString() ? "border-b-[4px] border-indigo-800 font-semibold text-indigo-800" : "text-gray-400"
            }`}
            onClick={() => onSelectType(eventType.id.toString())} // Đảm bảo truyền kiểu string
          >
            {eventType.name}
          </button>
        );
      })}
    </div>
  );
};

export default EventTypeSideBar;
