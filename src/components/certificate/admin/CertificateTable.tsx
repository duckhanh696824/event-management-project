import React, { useEffect, useState } from "react";
import { Pencil, Trash2, Plus, ChevronRight, ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { CertificateTemplate } from "types/certificateTemplateTypes";
import { EventType } from "types/eventTypes";
import { getAllEventTypes } from "api/eventTypeApi";
import { deleteCertificateTemplate, fetchCertificateTemplates } from "api/certificateTemplateApi";

const CertificateTable = () => {
  const navigate = useNavigate();

  // Nguyên bản data từ API
  const [certificates, setCertificates] = useState<CertificateTemplate[]>([]);
  const [eventTypes, setEventTypes] = useState<EventType[]>([]);

  // Trạng thái UI
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  const certificatesPerPage = 5;

  // 1. Load certificate templates
  useEffect(() => {
    (async () => {
      try {
        const data = await fetchCertificateTemplates();
        setCertificates(data);
      } catch (e) {
        console.error("Lỗi khi load certificate templates", e);
      }
    })();
  }, []);

  // 2. Load event types
  useEffect(() => {
    (async () => {
      try {
        const res = await getAllEventTypes();
        if (res.statusCode === 200) {
          setEventTypes(res.data);
        } else {
          console.error("Lỗi fetch event types", res);
        }
      } catch (e) {
        console.error("API error fetchEventTypes", e);
      }
    })();
  }, []);

  // 3. enrich certificates với typeName
  const enrichedCertificates = certificates.map((cert) => ({
    ...cert,
    typeName:
      eventTypes.find((et) => et.id === cert.event_type_id)?.name || "– Chưa xác định –",
  }));

  // 4. Filter, sort, paginate
  const filtered = enrichedCertificates.filter((c) =>
    c.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sorted = filtered.sort((a, b) =>
    sortOrder === "asc"
      ? a.typeName.localeCompare(b.typeName)
      : b.typeName.localeCompare(a.typeName)
  );

  const totalPages = Math.ceil(sorted.length / certificatesPerPage);
  const startIndex = (currentPage - 1) * certificatesPerPage;
  const paginated = sorted.slice(startIndex, startIndex + certificatesPerPage);

  // Handlers
  const handleAdd = () => navigate("/admin/create-certificate-template");
  const handleEdit = (id: string) => navigate(`/admin/update-certificate-template/${id}`);
  const handleDelete = async (id: string) => {
    if (window.confirm("Bạn có chắc muốn xóa mẫu này?")) {
      await deleteCertificateTemplate(id);
      setCertificates(certificates.filter((c) => c.id !== id));
    }
  };
  const toggleSort = () => setSortOrder((o) => (o === "asc" ? "desc" : "asc"));

  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-100 min-h-screen py-10 px-7">
      <div className="max-w-6xl mx-auto">
        <header className="text-center mb-9">
          <h1 className="text-4xl font-bold text-indigo-800 mb-2">Danh sách mẫu giấy chứng nhận</h1>
          <p className="text-gray-600">Quản lý các mẫu chứng nhận cho sự kiện, hoạt động</p>
        </header>

        <div className="flex justify-end items-center gap-3 mb-3">
          <input
            type="text"
            placeholder="Tìm theo tên..."
            className="border border-gray-300 rounded-md px-3 py-2 w-64 focus:outline-none focus:ring-2 focus:ring-indigo-300"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button
            onClick={handleAdd}
            className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-all shadow-sm hover:shadow-md"
          >
            <Plus size={18} />
            Thêm mẫu
          </button>
        </div>

        <section className="bg-white shadow-2xl rounded-3xl overflow-hidden border border-slate-200 mt-10">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-gray-700">
              <thead className="text-indigo-800 uppercase text-sm bg-gradient-to-r from-indigo-50 to-white">
                <tr className="font-bold">
                  <th className="px-6 py-7 text-center tracking-wider">STT</th>
                  <th className="px-6 py-7 text-left tracking-wider">Tên giấy chứng nhận</th>
                  <th
                    className="px-6 py-7 text-center tracking-wider cursor-pointer hover:underline"
                    onClick={toggleSort}
                    title="Click để sắp xếp theo loại sự kiện"
                  >
                    Loại sự kiện {sortOrder === "asc" ? "▲" : "▼"}
                  </th>
                  <th className="px-6 py-7 text-center tracking-wider">Hành động</th>
                </tr>
              </thead>
              <tbody>
                {paginated.length > 0 ? (
                  paginated.map((cert, index) => (
                    <tr key={cert.id} className="border-b hover:bg-indigo-50 transition group">
                      <td className="px-6 py-4 text-center">{startIndex + index + 1}</td>
                      <td className="px-6 py-4 font-medium group-hover:text-indigo-700 transition">
                        {cert.name}
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span className="px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                           {cert.typeName} 
                        </span>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <div className="flex justify-center space-x-2">
                          <button
                            onClick={() => handleEdit(cert.id)}
                            className="text-green-500 hover:text-green-700 p-2 rounded-full hover:bg-green-100 transition-transform hover:scale-110"
                            title="Chỉnh sửa"
                          >
                            <Pencil size={18} />
                          </button>
                          <button
                            onClick={() => handleDelete(cert.id)}
                            className="text-red-500 hover:text-red-700 p-2 rounded-full hover:bg-red-100 transition-transform hover:scale-110"
                            title="Xoá"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={4} className="text-center py-6 text-gray-500 italic">
                      Không tìm thấy giấy chứng nhận phù hợp.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Phân trang */}
          <div className="flex justify-between items-center p-6 bg-gradient-to-r from-indigo-50 to-white border-t">
            <span className="text-sm text-slate-600">
              Hiển thị {startIndex + 1} -{" "}
              {Math.min(startIndex + certificatesPerPage, sorted.length)} trên tổng số{" "}
              {sorted.length} mẫu
            </span>
            <div className="flex space-x-2">
              <button
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="px-4 py-1 bg-white text-slate-600 rounded-lg border border-slate-300 hover:bg-indigo-50 disabled:opacity-50 transition-all shadow-sm hover:shadow-md"
              >
                <ChevronLeft size={20} />
              </button>
              <button
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="px-4 py-1 bg-white text-slate-600 rounded-lg border border-slate-300 hover:bg-indigo-50 disabled:opacity-50 transition-all shadow-sm hover:shadow-md"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default CertificateTable;
