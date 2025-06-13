// import React from "react";
// import { Calendar, MapPin, BookOpen, Users, Heart, ArrowDownToLine } from "lucide-react";

// export interface CertificateCardProps {
//     image: string;
//     title: string;
//     date: string;
//     location: string;
//     category: "Học thuật" | "Hội thảo" | "Tình nguyện";
//   }

// const categoryIcons = {
//   "Học thuật": <BookOpen className="w-5 h-5 text-blue-500" />, // Icon sách cho Học thuật
//   "Hội thảo": <Users className="w-5 h-5 text-green-500" />, // Icon nhóm người cho Hội thảo
//   "Tình nguyện": <Heart className="w-5 h-5 text-red-500" />, // Icon trái tim cho Tình nguyện
// };

// const CertificateCard: React.FC<CertificateCardProps> = ({
//   image,
//   title,
//   date,
//   location,
//   category,
// }) => {
//   return (
//     <div className="rounded-2xl shadow-lg overflow-hidden w-full">
//       <img src={image} alt={title} className="w-full h-45 object-cover" />
//       <div className="p-4">
//         <h3 className="text-lg font-semibold leading-snug line-clamp-2 min-h-[3.5rem]">{title}</h3>
//         <div className="flex items-center text-sm text-gray-600 mt-2">
//           <div className="flex items-center">
//             <Calendar className="w-4 h-4 mr-1" /> {date}
//           </div>
//           <div className="ml-[10%] flex items-center">
//             <MapPin className="w-4 h-4 mr-1" /> {location}
//           </div>
//         </div>
//         <div className="border-t my-3"></div>
//         <div className="flex justify-between items-center text-sm">
//           <div className="flex items-center gap-2 text-gray-700">
//             {categoryIcons[category]}
//             <span>{category}</span>
//           </div>
//           <button className="flex items-center bg-gradient-to-r from-indigo-600 to-blue-600 text-white pl-2 pr-4 mr-3 py-2 rounded-xl hover:from-indigo-700 hover:to-blue-700 transition-all">
//             <ArrowDownToLine className="h-4"/>Tải GCN
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CertificateCard;

import React, { useState } from "react";
import { Calendar, MapPin, BookOpen, Users, Heart, ArrowDownToLine, Tag } from "lucide-react";
import { Link } from "react-router-dom";

export interface CertificateCardProps {
  id: number; 
  image: string;
  title: string;
  date: string;
  location: string;
  category: string;       // Vẫn giữ tên category nhưng không dùng để chọn style thẳng
  index: number;          // Thêm index để chọn style theo kiểu xoay vòng
}

const styles = [
  {
    color: "from-blue-600 to-indigo-800",
    bgPattern:
      "bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.1)_0%,transparent_70%)]",
    borderAccent: "border-blue-400",
    textColor: "text-blue-700",
    lightGlow: "shadow-blue-400/20",
  },
  {
    color: "from-emerald-600 to-teal-800",
    bgPattern:
      "bg-[radial-gradient(circle_at_center,rgba(16,185,129,0.1)_0%,transparent_70%)]",
    borderAccent: "border-emerald-400",
    textColor: "text-emerald-700",
    lightGlow: "shadow-emerald-400/20",
  },
  {
    color: "from-rose-600 to-red-800",
    bgPattern:
      "bg-[radial-gradient(circle_at_center,rgba(244,63,94,0.1)_0%,transparent_70%)]",
    borderAccent: "border-rose-400",
    textColor: "text-rose-700",
    lightGlow: "shadow-rose-400/20",
  },
];

const CertificateCard: React.FC<CertificateCardProps> = ({
  id,
  image,
  title,
  date,
  location,
  category,
  index,
  }) => {
  const [isHovering, setIsHovering] = useState(false);

  // Chọn style dựa vào index (xoay vòng qua 3 phần tử trong mảng styles)
  const style = styles[index % styles.length];
  const { color, bgPattern, borderAccent, textColor, lightGlow } = style;

  return (
    <Link to={`/certificate-detail/${id}`} className="block">
      <div 
        // onClick={onClick}
        className={`group relative overflow-hidden bg-white transition-all duration-500 
          ${isHovering ? "translate-y-0 scale-[1.01]" : "translate-y-0 scale-100"}
          rounded-2xl border border-gray-100 shadow-lg ${lightGlow}
          hover:shadow-2xl cursor-pointer`}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        {/* Decorative elements */}
        <div
          className={`absolute -right-6 -top-6 h-24 w-24 rounded-full bg-gradient-to-br ${color} opacity-20 blur-2xl transition-all duration-500 ${
            isHovering ? "scale-150" : "scale-100"
          }`}
        ></div>
        <div
          className={`absolute -left-6 -bottom-6 h-24 w-24 rounded-full bg-gradient-to-tr ${color} opacity-20 blur-2xl transition-all duration-500 ${
            isHovering ? "scale-150" : "scale-100"
          }`}
        ></div>
        
        {/* Category Badge */}
        <div
          className={`absolute left-4 top-4 z-10 flex items-center gap-2 rounded-full 
            border border-white/30 bg-white/80 backdrop-blur-sm px-3 py-1.5 
            text-sm font-semibold ${textColor} shadow-lg`}
        >
          <span
            className={`flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-r ${color} text-white`}
          >
            <Tag className="w-5 h-5" />
          </span>
          <span>{category}</span>
        </div>
        
        {/* Image with creative overlay */}
        <div className="relative h-52 overflow-hidden">
          <div className={`absolute inset-0 z-10 ${bgPattern}`}></div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent z-10"></div>
          <img 
            src={image} 
            alt={title} 
            className={`h-full w-full object-cover transition-all duration-700 ease-in-out
              ${isHovering ? "scale-110 filter saturate-[1.2]" : "scale-100 filter saturate-100"}`}
          />
          
          {/* Location badge on the image */}
          <div className="absolute bottom-4 left-4 z-20 flex items-center gap-2">
            <div className="flex items-center rounded-md bg-white/90 px-2.5 py-1 text-sm font-medium text-gray-800 shadow-sm backdrop-blur-sm">
              <MapPin className="mr-1 h-4 w-4" />
              {location}
            </div>
            
            <div className="flex items-center rounded-md bg-white/90 px-2.5 py-1 text-sm font-medium text-gray-800 shadow-sm backdrop-blur-sm">
              <Calendar className="mr-1 h-4 w-4" />
              {date}
            </div>
          </div>
        </div>
        
        {/* Content with better typography */}
        <div className="p-5">
          <h3 className={`mb-4 font-bold uppercase leading-tight tracking-tight transition-all duration-300
            ${isHovering ? "text-2xl" : "text-xl"} min-h-[3.5rem] line-clamp-2`}>{title}</h3>
          
          {/* Animated divider */}
          <div className={`h-0.5 w-16 bg-gradient-to-r ${color} rounded transition-all duration-500 mb-4
            ${isHovering ? "w-24" : "w-16"}`}></div>

          {/* Download button */}
          <div className="mt-2">
            <button className={`group relative flex w-full items-center justify-center overflow-hidden 
              rounded-xl border-t border-white/20 bg-gradient-to-r ${color} p-3.5 
              text-white shadow-lg transition-all duration-300 hover:shadow-xl`}>
              
              {/* Button animation effects */}
              <div className="absolute inset-0 w-0 bg-white/20 transition-all duration-300 ease-out group-hover:w-full"></div>
              <div className={`absolute -inset-1 -z-10 rounded-xl bg-gradient-to-r ${color} opacity-0 blur transition-all duration-300 group-hover:opacity-50`}></div>
              
              <ArrowDownToLine className="mr-2 h-5 w-5" />
              <span className="font-medium">Tải Giấy Chứng Nhận</span>
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CertificateCard;

