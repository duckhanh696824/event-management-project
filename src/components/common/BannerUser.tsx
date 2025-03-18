import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Calendar, LocateIcon, MapPin } from "lucide-react";
import clsx from "clsx";

const speakers = [
  { 
    name: "Morgan Maxwell", 
    image: "/assets/images/banner/diengia1.png",
    time: {
      dayOfWeek: "Thứ 7",
      date: "21 tháng 3 năm 2025"
    },
    location: "Hội trường E3-05.01"
  },
  { 
    name: "Pedro Fernandes", 
    image: "/assets/images/banner/diengia2.png",
    time: {
      dayOfWeek: "Chủ nhật",
      date: "29 tháng 3 năm 2025"
    },
    location: "Phòng E1-02.10"
  }
];


const BannerUser = () => {
  const [index, setIndex] = useState(0);
  const sectionRef = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % speakers.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting); // Reset trạng thái khi rời khỏi màn hình
      },
      { threshold: 0.3 } // Khi 30% phần tử xuất hiện trong viewport
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <div>
      <section className="relative h-[450px] w-full flex items-center justify-center overflow-hidden bg-cover bg-center" 
          style={{ backgroundImage: `url('/assets/images/banner/nenbanner.png')` }}>
        <AnimatePresence mode="wait">
          {/* Phần main content (hiệu ứng từ dưới lên) */}
          <motion.div
            key={speakers[index].name + "-content"} // Key để trigger animation khi diễn giả đổi
            initial={{ opacity: 0, y: 80 }}
            animate={{ opacity: 1, y: 44 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 1 }}
            className="absolute left-5 top-0 translate-y-14 flex flex-col items-start max-w-3xl py-4 px-8"
          >
            <h1 className="text-yellow-400 text-6xl font-bold leading-tight">EXCLUSIVE SEMINAR</h1>
            <p className="text-white mt-4 text-lg max-w-2xl">
              Don't miss this opportunity to gain valuable insights and grow your business to the next level!
            </p>
            <div className="mt-6 flex items-center space-x-8 text-yellow-400">
              <div className="flex items-center space-x-2">
                <Calendar size={37} />
                <div className="flex flex-col leading-tight">
                  <span className="font-semibold text-lg">{speakers[index].time.dayOfWeek}</span>
                  <span className="text-white text-sm">{speakers[index].time.date}</span>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin size={37} />
                <div className="flex flex-col leading-tight">
                  <span className="font-semibold text-lg">Địa điểm</span>
                  <span className="text-white text-sm">{speakers[index].location}</span>
                </div>
              </div>
            </div>

            {/* Hiệu ứng nhấp nháy cho nút Đăng ký */}
            <motion.button 
              animate={{
                scale: [1, 1.1, 1],  // Tăng rồi giảm
                opacity: [1, 0.5, 1], // Nhấp nháy rõ hơn
              }}
              transition={{
                duration: 1.2,  // Điều chỉnh tốc độ nhấp nháy
                repeat: Infinity, // Lặp vô hạn
                repeatType: "reverse",
              }}
              whileHover={{ scale: 1.2 }} // Khi hover sẽ phóng to hơn bình thường
              whileTap={{ scale: 0.9 }}   // Khi click sẽ thu nhỏ lại
              className="mt-9 bg-yellow-400 text-purple-900 text-lg pl-5 pr-4 pt-3 pb-4 rounded-lg font-bold shadow-lg transition-all hover:bg-yellow-300"
            >
              <span className="flex items-center">
                Đăng ký ngay
                <ArrowRight className="ml-2 mt-1"/>
              </span>
            </motion.button>
          </motion.div>
        </AnimatePresence>
          
        {/* Phần diễn giả (hiệu ứng từ phải qua trái)  */}
        <AnimatePresence mode="wait">
          <motion.div
            key={speakers[index].name}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 1 }}
            className="absolute right-32 -bottom-3 z-10 flex flex-col items-center"
          >
            <img src={speakers[index].image} alt={speakers[index].name} className="h-90" />
            <span   className={clsx(
              "absolute text-gray-900 text-sm font-semibold",
              speakers[index].name === "Morgan Maxwell"
                ? "bottom-[62px] left-[77px]"
                : "bottom-[60px] left-[68px]"
            )}>
              Diễn giả
            </span>
            <div className="absolute bottom-4 px-4 py-2 mt-2 text-purple-900 text-lg font-bold uppercase">
              {speakers[index].name}
            </div>
          </motion.div>
        </AnimatePresence>
      </section>

      <main ref={sectionRef} className="container bg-gray-50 px-4 min-w-full pt-8 pb-10">
        <AnimatePresence>
          {inView && (
            <motion.div
              initial={{ opacity: 0, y: 50 }} // Bắt đầu từ dưới lên
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
              transition={{ duration: 0.6 }}
              className="text-center"
            >
              <h3 className="lg:hidden text-2xl font-bold text-gray-800 mb-3">
                Chào mừng đến IT EVENT
              </h3>
              <h2 className="hidden lg:block text-3xl font-bold text-gray-800 mb-3">
                Chào mừng đến với IT EVENT
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Nơi sẽ cập nhật những sự kiện, cuộc thi, hoạt động mới nhất từ Khoa Công nghệ Thông tin
              </p>
              <div className="w-[70px] h-[5px] bg-indigo-700 rounded-full mx-auto mt-4"></div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}

export default BannerUser;