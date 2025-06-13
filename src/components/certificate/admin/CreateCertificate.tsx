import React, { useState, useRef, useEffect } from "react";
import { UploadCloud, Save, X, Info } from "lucide-react";
import { EventType } from "types/eventTypes";
import { createCertificateTemplate, fetchCertificateTemplateDropdown } from "api/certificateTemplateApi";
import { CreateCertificateTemplatePayload, FieldStyle } from "types/certificateTemplateTypes";
import CertificateFormatFields from "./CertificateFormatFields";

const CreateCertificate = () => {
  const [name, setName] = useState("");
  const [eventType, setEventType] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [fields, setFields] = useState([
    { key: "Tên người dùng", checked: false, x: 50, y: 50, value: "Nguyễn Văn A", color: "#000000", fontSize: 16, bold: false, italic: false },
    { key: "Mã số", checked: false, x: 50, y: 100, value: "123456789", color: "#000000", fontSize: 16, bold: false, italic: false },
    { key: "Đơn vị", checked: false, x: 50, y: 150, value: "Khoa Công nghệ Thông tin", color: "#000000", fontSize: 16, bold: false, italic: false },
    { key: "Tên chương trình", checked: false, x: 50, y: 200, value: "Hội thảo tư vấn và định hướng nghề nghiệp", color: "#000000", fontSize: 16, bold: false, italic: false },
    { key: "Ngày", checked: false, x: 50, y: 250, value: "01", color: "#000000", fontSize: 8, bold: false, italic: false },
    { key: "Tháng", checked: false, x: 100, y: 250, value: "02", color: "#000000", fontSize: 8, bold: false, italic: false },
    { key: "Năm", checked: false, x: 150, y: 250, value: "25", color: "#000000", fontSize: 8, bold: false, italic: false },
    { key: "Số GCN", checked: false, x: 50, y: 300, value: "01", color: "#000000", fontSize: 8, bold: false, italic: false },
  ]);

  const [naturalWidth, setNaturalWidth] = useState<number>(0);
  const [naturalHeight, setNaturalHeight] = useState<number>(0);
  const [displayWidth, setDisplayWidth] = useState<number>(0);
  const [displayHeight, setDisplayHeight] = useState<number>(0);
  const [ratio, setRatio] = useState<number>(1); // hệ số scale (gốc/hiển thị)

  // Lấy dropdown event types
  const [eventTypes, setEventTypes] = useState<EventType[]>([]);
  useEffect(() => {
    (async () => {
      try {
        const { eventTypes } = await fetchCertificateTemplateDropdown();
        setEventTypes(eventTypes);
      } catch (err) {
        console.error("Không lấy được eventTypes", err);
      }
    })();
  }, []);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleRemoveImage = () => {
    setImageFile(null);
    setImagePreview(null);
  };

  const handleFieldCheck = (index: number) => {
    setFields((prev) =>
      prev.map((f, i) => (i === index ? { ...f, checked: !f.checked } : f))
    );
  };

  const handleDrag = (index: number, dx: number, dy: number) => {
    setFields((prev) => {
      const newFields = prev.map((f, i) => 
        i === index ? { ...f, x: f.x + dx, y: f.y + dy } : f
      );
      console.log("Cập nhật tọa độ:", newFields[index]);
      return newFields;
    });
  };

  const handleColorChange = (index: number, color: string) => {
    setFields(prev =>
      prev.map((f, i) => i === index ? { ...f, color } : f)
    );
  };

  const toggleBold = (index: number) => {
    setFields(prev =>
        prev.map((f, i) => i === index ? { ...f, bold: !f.bold } : f)
    );
  };

  const toggleItalic = (index: number) => {
    setFields(prev =>
        prev.map((f, i) => i === index ? { ...f, italic: !f.italic } : f)
    );
  };

  const handleFontSizeChange = (index: number, size: number) => {
    setFields(prev =>
      prev.map((f, i) => i === index ? { ...f, fontSize: size } : f)
    );
  };

  const toBase64 = (file: File): Promise<string> =>
    new Promise((res, rej) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => res(reader.result as string);
      reader.onerror = err => rej(err);
  });

  const handleSubmit = async () => {
    // 1. Validate
    if (!name || !imageFile || !eventType) {
      alert("Vui lòng nhập đầy đủ thông tin trước khi lưu.");
      return;
    }

    try {
      // 2. Chuyển ảnh sang base64
      const background_base64 = await toBase64(imageFile);

      // 3. Build field_positions theo dạng payload
      type FieldKey =
        | "name"
        | "user_id"
        | "unit"
        | "program"
        | "day"
        | "month"
        | "year"
        | "cert_number";

      const keyMap: Record<string, FieldKey> = {
        "tên người dùng": "name",
        "mã số": "user_id",
        "đơn vị": "unit",
        "tên chương trình": "program",
        "ngày": "day",
        "tháng": "month",
        "năm": "year",
        "số gcn": "cert_number",
      };  

      const field_positions: Partial<Record<FieldKey, FieldStyle>> = {};
        fields.forEach((f) => {
          if (f.checked) {
            const key = keyMap[f.key.toLowerCase()];
            if (!key) return;

            // LƯU giá trị x, y, fontSize chưa nhân tỉ lệ (giá trị gốc trên ảnh hiển thị)
            field_positions[key] = {
              checked: f.checked,
              x: f.x,
              y: f.y,
              color: f.color,
              bold: f.bold,
              italic: f.italic,
              fontSize: Math.round(f.fontSize), 
            };
          }
        });

      // 4. Tạo payload
      const payload: CreateCertificateTemplatePayload = {
        name,
        event_type_id: eventType,
        background_base64,
        field_positions,
        display_width: displayWidth,
        display_height: displayHeight,
      };
      
      console.log("naturalWidth:", naturalWidth, "displayWidth:", displayWidth, "naturalHeight:", naturalHeight, "displayHeight:", displayHeight,);
      console.log("Field positions:", field_positions);
      console.log("Payload gửi lên:", payload);
      console.log("fields checked:", fields.filter(f => f.checked));

      // 5. Gọi API tạo mới
      const newTemplate = await createCertificateTemplate(payload);
      console.log("Tạo thành công", newTemplate);

      // 6. Chuyển hướng hoặc reset form
      alert("Tạo mẫu giấy chứng nhận thành công!");
      // ví dụ reset:
      setName("");
      setEventType("");
      setImageFile(null);
      setImagePreview(null);
      setFields((prev) =>
        prev.map((f) => ({ ...f, checked: false })) // uncheck tất cả
      );
      // Nếu muốn reset ratio/size
      setRatio(1);
      setNaturalWidth(0);
      setNaturalHeight(0);
      setDisplayWidth(0);
      setDisplayHeight(0);
    } catch (err) {
      console.error("Lỗi khi tạo mẫu:", err);
      alert("Đã xảy ra lỗi khi lưu. Vui lòng thử lại.");
    }
  };

  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-100 min-h-screen py-10 px-4 flex gap-4 justify-center">
      <div className={`bg-white p-8 rounded-3xl shadow-xl border border-gray-200 ${imagePreview ? 'max-w-xl' : 'max-w-2xl w-full'}`}>
        <h2 className={`${imagePreview ? 'text-2xl' : 'text-3xl'} font-bold text-indigo-800 mt-1 mb-8 text-center`}>Tạo mẫu giấy chứng nhận</h2>

        <div className="mb-5">
          <label className="block text-gray-700 mb-2 font-medium">
            Tên giấy chứng nhận <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            placeholder="Nhập tên mẫu..."
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-300"
          />
        </div>

        <div className="mb-5">
          <label className="block text-gray-700 mb-2 font-medium">
            Loại sự kiện <span className="text-red-500">*</span>
          </label>
          <select
            value={eventType}
            onChange={(e) => setEventType(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-300"
          >
            <option value="">-- Chọn loại sự kiện --</option>
            {eventTypes.map((et) => (
              <option key={et.id} value={et.id}>
                {et.name}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 mb-2 font-medium">
            Tải ảnh chứng nhận <span className="text-red-500">*</span>
          </label>
          <div className="flex items-center gap-4">
            <label
              htmlFor="image-upload"
              className="cursor-pointer flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-all shadow-sm hover:shadow-md"
            >
              <UploadCloud size={18} />
              Tải ảnh lên
            </label>
            <input
              id="image-upload"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />
          </div>

          {imagePreview && (
            <div className="mt-4 relative border rounded-xl overflow-hidden">
              <img
                src={imagePreview}
                alt="Uploaded"
                className="w-full h-auto object-contain"
                onLoad={(e) => {
                  // e.currentTarget chính là <img>
                  const imgEl = e.currentTarget as HTMLImageElement;

                  const natW = imgEl.naturalWidth;
                  const natH = imgEl.naturalHeight;
                  const dispW = imgEl.clientWidth;
                  const dispH = imgEl.clientHeight;

                  setNaturalWidth(natW);
                  setNaturalHeight(natH);
                  setDisplayWidth(dispW);
                  setDisplayHeight(dispH);

                  // Tính tỉ lệ: gốc chia cho hiển thị
                  // Nếu ảnh giữ nguyên tỉ lệ, thì natW/dispW ≈ natH/dispH
                  const scaleRatio = natW / dispW;
                  console.log("onLoad ratio:", scaleRatio);
                  setRatio(scaleRatio);
                }}
              />
              <button
                type="button"
                onClick={handleRemoveImage}
                className="absolute top-4 right-4 bg-red-500 text-white p-2 rounded-full hover:bg-red-600"
              >
                <X className="w-5 h-5" />
              </button>
              {fields.map(
                (field, index) =>
                  field.checked && (
                    <DraggableBox
                      key={index}
                      index={index}
                      field={field}
                      onDrag={handleDrag}
                    />
                  )
              )}
            </div>
          )}
        </div>

        <div className="flex justify-center">
          <button
            onClick={handleSubmit}
            className="flex items-center gap-2 bg-green-600 text-white px-6 py-3 rounded-xl hover:bg-green-700 transition-all shadow-md hover:shadow-lg"
          >
            <Save size={20} />
            Lưu mẫu
          </button>
        </div>
      </div>

      {imagePreview && (
        <CertificateFormatFields
          fields={fields}
          handleFieldCheck={handleFieldCheck}
          handleColorChange={handleColorChange}
          toggleBold={toggleBold}
          toggleItalic={toggleItalic}
          handleFontSizeChange={handleFontSizeChange}
        />
      )}
    </div>
  );
};

const DraggableBox = ({ index, field, onDrag }: any) => {
  const boxRef = useRef<HTMLDivElement>(null);
  const [dragging, setDragging] = useState(false);
  const [origin, setOrigin] = useState({ x: 0, y: 0 });

  const handleMouseDown = (e: React.MouseEvent) => {
    setDragging(true);
    setOrigin({ x: e.clientX, y: e.clientY });
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!dragging) return;
    const dx = e.clientX - origin.x;
    const dy = e.clientY - origin.y;
    onDrag(index, dx, dy);
    setOrigin({ x: e.clientX, y: e.clientY });
  };

  const handleMouseUp = () => setDragging(false);

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [dragging, origin]);

  return (
    <div
      ref={boxRef}
      onMouseDown={handleMouseDown}
      className="absolute px-2 py-1 bg-transparent rounded-md cursor-move text-sm text-gray-800"
      style={{
        left: field.x,
        top: field.y,
        color: field.color,
        fontSize: `${field.fontSize}px`,
        fontWeight: field.bold ? 'bold' : 'normal',
        fontStyle: field.italic ? 'italic' : 'normal',
        pointerEvents: "auto",
        userSelect: "none",
      }}
    >
      {field.value}
    </div>
  );
};

export default CreateCertificate;
