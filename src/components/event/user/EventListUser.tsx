import React, { useState, useEffect, useMemo } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Event } from "types/eventTypes";
import EventCard from "./EventCard";
import { getEvents } from "api/eventsApi";
import { useNavigate, useSearchParams } from "react-router-dom";
import EventCalendar from "./EventCalendar";
import EventTypeSideBar from "components/event-type/user/EventTypeSideBar";
import { getAllEventTypes } from "api/eventTypeApi";
import { EventType } from "types/eventTypes";

interface EventListProps {
  onEventSelect?: (event: Event) => void;
}

const EventList: React.FC<EventListProps> = ({ onEventSelect }) => {
  const [events, setEvents] = useState<Event[]>([]);
  const [filteredEvents, setFilteredEvents] = useState<Event[]>([]);
  const [currentDate, setCurrentDate] = useState(new Date());
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3; // Số sự kiện mỗi trang
  const [selectedType, setSelectedType] = useState<string>("");
  const [eventTypes, setEventTypes] = useState<EventType[]>([]);
  // const [selectedEventType, setSelectedEventType] = useState<number | null>(null);
  // const [searchParams, setSearchParams] = useSearchParams();
  // const eventTypeIdFromURL = searchParams.get("eventTypeId");
  const [searchParams] = useSearchParams();
  const eventTypeId = searchParams.get("eventTypeId");
  const [selectedEventType, setSelectedEventType] = useState<string | null>(
    eventTypeId ?? null
  );
  
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedWeek, setSelectedWeek] = useState<{
    start: Date;
    end: Date;
  } | null>(null);
  
  // LẤY DANH SÁCH SỰ KIỆN
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setIsLoading(true);
        const response = await getEvents();

        // Adjust this part to match your actual API response structure
        const fetchedEvents = Array.isArray(response)
          ? response
          : response.data || [];

        // Sắp xếp sự kiện theo thời gian tổ chức giảm dần
        fetchedEvents.sort(
          (a, b) =>
            new Date(b.start_time).getTime() - new Date(a.start_time).getTime(),
        );

        setEvents(fetchedEvents);
        setFilteredEvents(fetchedEvents);
        setIsLoading(false);
      } catch (err) {
        setError("Lỗi tải sự kiện. Vui lòng thử lại sau.");
        setIsLoading(false);
        console.error("Error fetching events:", err);
      }
    };

    fetchEvents();
  }, []);

  // LẤY DANH SÁCH LOẠI SỰ KIỆN
  useEffect(() => {
    const fetchEventTypes = async () => {
      try {
        const response = await getAllEventTypes();
        if (response && response.data) {
          const sortedEventTypes = response.data.sort((a, b) => a.name.localeCompare(b.name));
          setEventTypes(sortedEventTypes);
        }
      } catch (error) {
        console.error("Error fetching event types:", error);
      }
    };

    fetchEventTypes();
  }, []);
  

  // LỌC SỰ KIỆN THEO LOẠI SỰ KIỆN VÀ TUẦN ĐÃ CHỌN
  useEffect(() => {
    let filtered = events;
  
    if (selectedType !== "") {
      filtered = filtered.filter(event => event.event_type_id === selectedType);
    }
  
    if (selectedWeek) {
      const startOfWeek = new Date(selectedWeek.start);
      startOfWeek.setHours(0, 0, 0, 0);
      const endOfWeek = new Date(selectedWeek.end);
      endOfWeek.setHours(23, 59, 59, 999);
  
      filtered = filtered.filter(event => {
        const eventDate = new Date(event.start_time);
        return eventDate >= startOfWeek && eventDate <= endOfWeek;
      });
    }
  
    setFilteredEvents(filtered);
    setCurrentPage(1);
  }, [selectedType, selectedWeek, events]);


  // Lọc sự kiện theo loại sự kiện từ URL
  // useEffect(() => {
  //   if (eventTypeIdFromURL) {
  //     console.log("🌍 Lấy ID từ URL:", eventTypeIdFromURL);      
  //     setSelectedEventType(eventTypeIdFromURL);
  //   }
  // }, [eventTypeIdFromURL]);

  // const filteredEventsByType = useMemo(() => {
  //   console.log("🔍 Danh sách sự kiện:", events);
  //   console.log("🔍 Loại sự kiện đã chọn:", selectedEventType);
    
  //   return events.filter(
  //     (event) => !selectedEventType || event.event_type_id.toString() === selectedEventType
  //   );
  // }, [events, selectedEventType]);

  // const filteredEventsType = eventTypeId
  // ? events.filter((event) => event.event_type_id.toString() === eventTypeId)
  // : events; // Nếu không có eventTypeId, hiển thị tất cả sự kiện

  
  // // Cập nhật danh sách sự kiện được hiển thị
  // useEffect(() => {
  //   setFilteredEvents(filteredEventsByType);
  //   setCurrentPage(1);
  // }, [filteredEventsByType]);
  
  useEffect(() => {
    const eventTypeIdStr = eventTypeId ? String(eventTypeId) : "";
    if (eventTypeIdStr) {
      setSelectedEventType(eventTypeIdStr);
      setFilteredEvents(events.filter(event => event.event_type_id.toString() === eventTypeIdStr));
    } else {
      setFilteredEvents(events);
    }
    setCurrentPage(1); // Reset về trang đầu khi lọc
  }, [eventTypeId, events]);
  

  // Xử lý chọn loại sự kiện
  // const handleTypeSelect = (typeId: string | null) => {
  //   setSelectedEventType(typeId);
  //   setSearchParams(typeId ? { eventTypeId: typeId.toString() } : {});
  // };

  const handleTypeSelect = (typeId: string | null) => {
    navigate(typeId ? `/events?eventTypeId=${typeId}` : "/events");
  };
  
    
  const totalPages = Math.ceil(filteredEvents.length / itemsPerPage);
  const paginatedEvents = filteredEvents.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  const FilteredEventsByDate = useMemo(() => {
    if (!selectedDate) return events;
    return events.filter((event) => {
      const eventDate = new Date(event.start_time);
      return eventDate.toDateString() === selectedDate.toDateString();
    });
  }, [selectedDate, events]);
  
  useEffect(() => {
    setFilteredEvents(FilteredEventsByDate);
    setCurrentPage(1); // Reset về trang đầu khi lọc
  }, [FilteredEventsByDate]);
  
  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  const handleWeekSelect = (weekStartDate: Date, weekEndDate: Date) => {
    if (
      selectedWeek &&
      selectedWeek.start.getTime() === weekStartDate.getTime() &&
      selectedWeek.end.getTime() === weekEndDate.getTime()
    ) {
      setSelectedWeek(null);
    } else {
      setSelectedWeek({ start: weekStartDate, end: weekEndDate });
    }
  };
  

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-indigo-500">Đang tải sự kiện...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen text-red-500">
        {error}
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen px-6 pb-6">
      <div className="container mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Calendar Section */}
        <div className="lg:col-span-1 order-1 lg:order-2">
          <EventCalendar 
            currentDate={currentDate}
            setCurrentDate={setCurrentDate}
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
            selectedWeek={selectedWeek}
            handleWeekSelect={handleWeekSelect}
            events={filteredEvents} 
          />
        </div>

        {/* Event List Section */}
        <div className="lg:col-span-2 order-2 lg:order-1">
        <EventTypeSideBar 
          selectedType={selectedEventType ?? ""} 
          onSelectType={handleTypeSelect} 
          eventTypes={eventTypes} 
        />
          {paginatedEvents.length === 0 ? (
            <div className="text-center text-gray-500 py-10">
              {filteredEvents.length === 0 ? (
                <div>Không có sự kiện nào phù hợp</div>
              ) : (
                filteredEvents.map((event) => <EventCard key={event.id} event={event} />)
              )}
            </div>
          ) : (
            paginatedEvents.map((event) => (
              <EventCard
                key={event.id}
                event={event}
                onSelect={(selectedEvent) =>
                  navigate(`/event/${selectedEvent.id}`)
                }
              />
            ))
          )}

          {/* Pagination Controls */}
          <div className="flex justify-center space-x-2 mt-4">
            <button
              className="px-3 py-2 bg-indigo-500 hover:bg-indigo-600 text-white rounded-md disabled:opacity-50 flex items-center"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              <ArrowLeft className="mr-2 w-4 h-4" /> Trang trước
            </button>
            {Array.from({ length: totalPages }, (_, index) => index + 1).map(
              (page) => (
                <button
                  key={page}
                  className={`px-4 py-2 rounded-md transition ${
                    page === currentPage
                      ? "bg-indigo-600 text-white"
                      : "bg-gray-200 text-gray-800 hover:bg-indigo-400 hover:text-white"
                  }`}
                  onClick={() => handlePageChange(page)}
                >
                  {page}
                </button>
              ),
            )}
            <button
              className="px-4 py-2 bg-indigo-500 hover:bg-indigo-600 text-white rounded-md disabled:opacity-50 flex items-center"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Trang sau <ArrowRight className="ml-2 w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>

  );
};

export default EventList;
