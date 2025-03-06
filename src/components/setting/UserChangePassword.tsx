import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight, CircleCheckBig, Save } from "lucide-react";
import { changePassword } from "api/userApi";
import { loginApi, logoutApi } from "api/Authapi"; // Import API đăng nhập & đăng xuất
import { toast } from "react-toastify";

const UserChangePassword = () => {
  const navigate = useNavigate(); // Hook để điều hướng trang

  // State lưu trữ giá trị của các ô nhập mật khẩu
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [isCurrentPasswordValid, setIsCurrentPasswordValid] = useState(false);
  const [showNewPasswordFields, setShowNewPasswordFields] = useState(false);
  const [loading, setLoading] = useState(false);

  // Xử lý kiểm tra mật khẩu hiện tại
  const handleCheckCurrentPassword = async () => {
    if (!currentPassword) {
      toast.error("Vui lòng nhập mật khẩu hiện tại.");
      return;
    }

    try {
      setLoading(true);
      const userInfo = JSON.parse(sessionStorage.getItem("userInfo") || "{}");
      await loginApi(userInfo.username, currentPassword);
      setIsCurrentPasswordValid(true);
      setShowNewPasswordFields(true); // Cho phép hiển thị ô nhập mật khẩu mới
      toast.success("Mật khẩu hiện tại chính xác.");
    } catch (error) {
      setIsCurrentPasswordValid(false);
      toast.error("Mật khẩu hiện tại không đúng.");
    } finally {
      setLoading(false);
    }
  };

  // Xử lý đổi mật khẩu
  const handleChangePassword = async () => {
    if (newPassword !== confirmNewPassword) {
      toast.error("Mật khẩu mới không khớp.");
      return;
    }

    try {
      setLoading(true);
      await changePassword(newPassword);
      toast.success("Đổi mật khẩu thành công! Hệ thống sẽ đăng xuất...");

      // Đợi 2.5 giây trước khi đăng xuất
      setTimeout(async () => {
        await logoutApi(); // Gọi API đăng xuất
        sessionStorage.removeItem("userInfo"); // Xóa thông tin đăng nhập
        navigate("/login"); // Chuyển hướng đến trang đăng nhập
      }, 2500);
      
    } catch (error) {
      toast.error("Có lỗi xảy ra khi đổi mật khẩu.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4 text-indigo-800">THAY ĐỔI MẬT KHẨU</h2>

      <div className="space-y-5">
        {/* Hiển thị ô nhập mật khẩu hiện tại */}
        {!showNewPasswordFields && (
          <>
            <input
              type="password"
              placeholder="Nhập mật khẩu hiện tại"
              className="w-full px-4 py-3 border rounded-md focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
            />

            <div className="flex justify-end">
              <button
                className="flex items-center gap-2 border bg-indigo-600 text-white px-4 py-3 font-semibold rounded-md hover:bg-indigo-700"
                onClick={handleCheckCurrentPassword}
                disabled={loading}
              >
                {loading ? "Đang kiểm tra..." : "Đổi mật khẩu"}
                <ArrowRight size={19} />
              </button>
            </div>
          </>
        )}

        {/* Hiển thị ô nhập mật khẩu mới sau khi xác thực thành công */}
        {showNewPasswordFields && (
          <>
            <input
              type="password"
              placeholder="Nhập mật khẩu mới"
              className="w-full px-4 py-3 border rounded-md focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />

            <input
              type="password"
              placeholder="Xác nhận mật khẩu mới"
              className={`w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 
                  ${newPassword && !confirmNewPassword ? "border-red-500 focus:border-red-500 focus:ring-red-100 " : "focus:border-indigo-500 focus:ring-indigo-100 "}`}
              value={confirmNewPassword}
              onChange={(e) => setConfirmNewPassword(e.target.value)}
              disabled={!newPassword} // Chỉ cho phép nhập khi ô mật khẩu mới đã có giá trị
            />

            <div className="flex justify-end">
              <button
                className={`flex items-center gap-2 px-4 py-3 font-semibold rounded-md 
                  ${confirmNewPassword
                    ? "bg-indigo-600 text-white hover:bg-indigo-700"
                    : "border border-indigo-600 text-indigo-700 bg-white"
                  }`}
                onClick={handleChangePassword}
                disabled={!confirmNewPassword}
              >
                <CircleCheckBig size={19} />
                Lưu thay đổi
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default UserChangePassword;
