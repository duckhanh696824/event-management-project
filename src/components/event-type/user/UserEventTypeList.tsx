import { ChevronRight } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { Swiper as SwiperType } from "swiper";
import { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import "swiper/css";
import { getAllEventTypes } from "api/eventTypeApi";

const defaultImage =
  "https://file1.hutech.edu.vn/file/editor/homepage1/Phoi%20canh%20co%20so%20Hutech_co%20so%20DBP%20%20.jpg";

const UserEventTypeList = () => {
  const swiperRef = useRef<SwiperType | null>(null);
  const navigate = useNavigate(); // Dùng để chuyển trang
  const [eventTypes, setEventTypes] = useState<{ id: number; title: string; img: string }[]>([]);

  useEffect(() => {
    const fetchEventTypes = async () => {
      try {
        const response = await getAllEventTypes();
        if (response && response.data && Array.isArray(response.data)) {
          const updatedEventTypes = response.data.map((event) => ({
            id: Number(event.id), // Lưu cả id để lọc dữ liệu
            title: event.name,
            img: defaultImage,
          }));
          setEventTypes(updatedEventTypes);
        }
      } catch (error) {
        console.error("Lỗi khi lấy loại sự kiện:", error);
      }
    };

    fetchEventTypes();
  }, []);

  // Chuyển hướng đến trang /events và truyền eventTypeId qua query params
  const handleSelectType = useCallback((eventTypeId: number) => {
    navigate(`/events?eventTypeId=${eventTypeId.toString()}`); // Chuyển ID thành string
  }, [navigate]);
  
  return (
    <section className="py-5 mb-10 flex justify-center w-full"> 
      <div className="container text-center"> 
        <div className="flex justify-between items-center mb-10 px-8">
          <h2 className="text-3xl font-bold">Loại sự kiện</h2>
          <div className="flex items-center space-x-2">
            <a 
              href="/events" 
              className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-indigo-700"
            >
              Xem tất cả
            </a>
            <button 
              className="bg-gray-200 p-2 rounded-full hover:bg-gray-300"
              onClick={() => swiperRef.current?.slideNext()}
            >
              <ChevronRight className="w-5 h-5 text-indigo-700" />
            </button>
          </div>
        </div>
        
        <Swiper
          spaceBetween={15}
          slidesPerView={5}
          loop={true}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          modules={[Autoplay]}
          onSwiper={(swiper: SwiperType) => (swiperRef.current = swiper)}
        >
          {eventTypes.map((category) => (
            <SwiperSlide key={category.id} className="text-center">
              <button
                onClick={() => handleSelectType(category.id)}
                className="block focus:outline-none"
              >
                <img
                  src={category.img}
                  alt={category.title}
                  className="rounded-full w-[168px] h-[168px] mx-auto"
                />
                <h4 className="text-lg font-medium mt-3">{category.title}</h4>
              </button>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default UserEventTypeList;
