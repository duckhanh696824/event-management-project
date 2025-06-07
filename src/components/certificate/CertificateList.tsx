import React, { useState } from "react";
import CertificateCard, { CertificateCardProps } from "./CertificateCard";

const certificates: CertificateCardProps[] = [
    {
      image: "https://scontent.fsgn8-3.fna.fbcdn.net/v/t39.30808-6/315744322_624485642793556_4877374450601131861_n.png?_nc_cat=104&ccb=1-7&_nc_sid=127cfc&_nc_eui2=AeGSrKz8bGWezkislIjEc7SEiFyEkD8MxG-IXISQPwzEb3mZfxXhqhKJjIqRmpQIEJzoQrjXgTdOX4rwgjELJ_vX&_nc_ohc=hiva8k-sx8oQ7kNvgGeTdL_&_nc_oc=Adkd6Wg4DY_tfRTv4jLkepKwmDo87mDfDbMna1yTWCFnRQU5bcHGhV8rM20wVP-zeOYc-cvsa-XEcR1qiIFNpryS&_nc_zt=23&_nc_ht=scontent.fsgn8-3.fna&_nc_gid=7W2OGm8A8UGV4QUDGnVdig&oh=00_AYHZQynfw7p4OIWEQ7_jzavehlrR9hLaZwnjT3q-s-YszA&oe=67F17EA7",
      title: "LỄ TUYÊN DƯƠNG SINH VIÊN TIÊU BIỂU",
      date: "20/02/2025",
      location: "Hà Nội",
      category: "Hội thảo",
    },
    {
      image: "https://scontent.fsgn8-3.fna.fbcdn.net/v/t39.30808-6/481249947_943348107987062_2086796367162339684_n.jpg?stp=dst-jpg_s960x960_tt6&_nc_cat=100&ccb=1-7&_nc_sid=833d8c&_nc_eui2=AeFC_zms2gQmPSS2nSBUjcxi6iWGoY5Y69jqJYahjljr2HO1KggdrodF-mgrUHR4_SA7-0jWVS4TxFy5EbZRnjMF&_nc_ohc=WyYiTSEgMDEQ7kNvgFapkIK&_nc_oc=AdkC6LFpj3luX_q587lLAA3c-eq1lsvKvDDcG3DA_deQVHO_wjfs4NKY5MQcqNik6crKY2gJTfMAgr1UsmSkwtsB&_nc_zt=23&_nc_ht=scontent.fsgn8-3.fna&_nc_gid=T26hQxl22L9JmLaYSmJXkA&oh=00_AYFM5lVCWdzNyo0a6nWWSHY0n7d970A3_lnSvn8R_kgGSw&oe=67F16ECA",
      title: "Cuộc thi Ươm mầm tài năng 2024",
      date: "15/03/2025",
      location: "TP.HCM",
      category: "Học thuật",
    },
    {
      image: "https://scontent.fsgn8-3.fna.fbcdn.net/v/t39.30808-6/476234764_1116682133573902_4987436013336087825_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=833d8c&_nc_eui2=AeGLelpEN0jFdUVNAIN43XL-_kAS5KOeFk3-QBLko54WTYD8WJ9LBJxx1YQY22lqsJ2HdXTOv6_EOZwP1EfNSGdv&_nc_ohc=GGMrrKZSPigQ7kNvgEOqzLV&_nc_oc=AdnpQF_Ict52K1KMk1d6uBVcBtD3yo4UGKVZkT8YWUy8V5w-Z4WWaVDVzyZhItOpb519GKeCIxP2zAsykLmSk7RR&_nc_zt=23&_nc_ht=scontent.fsgn8-3.fna&_nc_gid=0VaMuBdhobi4ei-9HUqxKA&oh=00_AYEg6hgfQICzA-X2u1zKQfvGAaDwn6BZB93JBBmLkwcCyA&oe=67F165DC",
      title: "Chương trình Tình nguyện Mùa hè",
      date: "10/06/2025",
      location: "Đà Nẵng",
      category: "Tình nguyện",
    },
    {
      image: "https://scontent.fsgn8-4.fna.fbcdn.net/v/t39.30808-6/479968977_8850807845031506_956860844927005335_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=127cfc&_nc_eui2=AeF5Lz21ElOVQW1G7ygjnYJ8-odpcUa45rX6h2lxRrjmtXjclO7NfVisbZxoFSio0vFM_jPqEvYQzeYFTpRfzhxM&_nc_ohc=5grjYiiLTeoQ7kNvgHg0Jx9&_nc_oc=AdkR3BO6xXqFiCJXSW5_mo75a58B2kk5l117332mOv-n5GQsUSVr6hWQvD3IqWM7BkFbvAwI3qc-K9bTLsSMT3Hy&_nc_zt=23&_nc_ht=scontent.fsgn8-4.fna&_nc_gid=hD0ay297_7lH3BxZNgvHyQ&oh=00_AYHjAg7lPfrZaDCtF3OfNo-D2yopUAfkrtCXSEiq3m3S5w&oe=67F19B75",
      title: "Hội thảo Phát triển ứng dụng di động",
      date: "05/07/2025",
      location: "Cần Thơ",
      category: "Hội thảo",
    },
    {
      image: "https://scontent.fsgn8-4.fna.fbcdn.net/v/t39.30808-6/313406365_5222539644525029_6339509957832188598_n.png?_nc_cat=107&ccb=1-7&_nc_sid=127cfc&_nc_eui2=AeEWcnMcE6hzfaVPZz0HhK_OeE2EJn7xPhB4TYQmfvE-EMGiXhsW4muKBlBrIHh51bidcHPIUBvmwUxdzj3bcjUY&_nc_ohc=E8MHs6PZ1v4Q7kNvgFokd_R&_nc_oc=AdluSvLat-O4RVubMTBIefeSvLPnaXaztlzXJGTkPfgxaNIMQJoPtc9GLAP0LFxdLmSprg52ymhNTxHutuWEHzZF&_nc_zt=23&_nc_ht=scontent.fsgn8-4.fna&_nc_gid=2AXKQ17zHGKI9RgJEqpqvA&oh=00_AYGQTGGQn201ul52kuruUSi9h4aazOD49oKsaMWfrkWbhw&oe=67F19559",
      title: "Khóa học Data Science",
      date: "12/08/2025",
      location: "Hà Nội",
      category: "Học thuật",
    },
  ];
  

  const CertificateList: React.FC = () => {
    const [search, setSearch] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [category, setCategory] = useState("");
  
    const filteredCertificates = certificates.filter(cert => {
      return (
        (search === "" || cert.title.toLowerCase().includes(search.toLowerCase())) &&
        (startDate === "" || new Date(cert.date) >= new Date(startDate)) &&
        (endDate === "" || new Date(cert.date) <= new Date(endDate)) &&
        (category === "" || cert.category === category)
      );
    });

  return (
<div className="p-6 md:p-10 bg-gray-50 rounded-xl shadow-md">
  <div className="mb-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
    <input 
      type="text" 
      placeholder="🔍 Tìm kiếm sự kiện..." 
      value={search} 
      onChange={(e) => setSearch(e.target.value)}
      className="p-3 border border-gray-300 rounded-lg w-full focus:ring-2 focus:ring-blue-500 focus:outline-none placeholder-gray-500"
    />
    <input 
      type="date" 
      value={startDate} 
      onChange={(e) => setStartDate(e.target.value)}
      className="p-3 border border-gray-300 rounded-lg w-full focus:ring-2 focus:ring-blue-500 focus:outline-none"
    />
    <input 
      type="date" 
      value={endDate} 
      onChange={(e) => setEndDate(e.target.value)}
      className="p-3 border border-gray-300 rounded-lg w-full focus:ring-2 focus:ring-blue-500 focus:outline-none"
    />
    <select 
      value={category} 
      onChange={(e) => setCategory(e.target.value)}
      className="p-3 border border-gray-300 rounded-lg w-full focus:ring-2 focus:ring-blue-500 focus:outline-none text-gray-600"
    >
      <option value="">🗂️ Tất cả loại sự kiện</option>
      <option value="Hội thảo">🎤 Hội thảo</option>
      <option value="Học thuật">📚 Học thuật</option>
      <option value="Tình nguyện">🤝 Tình nguyện</option>
    </select>
  </div>

  {/* Danh sách giấy chứng nhận */}    
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
    {filteredCertificates.map((cert, index) => (
      <CertificateCard key={index} {...cert} />
    ))}
  </div>
</div>

  );
};

export default CertificateList;