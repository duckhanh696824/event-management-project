import { useEffect, useState } from "react";
import { BadgeCheck, Check, GraduationCap, Mail, Phone, Tag, User } from "lucide-react";
import { getUserInfo, changeEmail, changePhoneNumber } from "api/userApi";

interface UserProfileProps {
  userId?: string;
}

const UserProfile: React.FC<UserProfileProps> = ({ userId }) => {
  const [avatar, setAvatar] = useState("https://bootdey.com/img/Content/avatar/avatar7.png");
  const [initialEmail, setInitialEmail] = useState("");
  const [userInfo, setUserInfo] = useState({
    username: "",
    nickname: "",
    class_name: "",
    email: "",
    phone_number: "",
  });

  useEffect(() => {
    const fetchUserInfo = async () => {
      if (!userId) return;
      try {
        const data = await getUserInfo() as {
          username: string;
          nickname: string;
          class_name: string;
          email: string;
          phone_number: string;
        };
        
        setUserInfo({
          username: data.username || "",
          nickname: data.nickname || "",
          class_name: data.class_name || "",
          email: data.email || "",
          phone_number: data.phone_number || "",
        });
        setInitialEmail(data.email || "");  // Lưu email ban đầu
      } catch (error) {
        console.error("Error fetching user info:", error);
      }
    };

    fetchUserInfo();
  }, [userId]);

  const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e) => setAvatar(e.target?.result as string);
      reader.readAsDataURL(event.target.files[0]);
    }
  };

  const handleSaveChanges = async () => {
    try {
      const currentUser = await getUserInfo(); // Lấy thông tin người dùng hiện tại
  
      if (userInfo.email !== currentUser.email) {
        // Chỉ cập nhật email nếu nó thay đổi
        await changeEmail(userInfo.email);
      }
  
      if (userInfo.phone_number !== currentUser.phone_number) {
        // Chỉ cập nhật số điện thoại nếu nó thay đổi
        await changePhoneNumber(userInfo.phone_number);
      }
  
      alert("Thông tin đã được cập nhật!");
    } catch (error: any) {
      console.error("Lỗi cập nhật thông tin:", error);
      alert(error.response?.data?.message || "Có lỗi xảy ra!");
    }
  };
  
  

  return (
    <div className="max-w-4xl pl-[66px] pr-[62px] py-6 bg-indigo-50 bg-opacity-40 min-w-full min-h-screen">
      <nav aria-label="breadcrumb" className="mb-4">
        <ol className="flex space-x-2 text-indigo-700">
          <li><a href="/" className="hover:underline">Trang chủ</a></li>
          <li>/</li>
          <li className="text-indigo-700 font-semibold">Hồ sơ</li>
        </ol>
      </nav>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="bg-white shadow-md rounded-lg py-6 flex flex-col items-center text-center">
          <div className="relative w-[184px] h-[184px]">
            <img src={avatar} alt="Avatar" className="w-[184px] h-[184px] rounded-full object-cover border-4 border-gray-300" />
          </div>
          <label className="mt-3 px-4 py-2 bg-indigo-600 font-semibold text-white rounded-md hover:bg-indigo-700 cursor-pointer">
            Đổi ảnh avatar
            <input type="file" accept="image/*" className="hidden" onChange={handleAvatarChange} />
          </label>
        </div>

        <div className="md:col-span-2 bg-white shadow-md rounded-lg px-6 pt-8 pb-10">
          <h2 className="text-xl font-semibold mb-7 text-indigo-800">THÔNG TIN CÁ NHÂN</h2>
          <div className="space-y-7">
            <div className="flex items-center justify-between border-b pb-2">
              <div className="flex items-center text-gray-600">
                <User className="mr-2" size={18} />Tên tài khoản
              </div>
              <span className="text-gray-800 font-medium">{userInfo.username}</span>
            </div>
            <div className="flex items-center justify-between border-b pb-2">
              <div className="flex items-center text-gray-600">
                <Tag className="mr-2" size={18} />Họ tên
              </div>
              <span className="text-gray-800 font-medium">{userInfo.nickname}</span>
            </div>
            <div className="flex items-center justify-between border-b pb-2">
              <div className="flex items-center text-gray-600">
                <GraduationCap className="mr-2" size={18} />Lớp
              </div>
              <span className="text-gray-800 font-medium">{userInfo.class_name}</span>
            </div>
          </div>
        </div>

        {/* Phần chỉnh sửa thông tin */}
        <div className="md:col-span-3 bg-white shadow-md rounded-lg px-6 py-8 my-2">
          <h2 className="text-xl font-semibold mb-7 text-indigo-800">CHỈNH SỬA THÔNG TIN</h2>
          <div className="space-y-6">
            <div className="flex items-center justify-between pb-2">
              <div className="flex items-center text-gray-600"><Mail className="mr-2" size={18} />Email</div>
              <input 
                type="email" 
                value={userInfo.email} 
                placeholder="Nhập email của bạn"
                onChange={(e) => setUserInfo({ ...userInfo, email: e.target.value })} 
                className="text-gray-800 font-medium border rounded-md px-3 py-3 w-2/3 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100" 
              />
            </div>
            <div className="flex items-center justify-between pb-2">
              <div className="flex items-center text-gray-600"><Phone className="mr-2" size={18} />Số điện thoại</div>
              <input 
                type="text" 
                value={userInfo.phone_number} 
                placeholder="Nhập số điện thoại của bạn"
                onChange={(e) => setUserInfo({ ...userInfo, phone_number: e.target.value })} 
                className="text-gray-800 font-medium border rounded-md px-3 py-3 w-2/3 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100" 
              />
            </div>
          </div>
          <div className="mt-5 flex">
            <button 
              onClick={handleSaveChanges} 
              className="flex items-center ml-auto bg-indigo-600 text-white px-4 py-3 font-semibold rounded-md hover:bg-indigo-700"
            >
              <Check className="mr-2" size={21}/> Lưu thay đổi
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
