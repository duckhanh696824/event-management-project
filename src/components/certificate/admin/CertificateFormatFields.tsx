import React from "react";
import { Info } from "lucide-react";

interface Field {
  key: string;
  checked: boolean;
  color: string;
  bold: boolean;
  italic: boolean;
  fontSize: number;
}

interface CertificateFormatFieldsProps {
  fields: Field[];
  handleFieldCheck: (index: number) => void;
  handleColorChange: (index: number, color: string) => void;
  toggleBold: (index: number) => void;
  toggleItalic: (index: number) => void;
  handleFontSizeChange: (index: number, size: number) => void;
}

const CertificateFormatFields: React.FC<CertificateFormatFieldsProps> = ({
  fields,
  handleFieldCheck,
  handleColorChange,
  toggleBold,
  toggleItalic,
  handleFontSizeChange,
}) => {
  return (
    <div className="w-80 bg-white p-6 rounded-2xl shadow-lg border border-gray-200">
      <h3 className="text-2xl font-bold text-indigo-800 mt-3 mb-6 flex items-center gap-2">
        <Info className="w-6 h-6 text-indigo-600" />
        Thông tin hiển thị
      </h3>
      {fields.map((field, index) => (
        <div key={index} className="mb-4">
          <label
            className={`flex items-center mb-2 transition-colors ${
              field.checked ? "text-indigo-700 font-medium" : "text-gray-700"
            }`}
          >
            <input
              type="checkbox"
              checked={field.checked}
              onChange={() => handleFieldCheck(index)}
              className={`mr-2 h-4 w-4 rounded border-gray-300 focus:ring-0 transition-colors ${
                field.checked ? "text-indigo-700 accent-indigo-600" : ""
              }`}
            />
            {field.key}
          </label>
          {field.checked && (
            <div className="pl-6">
              <label className="block text-sm mb-1">Mã màu chữ:</label>
              <div className="flex items-center gap-2 mb-2">
                <input
                  type="text"
                  value={field.color}
                  onChange={(e) => handleColorChange(index, e.target.value)}
                  placeholder="#000000"
                  className="w-full border border-gray-300 rounded px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300"
                />
                <button
                  onClick={() => toggleBold(index)}
                  className={`px-2 py-1 rounded text-sm font-bold border ${
                    field.bold ? "bg-indigo-600 text-white" : "bg-white text-gray-700"
                  } hover:bg-indigo-100 transition`}
                  title="Bật/tắt chữ đậm"
                >
                  B
                </button>
                <button
                  onClick={() => toggleItalic(index)}
                  className={`px-2 py-1 rounded text-sm italic border ${
                    field.italic ? "bg-indigo-600 text-white" : "bg-white text-gray-700"
                  } hover:bg-indigo-100 transition`}
                  title="Bật/tắt chữ nghiêng"
                >
                  I
                </button>
              </div>

              <label className="block text-sm mb-1">Kích thước chữ:</label>
              <input
                type="range"
                min={5}
                max={25}
                step={0.5}
                value={field.fontSize}
                onChange={(e) => handleFontSizeChange(index, Number(e.target.value))}
                className="w-full"
              />
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default CertificateFormatFields;
