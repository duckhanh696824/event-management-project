import React, { useEffect, useRef, useState } from "react";
import { Button, Menu, MenuItem } from "@mui/material";
import { Download, Share2, Printer, ArrowLeftIcon, ArrowLeft } from "lucide-react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { useNavigate, useParams } from "react-router-dom";
import { getCertifiedEventById } from "api/certificateApi";
import dayjs from "dayjs";
import { FieldStyle } from "types/certificateTemplateTypes";

interface TemplatePositions {
  name: FieldStyle;
  user_id: FieldStyle;
  unit: FieldStyle;
  program: FieldStyle;
  day: FieldStyle;
  month: FieldStyle;
  year: FieldStyle;
  cert_number: FieldStyle;
}

const CertificateDetail: React.FC = () => {
  const certificateRef = useRef<HTMLDivElement>(null);
  const { id } = useParams(); // lấy ID từ route
  const navigate = useNavigate();

  const [fullName, setFullName] = useState("");
  const [code, setCode] = useState("");
  const [unit, setUnit] = useState("");
  const [programName, setProgramName] = useState("");
  const [date, setDate] = useState("");
  const [dayStr, setDayStr] = useState("");
  const [monthStr, setMonthStr] = useState("");
  const [yearStr, setYearStr] = useState("");
  const [certNumber, setCertNumber] = useState<number | null>(null);
  const [backgroundImage, setBackgroundImage] = useState<string | null>(null);
  const [positions, setPositions] = useState<TemplatePositions | null>(null);

  const [templateSize, setTemplateSize] = useState<{width: number; height: number} | null>(null);
  const [imageSize, setImageSize] = useState<{width: number; height: number} | null>(null);

  // State quản lý menu tải
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  useEffect(() => {
    const fetchData = async () => {
      if (!id) return;

      const event = await getCertifiedEventById(Number(id));
      console.log("Fetched event data:", event);

      if (event) {
        setFullName(event.nickname);
        setCode(event.username);
        setUnit(event.class || "Chưa rõ");
        setProgramName(event.title);
        setCertNumber(event.cert_number || null);

        // Tạo date theo 3 thành phần riêng (nếu muốn hiển thị tách rời)
        const parsedDate = dayjs(event.start_time);
        setDayStr(parsedDate.format("DD"));
        setMonthStr(parsedDate.format("MM"));
        setYearStr(parsedDate.format("YYYY"));

        // Lưu date chung nếu vẫn muốn hiển thị đầy đủ ở một chỗ (nếu cần)
        setDate(parsedDate.format("DD/MM/YYYY"));

        if (event.template) {
          setBackgroundImage(event.template.background_base64);

          if (event.template.display_width && event.template.display_height) {
            setTemplateSize({
              width: event.template.display_width,
              height: event.template.display_height,
            });
          }
        }

        const fieldJson =
          typeof event.template.field_positions_json === "string"
            ? JSON.parse(event.template.field_positions_json)
            : event.template.field_positions_json;

        // Bây giờ set lên state
        setPositions(fieldJson as TemplatePositions);
      }
    };

    fetchData();
  }, [id]);

  // Tính scale theo chiều X (width)
  const scaleX =
    templateSize && imageSize ? imageSize.width / templateSize.width : 1;
  const scaleY =
    templateSize && imageSize ? imageSize.height / templateSize.height : 1;
  const scale = templateSize && imageSize ? Math.min(scaleX, scaleY) : 1;
  console.log("positions", positions);


  const handleDownloadClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const downloadPNG = async () => {
    handleCloseMenu();
    if (certificateRef.current) {
      const canvas = await html2canvas(certificateRef.current, { scale: 2 });
      const link = document.createElement("a");
      link.download = "giay-chung-nhan.png";
      link.href = canvas.toDataURL("image/png");
      link.click();
    }
  };

  const downloadPDF = async () => {
    handleCloseMenu();
    if (certificateRef.current) {
      const canvas = await html2canvas(certificateRef.current, { scale: 2 });
      const imgData = canvas.toDataURL("image/png");

      const pdf = new jsPDF({
        orientation: "landscape",
        unit: "pt",
        format: [842, 595],
      });

      pdf.addImage(imgData, "PNG", 0, 0, 842, 595);
      pdf.save("giay-chung-nhan.pdf");
    }
  };

  const printCertificate = () => {
    if (!certificateRef.current) return;

    const printWindow = window.open("", "_blank", "width=900,height=700");
    if (!printWindow) return;

    const htmlContent = certificateRef.current.outerHTML;

    printWindow.document.write(`
      <html>
        <head>
          <title>In Giấy chứng nhận</title>
          <style>
            body {
              margin: 0;
              padding: 0;
            }
            .certificate {
              width: 842px;
              height: 595px;
              background-image: url("${backgroundImage}");
              background-size: cover;
              background-position: center;
              position: relative;
              font-family: Arial, sans-serif;
              color: #4B5563;
            }
            .certificate h2 {
              text-align: center;
              margin-top: 180px;
              font-size: 2rem;
              font-weight: bold;
              color: #1F2937;
            }
            .certificate p {
              text-align: center;
              font-size: 1.125rem;
              margin: 0.25rem 0;
            }
            .bottom-date {
              position: absolute;
              bottom: 80px;
              right: 80px;
              font-size: 1rem;
              text-align: right;
            }
          </style>
        </head>
        <body>
          ${htmlContent}
          <script>
            window.onload = function() {
              window.print();
              window.onafterprint = function() {
                window.close();
              }
            }
          </script>
        </body>
      </html>
    `);

    printWindow.document.close();
  };

  // Hàm share lên Facebook (demo)
  const shareOnFacebook = () => {
    if (!certificateRef.current) return;

    html2canvas(certificateRef.current, { scale: 2 }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const newWindow = window.open();
      if (newWindow) {
        newWindow.document.write(
          `<title>Giấy chứng nhận</title><img src="${imgData}" style="width:100%"/>`
        );
      }
    });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
        <div className="w-full flex justify-start ml-3">
            <button
                onClick={() => navigate(-1)}
                className="flex items-center bg-blue-100 text-blue-600 px-4 py-2 rounded-lg mb-4 hover:bg-blue-200 transition"
            >
                <ArrowLeft className="mr-2 w-4 h-4" /> Quay lại
            </button>
        </div>
        <div ref={certificateRef} className="relative w-full max-w-4xl mx-auto">
          {backgroundImage && (
            <img
              src={backgroundImage}
              alt="Certificate Background"
              className="w-full h-auto rounded-xl"
              onLoad={(e) => {
                const target = e.currentTarget;
                setImageSize({
                  width: target.naturalWidth,
                  height: target.naturalHeight,
                });
              }}
            />
          )}
          <div className="absolute inset-0">
            {positions?.name && (
              <div
                className="absolute"
                style={{
                  top: `${parseFloat(positions.name.y?.toString() ?? "0") * 2}px`,
                  left: `${parseFloat(positions.name.x?.toString() ?? "0") * 2}px`,
                  color: positions.name.color ?? "#1F2937",
                  fontWeight: positions.name.bold?.toString() === "true" ? "bold" : "normal",
                  fontStyle: positions.name.italic?.toString() === "true" ? "italic" : "normal",
                  fontSize: Number(positions.name.fontSize ?? 30),
                }}
              >
                {fullName}
              </div>
            )}

            {positions?.user_id && (
              <div
                className="absolute"
                style={{
                  top: `${parseFloat(positions.user_id.y?.toString() ?? "0") * 2}px`,
                  left: `${parseFloat(positions.user_id.x?.toString() ?? "0") * 2}px`,
                  color: positions.user_id.color ?? "#1F2937",
                  fontWeight: positions.user_id.bold?.toString() === "true" ? "bold" : "normal",
                  fontStyle: positions.user_id.italic?.toString() === "true" ? "italic" : "normal",
                  fontSize: Number(positions.user_id.fontSize ?? 20),
                }}
              >
                {code}
              </div>
            )}

            {positions?.unit && (
              <div
                className="absolute"
                style={{
                  top: `${parseFloat(positions.unit.y?.toString() ?? "0") * 2}px`,
                  left: `${parseFloat(positions.unit.x?.toString() ?? "0") * 2}px`,
                  color: positions.unit.color ?? "#1F2937",
                  fontWeight: positions.unit.bold?.toString() === "true" ? "bold" : "normal",
                  fontStyle: positions.unit.italic?.toString() === "true" ? "italic" : "normal",
                  fontSize: Number(positions.unit.fontSize ?? 20),
                }}
              >
                {unit}
              </div>
            )}

            {positions?.program && (
              <div
                className="absolute"
                style={{
                  top: `${parseFloat(positions.program.y?.toString() ?? "0") * 2}px`,
                  left: `${parseFloat(positions.program.x?.toString() ?? "0") * 2}px`,
                  color: positions.program.color ?? "#1F2937",
                  fontWeight: positions.program.bold?.toString() === "true" ? "bold" : "normal",
                  fontStyle: positions.program.italic?.toString() === "true" ? "italic" : "normal",
                  fontSize: Number(positions.program.fontSize ?? 30),
                }}
              >
                {programName}
              </div>
            )}

            {positions?.day && (
              <div
                className="absolute"
                style={{
                  top: `${parseFloat(positions.day.y?.toString() ?? "0") * 2}px`,
                  left: `${parseFloat(positions.day.x?.toString() ?? "0") * 2}px`,
                  color: positions.day.color ?? "#1F2937",
                  fontWeight: positions.day.bold?.toString() === "true" ? "bold" : "normal",
                  fontStyle: positions.day.italic?.toString() === "true" ? "italic" : "normal",
                  fontSize: Number(positions.day.fontSize ?? 18),
                }}
              >
                {dayStr}
              </div>
            )}

            {positions?.month && (
              <div
                className="absolute"
                style={{
                  top: `${parseFloat(positions.month.y?.toString() ?? "0") * 2}px`,
                  left: `${parseFloat(positions.month.x?.toString() ?? "0") * 2}px`,
                  color: positions.month.color ?? "#1F2937",
                  fontWeight: positions.month.bold?.toString() === "true" ? "bold" : "normal",
                  fontStyle: positions.month.italic?.toString() === "true" ? "italic" : "normal",
                  fontSize: Number(positions.month.fontSize ?? 18),
                }}
              >
                {monthStr}
              </div>
            )}

            {positions?.year && (
              <div
                className="absolute"
                style={{
                  top: `${parseFloat(positions.year.y?.toString() ?? "0") * 2}px`,
                  left: `${parseFloat(positions.year.x?.toString() ?? "0") * 2}px`,
                  color: positions.year.color ?? "#1F2937",
                  fontWeight: positions.year.bold?.toString() === "true" ? "bold" : "normal",
                  fontStyle: positions.year.italic?.toString() === "true" ? "italic" : "normal",
                  fontSize: Number(positions.year.fontSize ?? 18),
                }}
              >
                {yearStr.slice(-2)}
              </div>
            )}

            {positions?.cert_number && certNumber != null && (
              <div
                className="absolute"
                style={{
                  top: `${parseFloat(positions.cert_number.y?.toString() ?? "0") * 2}px`,
                  left: `${parseFloat(positions.cert_number.x?.toString() ?? "0") * 2}px`,
                  color: positions.cert_number.color ?? "#1F2937",
                  fontWeight: positions.cert_number.bold?.toString() === "true" ? "bold" : "normal",
                  fontStyle: positions.cert_number.italic?.toString() === "true" ? "italic" : "normal",
                  fontSize: Number(positions.cert_number.fontSize ?? 18),
                }}
              >
                {certNumber}
              </div>
            )}
          </div>
      </div>
      <div className="flex space-x-4 mt-6">
        <Button
          variant="contained"
          color="primary"
          startIcon={<Download />}
          onClick={handleDownloadClick}
        >
          Tải Giấy chứng nhận
        </Button>

        <Menu anchorEl={anchorEl} open={open} onClose={handleCloseMenu}>
          <MenuItem onClick={downloadPNG}>Tải ảnh PNG</MenuItem>
          <MenuItem onClick={downloadPDF}>Tải file PDF</MenuItem>
        </Menu>

        <Button
          variant="outlined"
          color="primary"
          startIcon={<Printer />}
          onClick={printCertificate}
        >
          In giấy chứng nhận
        </Button>

        <Button
          variant="outlined"
          color="primary"
          startIcon={<Share2 />}
          onClick={shareOnFacebook}
        >
          Chia sẻ
        </Button>
      </div>
    </div>
  );
};

export default CertificateDetail;
