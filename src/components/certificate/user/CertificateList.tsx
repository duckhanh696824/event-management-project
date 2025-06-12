import React, { useEffect, useState } from "react";
import CertificateCard, { CertificateCardProps } from "./CertificateCard";
import FilterListIcon from '@mui/icons-material/FilterList';
import { fetchMyCertifiedEvents } from "api/certificateApi";
import { EventType } from "types/eventTypes";
import { getAllEventTypes } from "api/eventTypeApi";
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { useNavigate } from "react-router-dom";
import { CertifiedEvent } from "types/certificateEventTypes";

const CertificateList: React.FC = () => {
  const [showFilter, setShowFilter] = useState(false);
  const [search, setSearch] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [certificates, setCertificates] = useState<CertificateCardProps[]>([]);
  const [eventTypes, setEventTypes] = useState<EventType[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const loadData = async () => {
      try {
        // 1. Lấy tất cả event types trước
        const eventTypesResponse = await getAllEventTypes();
        // Giả sử eventTypesResponse có kiểu ApiResponse<EventType[]>,
        // và bên trong có trường `data` là một mảng EventType { id, name, ... }
        const typesArray = eventTypesResponse.data;
        setEventTypes(typesArray);

        // 2. Lấy danh sách các certified events của user
        const data: CertifiedEvent[] = await fetchMyCertifiedEvents();

        // 3. Mapping: tìm trong eventTypes xem id nào khớp để lấy name
        const mappedCerts: CertificateCardProps[] = data.map((evt, index) => {
          // Tìm EventType có id = evt.event_type_id
          const matchedType = typesArray.find(
            (et) => Number(et.id) === Number(evt.event_type_id ?? "-1")
          );
          // Nếu tìm thấy, lấy name; nếu không tìm thấy, có thể gán default là "Unknown"
          const categoryName = matchedType ? matchedType.name : "Unknown";
          return {
            id: evt.id,
            index,
            image: evt.image_base64 ?? "",
            title: evt.title,
            date: new Date(evt.start_time).toLocaleDateString("vi-VN"),
            location: evt.site,
            category: categoryName,
          };
        });

        setCertificates(mappedCerts);
      } catch (error) {
        console.error("Lỗi khi load data:", error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  if (loading) {
    return <p className="p-6">Đang tải danh sách chứng nhận…</p>;
  }

  // Lọc theo search / startDate / endDate / categoryFilter
  const filtered = certificates.filter((cert) => {
    return (
      (search === "" ||
        cert.title.toLowerCase().includes(search.toLowerCase())) &&
      (startDate === "" || new Date(cert.date) >= new Date(startDate)) &&
      (endDate === "" || new Date(cert.date) <= new Date(endDate)) &&
      (categoryFilter === "" || cert.category === categoryFilter)
    );
  });

  return (
    <div className="py-7 pl-[60px] pr-[55px] bg-gradient-to-b from-blue-50 to-white min-h-screen">
      {/* Nút mở bộ lọc */}
      <div className={`flex items-center justify-between ${showFilter ? "mb-4" : "mb-7"}`}>
        <div>
          <div className="flex items-center gap-2">
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-indigo-100">
              <CalendarMonthIcon className="text-indigo-600" sx={{fontSize: 28}} />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-800 relative">
                Danh sách giấy chứng nhận
              </h1>
              <div className="w-[115px] h-1 bg-indigo-600 mt-[2px] rounded"></div>
            </div>
          </div>
        </div>
        
        <button
          onClick={() => setShowFilter(!showFilter)}
          className="flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          <FilterListIcon />
          Bộ lọc
        </button>
      </div>

      {/* Bộ lọc */}
      {showFilter && (
        <div className="bg-white p-6 rounded-lg shadow-md mb-6 animate-fade-in">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <input
              type="text"
              placeholder="Tìm kiếm sự kiện..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="p-2 border border-gray-300 rounded-lg w-full focus:ring-2 focus:ring-blue-500"
            />

            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="p-2 border border-gray-300 rounded-lg w-full focus:ring-2 focus:ring-blue-500"
            />

            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="p-2 border border-gray-300 rounded-lg w-full focus:ring-2 focus:ring-blue-500"
            />

            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="p-2 border border-gray-300 rounded-lg w-full focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Tất cả loại sự kiện</option>
              {/* Ở đây ta lấy danh mục từ eventTypes về, để user chọn */}
              {eventTypes.map((et) => (
                <option key={et.id} value={et.name}>
                  {et.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      )}

      {/* Danh sách sự kiện */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {filtered.map((cert, index) => (
          <div
            key={index}
            className="transition-transform duration-300 hover:scale-[1.02]"
          >
            <CertificateCard key={index} {...cert} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default CertificateList;