import React, { useState, useRef, useEffect } from "react";
import { UploadCloud, Save, X, Info } from "lucide-react";
import { EventType } from "types/eventTypes";
import {
  getCertificateTemplateById,
  updateCertificateTemplate,
  fetchCertificateTemplateDropdown,
} from "api/certificateTemplateApi";
import { CertificateTemplate_Update, CreateCertificateTemplatePayload, FieldStyle } from "types/certificateTemplateTypes";
import CertificateFormatFields from "./CertificateFormatFields";
import { useNavigate, useParams } from "react-router-dom";

const UpdateCertificate: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // ----- State chính để binding form -----
  const [name, setName] = useState<string>("");
  const [eventType, setEventType] = useState<string>("");

  // Background: có thể lưu File mới hoặc thể hiện preview từ base64 đã load
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const FIELDS_DEFAULTS = [
  { key: "Tên người dùng", checked: false, x: 50, y: 50, value: "Nguyễn Văn A", color: "#000000", fontSize: 16, bold: false, italic: false },
  { key: "Mã số", checked: false, x: 50, y: 100, value: "123456789", color: "#000000", fontSize: 16, bold: false, italic: false },
  { key: "Đơn vị", checked: false, x: 50, y: 150, value: "Khoa Công nghệ Thông tin", color: "#000000", fontSize: 16, bold: false, italic: false },
  { key: "Tên chương trình", checked: false, x: 50, y: 200, value: "Hội thảo tư vấn và định hướng nghề nghiệp", color: "#000000", fontSize: 16, bold: false, italic: false },
  { key: "Ngày", checked: false, x: 50, y: 250, value: "01", color: "#000000", fontSize: 8, bold: false, italic: false },
  { key: "Tháng", checked: false, x: 100, y: 250, value: "02", color: "#000000", fontSize: 8, bold: false, italic: false },
  { key: "Năm", checked: false, x: 150, y: 250, value: "25", color: "#000000", fontSize: 8, bold: false, italic: false },
  { key: "Số GCN", checked: false, x: 50, y: 300, value: "01", color: "#000000", fontSize: 8, bold: false, italic: false },
];
//   const [fields, setFields] = useState<
//     {
//       key: string;
//       checked: boolean;
//       x: number;
//       y: number;
//       value: string;
//       color: string;
//       fontSize: number;
//       bold: boolean;
//       italic: boolean;
//     }[]
//     >([
//     { key: "Tên người dùng", checked: false, x: 50, y: 50, value: "Nguyễn Văn A", color: "#000000", fontSize: 16, bold: false, italic: false },
//     { key: "Mã số", checked: false, x: 50, y: 100, value: "123456789", color: "#000000", fontSize: 16, bold: false, italic: false },
//     { key: "Đơn vị", checked: false, x: 50, y: 150, value: "Khoa Công nghệ Thông tin", color: "#000000", fontSize: 16, bold: false, italic: false },
//     { key: "Tên chương trình", checked: false, x: 50, y: 200, value: "Hội thảo tư vấn và định hướng nghề nghiệp", color: "#000000", fontSize: 16, bold: false, italic: false },
//     { key: "Ngày", checked: false, x: 50, y: 250, value: "01", color: "#000000", fontSize: 8, bold: false, italic: false },
//     { key: "Tháng", checked: false, x: 100, y: 250, value: "02", color: "#000000", fontSize: 8, bold: false, italic: false },
//     { key: "Năm", checked: false, x: 150, y: 250, value: "25", color: "#000000", fontSize: 8, bold: false, italic: false },
//     { key: "Số GCN", checked: false, x: 50, y: 300, value: "01", color: "#000000", fontSize: 8, bold: false, italic: false },
//   ]);
  const [fields, setFields] = useState(FIELDS_DEFAULTS);

  const [naturalWidth, setNaturalWidth] = useState<number>(0);
  const [naturalHeight, setNaturalHeight] = useState<number>(0);
  const [displayWidth, setDisplayWidth] = useState<number>(0);
  const [displayHeight, setDisplayHeight] = useState<number>(0);
//   const [ratio, setRatio] = useState<number>(1); // hệ số scale (gốc/hiển thị)

  // Lấy dropdown event types
  const [eventTypes, setEventTypes] = useState<EventType[]>([]);

  // Ref tới thẻ <img> để tính kích thước hiển thị
  const imgRef = useRef<HTMLImageElement | null>(null);

  // Map từ label (key hiển thị) sang fieldKey của payload
  type FieldKey =
    | "name"
    | "id"
    | "unit"
    | "program"
    | "day"
    | "month"
    | "year"
    | "cert_number";

  const keyMap: Record<string, FieldKey> = {
    "tên người dùng": "name",
    "mã số": "id",
    "đơn vị": "unit",
    "tên chương trình": "program",
    "ngày": "day",
    "tháng": "month",
    "năm": "year",
    "số gcn": "cert_number",
  };

  // -------------------------------
  // 1) Fetch eventTypes (dropdown) khi component mount
  // -------------------------------
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

  // -------------------------------
  // 2) Fetch template hiện có khi có id
  // -------------------------------
useEffect(() => {
  if (!id) return;

  (async () => {
    try {
      console.log("Fetching certificate template with id:", id);
      const tpl = await getCertificateTemplateById(id);
      console.log("BACKEND field_positions:", tpl.field_positions);

      // Đổ dữ liệu vào state
      setName(tpl.name);
      setEventType(tpl.event_type_id);

      if (tpl.background_base64) {
        setImagePreview(tpl.background_base64);
      }

      // Map dữ liệu field_positions vào FIELDS_DEFAULTS
        const loadedFields = FIELDS_DEFAULTS.map((f) => {
        const fieldKeyLower = f.key.toLowerCase();
        const mappedKey = keyMap[fieldKeyLower];

        const style = mappedKey ? tpl.field_positions?.[mappedKey] : undefined;
        if (style) {
            return {
            ...f,
            checked: style.checked === undefined ? true : style.checked,
            x: style.x,
            y: style.y,
            color: style.color ?? "#000000",
            fontSize: style.fontSize ?? 16,
            bold: style.bold ?? false,
            italic: style.italic ?? false,
            };
        }

        return f;
        });

      setFields(loadedFields);
      console.log("Fields updated:", loadedFields);

      // Cập nhật chiều rộng/chiều cao nếu có
      if (tpl.display_width) setDisplayWidth(tpl.display_width);
      if (tpl.display_height) setDisplayHeight(tpl.display_height);
    } catch (err) {
      console.error("Lỗi khi load certificate template:", err);
      alert("Không lấy được dữ liệu mẫu chứng nhận. Vui lòng thử lại.");
    }
  })();
}, [id]);


  // -------------------------------
  // 3) Khi imagePreview thay đổi (từ base64 hoặc file mới), chúng ta tính kích thước hiển thị để scale tọa độ
  // -------------------------------
  useEffect(() => {
    if (!imgRef.current) return;
    const img = imgRef.current;
    const handler = () => {
      const natW = img.naturalWidth;
      const natH = img.naturalHeight;
      const dispW = img.clientWidth;
      const dispH = img.clientHeight;
      setNaturalWidth(natW);
      setNaturalHeight(natH);
      setDisplayWidth(dispW);
      setDisplayHeight(dispH);
      // ratio = (kích thước gốc trên server) / (kích thước hiển thị)
    //   setRatio(natW && dispW ? natW / dispW : 1);
    };
    // Nếu ảnh đã nạp xong
    if (img.complete) {
      handler();
    } else {
      img.addEventListener("load", handler);
      return () => img.removeEventListener("load", handler);
    }
  }, [imagePreview]);

  // -------------------------------
  // Các hàm XỬ LÝ interaction với fields/hình
  // -------------------------------
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
      prev.map((f, i) =>
        i === index
          ? {
              ...f,
              checked: !f.checked,
            }
          : f
      )
    );
  };

  const handleDrag = (index: number, dx: number, dy: number) => {
    setFields(prevFields => {
        const newFields = [...prevFields];
        newFields[index] = {
        ...newFields[index],
        x: newFields[index].x + dx,
        y: newFields[index].y + dy,
        };
        return newFields;
    });
  };

  const handleColorChange = (index: number, color: string) => {
    setFields((prev) =>
      prev.map((f, i) => (i === index ? { ...f, color } : f))
    );
  };

  const toggleBold = (index: number) => {
    setFields((prev) =>
      prev.map((f, i) => (i === index ? { ...f, bold: !f.bold } : f))
    );
  };

  const toggleItalic = (index: number) => {
    setFields((prev) =>
      prev.map((f, i) => (i === index ? { ...f, italic: !f.italic } : f))
    );
  };

  const handleFontSizeChange = (index: number, size: number) => {
    setFields((prev) =>
      prev.map((f, i) => (i === index ? { ...f, fontSize: size } : f))
    );
  };

  // Chuyển File sang base64
  const toBase64 = (file: File): Promise<string> =>
    new Promise((res, rej) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => res(reader.result as string);
      reader.onerror = (err) => rej(err);
    });

  // -------------------------------
  // 4) Khi nhấn nút LƯU (Update), chúng ta build payload và gọi updateCertificateTemplate
  // -------------------------------
  const handleSubmit = async () => {
    // Validate cơ bản
    if (!name || !eventType) {
      alert("Vui lòng nhập đầy đủ tên và chọn loại sự kiện.");
      return;
    }

    try {
      let background_base64: string | undefined;

      // Nếu user đổi ảnh mới, convert sang base64
      if (imageFile) {
        background_base64 = await toBase64(imageFile);
      } else if (imagePreview) {
        // Nếu user không đổi, giữ luôn base64 cũ (đã load vào imagePreview)
        background_base64 = imagePreview;
      } else {
        alert("Vui lòng chọn ảnh nền.");
        return;
      }

      // Build field_positions từ mảng fields: chỉ lấy những field.checked = true
      const field_positions: Partial<Record<FieldKey, FieldStyle>> = {};
      fields.forEach((f) => {
        if (f.checked) {
          const mappedKey = keyMap[f.key.toLowerCase()];
          if (!mappedKey) return;
          // Nhân tỉ lệ để gửi lên backend: (f.x * ratio, f.y * ratio)
          field_positions[mappedKey] = {
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

      // Tạo payload
      const payload: Partial<CreateCertificateTemplatePayload> = {
        name,
        event_type_id: eventType,
        background_base64,
        field_positions,
        display_width: naturalWidth, // lưu theo kích thước gốc
        display_height: naturalHeight,
      };

      // Gọi API update
      const updated = await updateCertificateTemplate(id!, payload);
      console.log("Cập nhật thành công:", updated);
      alert("Cập nhật mẫu chứng nhận thành công!");
      // Chuyển hướng về trang list (hoặc page detail tuỳ bạn)
      navigate("/admin/certificate-templates");
    } catch (err) {
      console.error("Lỗi khi cập nhật mẫu:", err);
      alert("Đã xảy ra lỗi. Vui lòng thử lại.");
    }
  };


  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-100 min-h-screen py-10 px-4 flex gap-4 justify-center">
      <div className={`bg-white p-8 rounded-3xl shadow-xl border border-gray-200 ${imagePreview ? 'max-w-xl' : 'max-w-2xl w-full'}`}>
        <h2 className={`${imagePreview ? 'text-2xl' : 'text-3xl'} font-bold text-indigo-800 mt-1 mb-8 text-center`}>Cập nhật mẫu giấy chứng nhận</h2>

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
            <div className="mt-4 relative border rounded-xl overflow-visible" style={{ zIndex: 1 }}>
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
                //   const scaleRatio = natW / dispW;
                //   console.log("onLoad ratio:", scaleRatio);
                //   setRatio(scaleRatio);
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
                      style={{ zIndex: 10 }}
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
            Cập nhật mẫu
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
  const draggingRef = useRef(false);
  const originRef = useRef({ x: 0, y: 0 });

  const handleMouseDown = (e: React.MouseEvent) => {
    draggingRef.current = true;
    originRef.current = { x: e.clientX, y: e.clientY };
    setDragging(true);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!draggingRef.current) return;
    const dx = e.clientX - originRef.current.x;
    const dy = e.clientY - originRef.current.y;
    onDrag(index, dx, dy);
    originRef.current = { x: e.clientX, y: e.clientY };
  };

    const handleMouseUp = () => {
      draggingRef.current = false;
      setDragging(false);
    };

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);

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
        zIndex: 10,
      }}
    >
      {field.value}
    </div>
  );
};

export default UpdateCertificate;
