import React from "react";
import { Calendar, MapPin, BookOpen, Users, Heart, ArrowDownToLine } from "lucide-react";

export interface CertificateCardProps {
    image: string;
    title: string;
    date: string;
    location: string;
    category: "Học thuật" | "Hội thảo" | "Tình nguyện";
  }

const categoryIcons = {
  "Học thuật": <BookOpen className="w-5 h-5 text-blue-500" />, // Icon sách cho Học thuật
  "Hội thảo": <Users className="w-5 h-5 text-green-500" />, // Icon nhóm người cho Hội thảo
  "Tình nguyện": <Heart className="w-5 h-5 text-red-500" />, // Icon trái tim cho Tình nguyện
};

const CertificateCard: React.FC<CertificateCardProps> = ({
  image,
  title,
  date,
  location,
  category,
}) => {
  return (
    <div className="rounded-2xl shadow-lg overflow-hidden w-full">
      <img src={image} alt={title} className="w-full h-45 object-cover" />
      <div className="p-4">
        <h3 className="text-lg font-semibold leading-snug line-clamp-2 min-h-[3.5rem]">{title}</h3>
        <div className="flex items-center text-sm text-gray-600 mt-2">
          <div className="flex items-center">
            <Calendar className="w-4 h-4 mr-1" /> {date}
          </div>
          <div className="ml-[10%] flex items-center">
            <MapPin className="w-4 h-4 mr-1" /> {location}
          </div>
        </div>
        <div className="border-t my-3"></div>
        <div className="flex justify-between items-center text-sm">
          <div className="flex items-center gap-2 text-gray-700">
            {categoryIcons[category]}
            <span>{category}</span>
          </div>
          <button className="flex items-center bg-gradient-to-r from-indigo-600 to-blue-600 text-white pl-2 pr-4 mr-3 py-2 rounded-xl hover:from-indigo-700 hover:to-blue-700 transition-all">
            <ArrowDownToLine className="h-4"/>Tải GCN
          </button>
        </div>
      </div>
    </div>
  );
};

export default CertificateCard;
