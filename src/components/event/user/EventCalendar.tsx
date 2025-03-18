import React, { useMemo } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";

interface EventCalendarProps {
  currentDate: Date;
  setCurrentDate: (date: Date) => void;
  selectedDate: Date | null;
  setSelectedDate: (date: Date | null) => void;
  selectedWeek: any;
  handleWeekSelect: (start: Date, end: Date) => void;
  events: any[];
}

const EventCalendar: React.FC<EventCalendarProps> = ({
  currentDate,
  setCurrentDate,
  selectedDate,
  setSelectedDate,
  selectedWeek,
  handleWeekSelect,
  events,
}) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0); // Đặt về 00:00:00 để so sánh chính xác

  // HÀM TẠO LỊCH THEO NGÀY
  const generateCalendar = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDayOfMonth = new Date(year, month, 1);
    const lastDayOfMonth = new Date(year, month + 1, 0);

    const startDay = firstDayOfMonth.getDay(); // Thứ trong tuần của ngày đầu tháng
    const totalDays = lastDayOfMonth.getDate(); // Số ngày trong tháng

    const days = [];
    for (let i = 0; i < startDay; i++) {
      days.push(<div key={`empty-${i}`} className="text-gray-300">-</div>);
    }

    for (let day = 1; day <= totalDays; day++) {
      const date = new Date(year, month, day);
      const isToday = date.getTime() === today.getTime();
      const isSelected = selectedDate && date.getTime() === selectedDate.getTime();
      const hasEvent = events.some((event) => new Date(event.date).toDateString() === date.toDateString());

      days.push(
        <div
          key={day}
          className={`w-12 h-12 flex items-center justify-center rounded-full
            ${isToday ? "bg-indigo-500 text-white font-bold" : "hover:bg-gray-200 hover:text-indigo-500"}
            ${isSelected ? "bg-indigo-300 text-white font-bold" : ""}
            ${hasEvent ? "border-2 border-red-500" : ""}
            cursor-pointer transition-colors`}
          onClick={() => handleDateClick(date)}
        >
          {day}
        </div>
      );
    }

    return days;
  };

  // HÀM TẠO DANH SÁCH TUẦN
  const generateWeekInfo = (currentDate: Date, events: any[]) => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
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
  
    const firstDayOfMonth = new Date(year, month, 1);
    const lastDayOfMonth = new Date(year, month + 1, 0);
  
    const startOfFirstWeek = new Date(firstDayOfMonth);
    startOfFirstWeek.setDate(
      firstDayOfMonth.getDate() - ((firstDayOfMonth.getDay() + 6) % 7),
    );
  
    const endOfLastWeek = new Date(lastDayOfMonth);
    endOfLastWeek.setDate(
      lastDayOfMonth.getDate() + (6 - ((lastDayOfMonth.getDay() + 6) % 7)),
    );
  
    let currentWeekStart = new Date(startOfFirstWeek);
    let weekCounter = 1;
  
    while (currentWeekStart <= endOfLastWeek) {
      const weekStart = new Date(currentWeekStart);
      const weekEnd = new Date(currentWeekStart);
      weekEnd.setDate(weekStart.getDate() + 6);
  
      let weekLabel = `Tuần ${weekCounter}`;
      let isAcrossMonths = false;
  
      if (weekStart.getMonth() !== month || weekEnd.getMonth() !== month) {
        isAcrossMonths = true;
        if (weekStart.getMonth() !== month) {
          weekLabel = `Tuần đầu ${currentDate.toLocaleString("vi-VN", { month: "long" })}`;
        } else {
          weekLabel = `Tuần cuối ${new Date(year, month).toLocaleString("vi-VN", { month: "long" })}`;
        }
      }
  
      // Hiển thị ngày theo định dạng dd/mm
      const formatDate = (date: Date) =>
        date.toLocaleDateString("vi-VN", { day: "2-digit", month: "2-digit" }).replace(/\//g, "/");
  
      const eventCount = events.filter((event) => {
        const eventDate = new Date(event.start_time).toISOString().split("T")[0];
        const weekStartStr = weekStart.toISOString().split("T")[0];
        const weekEndStr = weekEnd.toISOString().split("T")[0];
        return eventDate >= weekStartStr && eventDate <= weekEndStr;
      }).length;
  
      weeks.push({
        weekNumber: weekCounter,
        weekLabel,
        startDate: formatDate(weekStart),
        endDate: formatDate(weekEnd),
        eventCount,
        isAcrossMonths,
        startDateObj: weekStart,
        endDateObj: weekEnd,
      });
  
      currentWeekStart.setDate(currentWeekStart.getDate() + 7);
      weekCounter++;
    }
  
    return weeks;
  };
  
  const calendarDays = useMemo(() => generateCalendar(), [currentDate, selectedDate, events]);
  const weekInfo = useMemo(() => generateWeekInfo(currentDate, events), [currentDate, events]);
  
  const handleDateClick = (date: Date) => {
    if (selectedDate && selectedDate.getTime() === date.getTime()) {
      setSelectedDate(null);
    } else {
      setSelectedDate(date);
    }
  };
  
  const changeMonth = (direction: "next" | "prev") => {
    const newDate = new Date(currentDate);
    newDate.setMonth(newDate.getMonth() + (direction === "next" ? 1 : -1));
    setCurrentDate(newDate);
    setSelectedDate(null);
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      {/* Tiêu đề tháng */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-indigo-800">
          {currentDate.toLocaleString("vi-VN", { month: "long", year: "numeric" })}
        </h2>
        <div className="flex items-center space-x-2">
          <button onClick={() => changeMonth("prev")} className="text-indigo-500 hover:bg-indigo-100 p-1 rounded-full">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <button onClick={() => changeMonth("next")} className="text-indigo-500 hover:bg-indigo-100 p-1 rounded-full">
            <ArrowRight className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Hiển thị lịch */}
      <div className="grid grid-cols-7 gap-2 text-gray-600 mb-4">
        {["T2", "T3", "T4", "T5", "T6", "T7", "CN"].map((day, index) => (
          <div key={index} className="font-medium text-center text-sm">{day}</div>
        ))}
        {calendarDays}
      </div>

      {/* Danh sách tuần */}
      <div className="mt-4">
        <h3 className="text-lg font-semibold text-indigo-800 mb-2">Các tuần</h3>
        {weekInfo.map((week) => {
          const isSelected =
            selectedWeek &&
            selectedWeek.start.getTime() === week.startDateObj.getTime() &&
            selectedWeek.end.getTime() === week.endDateObj.getTime();

          return (
            <div
              key={week.weekNumber}
              className={`cursor-pointer rounded-lg p-3 mb-2 transition-colors 
                ${week.isAcrossMonths ? "border-2 border-indigo-200" : "border border-gray-300"}
                ${isSelected ? "bg-indigo-500 text-white border-indigo-300" : "bg-gray-100 hover:bg-gray-200"}`}
              onClick={() => handleWeekSelect(week.startDateObj, week.endDateObj)}
            >
              <div className="flex justify-between">
                <span className={`font-medium ${isSelected ? "text-white" : "text-indigo-700"}`}>
                  {week.weekLabel}
                </span>
                <div className="flex space-x-2">
                  <span className={isSelected ? "text-gray-200" : "text-gray-600"}>
                    {week.startDate} - {week.endDate}
                  </span>
                  {week.eventCount > 0 && (
                    <span className={`text-xs rounded-full px-2 py-1 ${isSelected ? "bg-white text-indigo-700" : "bg-indigo-500 text-white"}`}>
                      {week.eventCount} sự kiện
                    </span>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default EventCalendar;
