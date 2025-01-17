import React, { useState, useEffect } from "react";
// import { loginApi } from "api/authApi";
import {
  Eye as EyeIcon,
  EyeOff as EyeOffIcon,
  Lock as LockIcon,
  User as UserIcon,
} from "lucide-react";
import Cookies from "js-cookie";
import { loginApi } from "api/Authapi";
// import { loginApi } from "api/tempauthApi";

const Login: React.FC = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [rememberMe, setRememberMe] = useState<boolean>(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(""); // Reset trạng thái lỗi

    try {
      const data = await loginApi(username, password);
      console.log("Login successful, data:", data);

      if (rememberMe) {
        Cookies.set("rememberedUsername", username, { expires: 30 }); // Ghi nhớ username trong 30 ngày
      } else {
        Cookies.remove("rememberedUsername");
      }

      // Điều hướng dựa trên vai trò
      const redirectUrl = data.data.user_info.is_admin ? "/admin" : "/";
      window.location.href = redirectUrl;
    } catch (error) {
      console.error("Login error:", error);
      setError("Đăng nhập thất bại. Vui lòng kiểm tra lại.");
    }
  };
  useEffect(() => {
    const authToken = sessionStorage.getItem("authToken");
    if (authToken) {
      console.log("User is already logged in");
      // Điều hướng đến trang chính nếu cần
      window.location.href = "/";
    }
  }, []);

  // Load remembered username on component mount
  useEffect(() => {
    const rememberedUsername = Cookies.get("rememberedUsername");
    if (rememberedUsername) {
      setUsername(rememberedUsername);
      setRememberMe(true);
    }
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 flex items-center justify-center p-6">
      <div className="w-full max-w-4xl bg-white rounded-3xl shadow-2xl overflow-hidden flex">
        {/* Left Side - Decorative Section */}
        <div className="w-1/2 bg-gradient-to-tr from-indigo-600 to-purple-600 relative overflow-hidden flex items-center justify-center p-12">
          <div className="absolute inset-0 bg-gradient-to-tr from-indigo-600 to-purple-600 opacity-70"></div>
          <div className="relative z-10 text-center text-white space-y-6">
            <h1 className="text-4xl font-bold">Chào Mừng!</h1>
            <p className="text-xl opacity-90">
              Đăng nhập để truy cập vào tài khoản của bạn
            </p>
            <div className="space-y-4">
              <div className="w-24 h-24 bg-white/10 rounded-full absolute top-10 left-10 animate-float"></div>
              <div className="w-32 h-32 bg-white/10 rounded-full absolute bottom-10 right-10 animate-float-slow"></div>
            </div>
          </div>
        </div>

        {/* Right Side - Login Form */}
        <div className="w-1/2 p-12 flex flex-col justify-center">
          <form onSubmit={handleSubmit} className="space-y-6">
            <h2 className="text-3xl font-bold text-center text-indigo-600 mb-4">
              Đăng Nhập
            </h2>

            {error && (
              <div className="bg-red-50 border border-red-300 text-red-600 px-4 py-3 rounded-lg text-center">
                {error}
              </div>
            )}

            <div className="space-y-4">
              {/* Username Input */}
              <div className="relative">
                <UserIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  placeholder="Tên người dùng"
                  className="w-full pl-10 px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-indigo-600 outline-none transition-colors duration-300"
                />
              </div>

              {/* Password Input */}
              <div className="relative">
                <LockIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="Mật khẩu"
                  className="w-full pl-10 pr-10 px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-indigo-600 outline-none transition-colors duration-300"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 focus:outline-none"
                >
                  {showPassword ? (
                    <EyeOffIcon size={20} />
                  ) : (
                    <EyeIcon size={20} />
                  )}
                </button>
              </div>

              {/* Remember Me and Forgot Password */}
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="remember-me"
                    checked={rememberMe}
                    onChange={() => setRememberMe(!rememberMe)}
                    className="mr-2  focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                  />
                  <label
                    htmlFor="remember-me"
                    className="text-sm text-gray-600"
                  >
                    Nhớ mật khẩu
                  </label>
                </div>
                <a
                  href="/forgot-password"
                  className="text-sm text-indigo-600 hover:text-indigo-500"
                >
                  Quên mật khẩu?
                </a>
              </div>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              className="w-full py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg 
                         hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 
                         transform hover:-translate-y-1 hover:shadow-lg"
            >
              Đăng nhập
            </button>

            {/* Divider */}
            <div className="relative flex items-center justify-center my-4">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative z-10 bg-white px-4 text-gray-500">
                Hoặc
              </div>
            </div>

            {/* Signup Link */}
            <a
              href="https://itcoder.hutech.edu.vn/site/signup"
              className="block w-full text-center px-4 py-3 border border-transparent 
                         text-sm font-medium rounded-lg text-indigo-700 bg-indigo-100 
                         hover:bg-indigo-200 focus:outline-none focus:ring-2 
                         focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-300"
            >
              Tạo tài khoản mới
            </a>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
