import React, { useState, useEffect } from "react";
import {
  createEvent,
  fetchDropdownData,
  uploadEventImage,
} from "api/eventsApi";
import { Event, EventType, Semester, AcademicYear } from "types/eventTypes";
import {
  Camera,
  FileText,
  Calendar,
  Users,
  ChevronLeft,
  Check,
  Upload,
  X,
} from "lucide-react";
import {useNavigate } from "react-router-dom";

interface DropdownData {
  eventTypes: EventType[];
  semesters: Semester[];
  academicYears: AcademicYear[];
}

const CreateEventForm: React.FC = () => {
  const [dropdownData, setDropdownData] = useState<DropdownData>({
    eventTypes: [],
    semesters: [],
    academicYears: [],
  });
  const navigate = useNavigate();

  const initialFormData = {
    title: "",
    description: "",
    content: "",
    event_type_id: "",
    semester_id: "",
    academic_year_id: "",
    start_time: "",
    end_time: "",
    site: "",
    image: "",
    is_online: false,
    max_participants: 0,
    registration_deadline: "",
    status: 1,
  };

  const [formData, setFormData] = useState(initialFormData);

  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [is_online, setIsOnline] = useState<boolean>(false);

  const resetForm = () => {
    setFormData(initialFormData);
    setImagePreview(null); // Nếu cần reset luôn ảnh xem trước
  };

  useEffect(() => {
    const loadDropdownData = async () => {
      try {
        const data = await fetchDropdownData();
        setDropdownData(data);
      } catch (error) {
        console.error("Error loading dropdown data:", error);
        alert("Không thể tải dữ liệu. Vui lòng thử lại sau!");
      }
    };
    loadDropdownData();
  }, []);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
      ...(name === "is_online" && { site: "" }), // Reset site when changing online status
    }));
  };

 

  const handleRemoveImage = () => {
    setImagePreview(null);
    const fileInput = document.getElementById("fileInput") as HTMLInputElement;
    if (fileInput) fileInput.value = "";
  };

  const validateForm = (): boolean => {
    const requiredFields: (keyof Event)[] = [
      "title",
      "description",
      "start_time",
      "end_time",
      "event_type_id",
      "semester_id",
      "academic_year_id",
      "site",
    ];

    for (let field of requiredFields) {
      if (!formData[field as keyof typeof formData]) {
        alert(`Vui lòng điền: ${field}`);
        return false;
      }
    }

    const startTime = new Date(formData.start_time);
    const endTime = new Date(formData.end_time);

    if (endTime <= startTime) {
      alert("Thời gian kết thúc phải sau thời gian bắt đầu");
      return false;
    }

    if (is_online) {
      const urlPattern =
        /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;
      if (!urlPattern.test(formData.site)) {
        alert("Vui lòng nhập đúng định dạng URL cho địa điểm online");
        return false;
      }
    }

    return true;
  };

  return (
    <div className="bg-background min-h-screen p-5 max-h-[500px] overflow-y-auto">
      <div className="bg-white w-full max-w-4xl rounded-3xl shadow-lg p-10">
        {/* Form Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-indigo-800 mb-4">
            Tạo mới sự kiện
          </h2>
          <p className="text-gray-500">
            Điền thông tin chi tiết để tạo một sự kiện mới
          </p>
        </div>

        <form >
          {/* Basic Information Section */}
          <div className="bg-gray-50 rounded-2xl p-6 mb-8">
            <div className="flex items-center text-indigo-800 mb-6 gap-2">
              <FileText className="w-6 h-6" />
              <h3 className="text-xl font-semibold">Thông tin cơ bản</h3>
            </div>

            <div className="space-y-6">
              <div>
                <label
                  htmlFor="title"
                  className="block mb-2 font-medium text-gray-700"
                >
                  Tên sự kiện <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  required
                  onChange={handleInputChange}
                  placeholder="Nhập tên sự kiện"
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                />
              </div>

              <div>
                <label
                  htmlFor="description"
                  className="block mb-2 font-medium text-gray-700"
                >
                  Mô tả <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="description"
                  name="description"
                  required
                  onChange={handleInputChange}
                  placeholder="Mô tả ngắn gọn về sự kiện"
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl min-h-[120px] focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 "
                />
              </div>

              <div>
                <label
                  htmlFor="content"
                  className="block mb-2 font-medium text-gray-700"
                >
                  Nội dung chi tiết
                </label>
                <textarea
                  id="content"
                  name="content"
                  placeholder="Nội dung chi tiết của sự kiện"
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl min-h-[120px] focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 resize-none"
                />
              </div>
            </div>
          </div>

          {/* Time and Location Section */}
          <div className="bg-gray-50 rounded-2xl p-6 mb-8">
            <div className="flex items-center text-indigo-800 mb-6 gap-2">
              <Calendar className="w-6 h-6" />
              <h3 className="text-xl font-semibold">Thời gian và địa điểm</h3>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <label
                  htmlFor="startTime"
                  className="block mb-2 font-medium text-gray-700"
                >
                  Thời gian bắt đầu <span className="text-red-500">*</span>
                </label>
                <input
                  type="datetime-local"
                  id="startTime"
                  name="start_time"
                 
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                />
              </div>
              <div>
                <label
                  htmlFor="end_time"
                  className="block mb-2 font-medium text-gray-700"
                >
                  Thời gian kết thúc <span className="text-red-500">*</span>
                </label>
                <input
                  type="datetime-local"
                  id="end_time"
                  name="end_time"
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                />
              </div>
            </div>

            <div className="flex items-center space-x-4 mb-6">
              <label className="flex-grow font-medium text-gray-700">
                Hình thức tổ chức
              </label>
              <div className="flex items-center space-x-2">
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                  />
                  <div className="w-14 h-7 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-green-600"></div>
                </label>
              </div>
            </div>

            <div>
              <label
                htmlFor="site"
                className="block mb-2 font-medium text-gray-700"
              >
                Địa điểm/Link tham gia <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="site"
                name="site"
              
                placeholder="Nhập địa điểm tổ chức"
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
              />
            </div>
          </div>

          {/* Registration Section */}
          <div className="bg-gray-50 rounded-2xl p-6 mb-8">
            <div className="flex items-center text-indigo-800 mb-6 gap-2">
              <Users className="w-6 h-6" />
              <h3 className="text-xl font-semibold">Thông tin đăng ký</h3>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label
                  htmlFor="maxParticipants"
                  className="block mb-2 font-medium text-gray-700"
                >
                  Số lượng tham gia tối đa
                </label>
                <input
                  type="number"
                  id="maxParticipants"
                  name="maxParticipants"
                  min="0"
                
                  placeholder="Không giới hạn"
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                />
              </div>
              <div>
                <label
                  htmlFor="registration_deadline"
                  className="block mb-2 font-medium text-gray-700"
                >
                  Hạn đăng ký
                </label>
                <input
                  type="datetime-local"
                  id="registration_deadline"
                  name="registration_deadline"
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                />
              </div>
            </div>
          </div>

          {/* Classification Section */}
          <div className="bg-gray-50 rounded-2xl p-6 mb-8">
            <div className="flex items-center text-indigo-800 mb-6 gap-2">
              <Camera className="w-6 h-6" />
              <h3 className="text-xl font-semibold">Phân loại</h3>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {/* Event Type Dropdown */}
              <div>
                <label
                  htmlFor="eventTypeId"
                  className="block mb-2 font-medium text-gray-700"
                >
                  Loại sự kiện <span className="text-red-500">*</span>
                </label>
                <select
                  id="eventTypeId"
                  name="event_type_id"
                 
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                >
                  <option value="">Chọn loại sự kiện</option>
                
                </select>
              </div>

              {/* Semester Dropdown */}
              <div>
                <label
                  htmlFor="semesterId"
                  className="block mb-2 font-medium text-gray-700"
                >
                  Học kỳ <span className="text-red-500">*</span>
                </label>
                <select
                  id="semesterId"
                  name="semester_id"
                  required
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                >
                
                </select>
              </div>

              {/* Academic Year Dropdown */}
              <div>
                <label
                  htmlFor="academicYearId"
                  className="block mb-2 font-medium text-gray-700"
                >
                  Năm học <span className="text-red-500">*</span>
                </label>
                <select
                  id="academicYearId"
                  name="academic_year_id"
                
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                >
                 
                </select>
              </div>
            </div>

            {/* Image Upload Section */}
            <div className="mt-6">
              <div
                className={`border-2 border-dashed rounded-xl p-6 text-center 
      ${imagePreview ? "border-indigo-500" : "border-gray-300"} 
      relative h-72 flex flex-col justify-center items-center`}
              >
                {!imagePreview ? (
                  <>
                    <Upload className="w-12 h-12 text-indigo-500 mb-4" />
                    <p className="text-gray-500 mb-4">
                      Kéo và thả ảnh vào đây hoặc
                    </p>
                    <label
                      htmlFor="fileInput"
                      className="bg-indigo-500 text-white px-4 py-2 rounded-lg cursor-pointer hover:bg-indigo-600"
                    >
                      Chọn ảnh từ máy tính
                    </label>
                    <input
                      type="file"
                      id="fileInput"
                      accept="image/*"
                      className="hidden"
                    />
                  </>
                ) : (
                  <div className="relative w-full h-full">
                    <img
                      src={imagePreview}
                      alt="Uploaded"
                      className="w-full h-full object-cover rounded-xl"
                    />
                    <button
                      type="button"
                      onClick={handleRemoveImage}
                      className="absolute top-4 right-4 bg-red-500 text-white p-2 rounded-full hover:bg-red-600"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                )}
              </div>
            </div>
            {/* Form Action Buttons */}
            <div className="flex justify-between items-center mt-10">
              <button
                type="button"
                onClick={() => navigate(-1)}
                className="flex items-center text-gray-600 hover:text-indigo-800"
              >
                <ChevronLeft className="mr-2" /> Quay lại
              </button>
              <button
                type="submit"
                className="bg-indigo-500 text-white px-6 py-3 rounded-xl flex items-center hover:bg-indigo-600"
              >
                <Check className="mr-2" /> Tạo sự kiện
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateEventForm;
