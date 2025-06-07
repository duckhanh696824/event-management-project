import React, { useEffect, useState } from 'react';
import { CalendarClock, UserCheck, BarChart2, MapPin, Clock, X } from 'lucide-react';
import { getMyRegisteredEvents } from 'api/eventsApi';
import { Event } from 'types/eventTypes';
import { useNavigate } from 'react-router-dom';


const RegisteredEventList: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const navigate = useNavigate();

useEffect(() => {
  const fetchEvents = async () => {
    const response = await getMyRegisteredEvents();
    if (response?.data) {
      setEvents(response.data);
    } else {
      console.error('Không thể tải danh sách sự kiện đã đăng ký');
    }
  };

  fetchEvents();
}, []);


  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth();

  const totalEvents = events.length;
  const eventsThisYear = events.filter(
    (e) => new Date(e.start_time).getFullYear() === currentYear
  ).length;
      const eventsThisMonth = events.filter(
    (e) => {
      const d = new Date(e.start_time);
      return d.getFullYear() === currentYear && d.getMonth() === currentMonth;
    }
  ).length;

  if (events.length === 0) {
    return (
      <div className="text-gray-600 text-center mt-8">Bạn chưa đăng ký sự kiện nào.</div>
    );
  }

  return (
    <div className="bg-gray-50 w-full pl-[72px] pr-[66px] mx-auto py-8 flex flex-col md:flex-row gap-6">
      {/* Danh sách sự kiện */}
      <div className="md:w-2/3">
        <h2 className="text-2xl font-semibold mb-4 flex items-center">
          <UserCheck className="w-6 h-6 mr-2 text-blue-500" />
          Các sự kiện đã đăng ký
        </h2>
        <ul className="space-y-4">
          {events.map((event) => (
            <li
              key={event.id}
              className="flex items-center justify-between bg-white shadow rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer"
              onClick={() => navigate(`/event/${event.id}`)}
            >
              <div className="flex items-center">
                <CalendarClock size={26} className=" text-gray-400 mr-3 ml-1" />
                <div>
                    <h3 className="text-lg font-semibold text-indigo-800 mb-1">{event.title}</h3>
                    <div className="text-sm text-gray-500 flex flex-col md:flex-row md:items-center md:gap-4">
                        <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4 text-indigo-700" />
                        {new Date(event.start_time).toLocaleDateString('vi-VN', {
                            weekday: 'long',
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                        })}
                        </span>
                        {event.site && (
                        <span className="flex items-center gap-1">
                            <MapPin className="w-4 h-4 text-indigo-700" />
                            {event.site}
                        </span>
                        )}
                    </div>
                </div>
              </div>
              <button onClick={() => event.id && handleCancelRegistration(event.id)}>
                <span className="px-3 py-1 inline-flex items-center text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-700 hover:bg-red-200 hover:text-red-800 transition-colors">
                    <X className="w-4 h-4 mr-1" />
                    Hủy
                </span>
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Thống kê */}
      <div className="md:w-1/3 h-fit bg-white shadow rounded-lg px-6 py-7">
        <h3 className="text-xl font-semibold mb-4 flex items-center">
          <BarChart2 className="w-5 h-5 mr-2 text-green-500" />
          Thống kê đã đăng ký
        </h3>
        <ul className="space-y-3 text-gray-700">
            <li>
                <span className="font-medium">Tổng số:</span>{' '}
                <span className="text-indigo-700 font-medium"><strong>{totalEvents}</strong> sự kiện</span>
            </li>
            <li>
                <span className="font-medium">Trong năm {currentYear}:</span>{' '}
                <span className="text-indigo-700 font-medium"><strong>{eventsThisYear}</strong> sự kiện</span>
            </li>
            <li>
                <span className="font-medium">Trong tháng này:</span>{' '}
                <span className="text-indigo-700 font-medium"><strong>{eventsThisMonth}</strong> sự kiện</span>
            </li>
        </ul>
      </div>
    </div>
  );

  function handleCancelRegistration(eventId: string) {
    if (!window.confirm('Bạn có chắc muốn hủy đăng ký sự kiện này?')) return;
    setEvents((prev) => prev.filter((e) => e.id !== eventId));
  }
};

export default RegisteredEventList;
