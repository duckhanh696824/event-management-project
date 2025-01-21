import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, ArrowRight } from "lucide-react";
import EventCard from "./EventCard"; // Giả sử bạn có component EventCard
import { getEvents } from "api/eventsApi"; // Import hàm getEvents từ api/eventsApi

const EventList = () => {
  const navigate = useNavigate();
  const [events, setEvents] = useState<any[]>([]); // Danh sách các sự kiện
  const [currentDate, setCurrentDate] = useState(new Date()); // Ngày hiện tại
  const [selectedWeek, setSelectedWeek] = useState<any>(null); // Tuần đã chọn
  const [weekInfo, setWeekInfo] = useState<any[]>([]); // Thông tin về các tuần trong tháng

  // Mảng các tên ngày trong tuần
  const weekDays = ["CN", "T2", "T3", "T4", "T5", "T6", "T7"];

  // Lấy dữ liệu sự kiện từ API
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await getEvents(); // Gọi hàm getEvents để lấy sự kiện
        setEvents(response.data); // Lưu sự kiện vào state
      } catch (error) {
        console.error("Lỗi khi lấy sự kiện:", error);
      }
    };
    fetchEvents();
  }, []);

  // Hàm thay đổi tháng
  const changeMonth = (direction: "prev" | "next") => {
    const newDate = new Date(currentDate);
    newDate.setMonth(currentDate.getMonth() + (direction === "prev" ? -1 : 1));
    setCurrentDate(newDate);
  };

  // Hàm lọc sự kiện trong một tuần
  const handleWeekSelect = (startDate: Date, endDate: Date) => {
    setSelectedWeek({ start: startDate, end: endDate });
  };

  // Hàm tạo lịch tháng
  const generateCalendar = () => {
    const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    const lastDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
    const daysInMonth = lastDayOfMonth.getDate();
    const calendar = [];

    // Lấy ngày đầu tuần trước tháng
    const startDay = firstDayOfMonth.getDay();
    const daysBefore = startDay === 0 ? 6 : startDay - 1;

    // Lấy tất cả các ngày trong tháng
    for (let i = 1 - daysBefore; i <= daysInMonth; i++) {
      const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), i);
      const isCurrentMonth = i > 0 && i <= daysInMonth;
      const isSelected = selectedWeek && date >= selectedWeek.start && date <= selectedWeek.end;

      calendar.push(
        <div
          key={i}
          className={`p-2 text-center rounded-md cursor-pointer ${
            isSelected ? "bg-indigo-500 text-white" : isCurrentMonth ? "bg-white" : "text-gray-400"
          }`}
          onClick={() => handleWeekSelect(date, date)}
        >
          {isCurrentMonth ? date.getDate() : ""}
        </div>
      );
    }

    return calendar;
  };

  // Hàm tạo thông tin các tuần
  const generateWeekInfo = () => {
    const weeks: Array<{
      weekNumber: number;
      weekLabel: string;
      startDate: string;
      endDate: string;
      eventCount: number;
      isAcrossMonths: boolean;
      startDateObj: Date;
      endDateObj: Date;
    }> = [];

    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    // Tính tuần đầu tiên và tuần cuối cùng
    const firstDayOfMonth = new Date(year, month, 1);
    const lastDayOfMonth = new Date(year, month + 1, 0);

    const startOfFirstWeek = new Date(firstDayOfMonth);
    startOfFirstWeek.setDate(firstDayOfMonth.getDate() - ((firstDayOfMonth.getDay() + 6) % 7));

    const endOfLastWeek = new Date(lastDayOfMonth);
    endOfLastWeek.setDate(lastDayOfMonth.getDate() + (6 - ((lastDayOfMonth.getDay() + 6) % 7)));

    let currentWeekStart = new Date(startOfFirstWeek);
    let weekCounter = 1;

    while (currentWeekStart <= endOfLastWeek) {
      const weekStart = new Date(currentWeekStart);
      const weekEnd = new Date(currentWeekStart);
      weekEnd.setDate(weekStart.getDate() + 6);

      // Tìm sự kiện trong tuần này
      const weekEvents = events.filter((event) => {
        const eventDate = new Date(event.start_time);
        return eventDate >= weekStart && eventDate <= weekEnd;
      });

      let weekLabel = `Tuần ${weekCounter}`;
      let isAcrossMonths = false;

      // Đánh dấu tuần xuyên tháng
      if (weekStart.getMonth() !== month && weekEnd.getMonth() !== month) {
        currentWeekStart.setDate(currentWeekStart.getDate() + 7);
        continue;
      }

      if (weekStart.getMonth() !== month || weekEnd.getMonth() !== month) {
        isAcrossMonths = true;
        weekLabel = `Tuần ${weekCounter} (Xuyên tháng)`;
      }

      weeks.push({
        weekNumber: weekCounter,
        weekLabel,
        startDate: weekStart.toLocaleDateString("vi-VN", {
          day: "2-digit",
          month: "2-digit",
        }),
        endDate: weekEnd.toLocaleDateString("vi-VN", {
          day: "2-digit",
          month: "2-digit",
        }),
        eventCount: weekEvents.length,
        isAcrossMonths,
        startDateObj: weekStart,
        endDateObj: weekEnd,
      });

      currentWeekStart.setDate(currentWeekStart.getDate() + 7);
      weekCounter++;
    }

    setWeekInfo(weeks);
  };

  // Gọi hàm tạo thông tin tuần khi thay đổi tháng hoặc sự kiện
  useEffect(() => {
    generateWeekInfo();
  }, [currentDate, events]);

  const calendar = generateCalendar();

  return (
    <div className="bg-gray-50 min-h-screen p-6">
      <div className="container mx-auto grid grid-cols-3 gap-6">
        {/* Event List Section */}
        <div className="col-span-2 space-y-4">
          <h1 className="text-3xl font-bold text-indigo-800 mb-6">
            Danh sách sự kiện
          </h1>

          {events.length === 0 ? (
            <div className="text-center text-gray-500 py-10">
              Không có sự kiện nào phù hợp
            </div>
          ) : (
            events.map((event) => (
              <EventCard
                key={event.id}
                event={event}
                onSelect={() => navigate(`/event/${event.id}`)}
              />
            ))
          )}
        </div>

        {/* Calendar Section */}
        <div className="col-span-1">
          <div className="bg-white rounded-xl shadow-md p-6">
            {/* Month Navigation */}
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-indigo-800">
                {currentDate.toLocaleString("vi-VN", {
                  month: "long",
                  year: "numeric",
                })}
              </h2>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => changeMonth("prev")}
                  className="text-indigo-500 hover:bg-indigo-100 p-1 rounded-full"
                >
                  <ArrowLeft className="w-6 h-6" />
                </button>
                <button
                  onClick={() => changeMonth("next")}
                  className="text-indigo-500 hover:bg-indigo-100 p-1 rounded-full"
                >
                  <ArrowRight className="w-6 h-6" />
                </button>
              </div>
            </div>

            {/* Calendar Grid */}
            <div className="grid grid-cols-7 gap-2 text-gray-600 mb-4">
              {weekDays.map((day, index) => (
                <div key={index} className="font-medium text-center text-sm">
                  {day}
                </div>
              ))}
              {calendar}
            </div>

            {/* Week Information */}
            <div className="mt-4">
              <h3 className="text-lg font-semibold text-indigo-800 mb-2">
                Các tuần
              </h3>
              {weekInfo.map((week) => {
                const isSelected =
                  selectedWeek &&
                  selectedWeek.start.getTime() ===
                    new Date(week.startDateObj).getTime() &&
                  selectedWeek.end.getTime() === new Date(week.endDateObj).getTime();

                return (
                  <div
                    key={week.weekNumber}
                    className={`p-2 mb-2 border ${
                      isSelected ? "border-indigo-500" : "border-gray-300"
                    } rounded-md`}
                    onClick={() =>
                      handleWeekSelect(week.startDateObj, week.endDateObj)
                    }
                  >
                    <div className="flex justify-between">
                      <span className="font-medium">{week.weekLabel}</span>
                      <span className="text-sm text-gray-500">
                        {week.eventCount} sự kiện
                      </span>
                    </div>
                    <div className="text-sm text-gray-500">
                      {week.startDate} - {week.endDate}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventList;
