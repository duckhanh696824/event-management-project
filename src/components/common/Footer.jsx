import React from "react";
import {
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  MapPin,
  Phone,
  Mail,
} from "lucide-react";

const HutechLogo = ["/assets/images/logo/itevent3.png"];

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-12 shadow-lg mt-auto">
      <div className="container mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 gap-8">
        {/* University Info Section */}
        <div className="flex flex-col items-center sm:items-start space-y-4">
          <img
            src={HutechLogo}
            alt="IT Event Logo"
            className="h-20 object-contain mb-3 lg:mb-4"
          />
          <div className="flex flex-col items-center lg:block text-center space-y-4 lg:space-y-3">
            <div className="flex justify-center space-x-3">
              <MapPin className="w-5 h-5 text-blue-300" />
              <span className="text-sm lg:hidden">
                Khu Công nghệ cao TP.HCM, TP.Thủ Đức, TP.HCM
              </span>
              <span className="hidden lg:block text-sm">
                Khu Công nghệ cao TP.HCM, Đường D1, P.Long Thạnh Mỹ, TP.Thủ Đức,
                TP.HCM
              </span>
            </div>
            <div className="flex items-center space-x-3">
              <Phone className="w-5 h-5 text-blue-300" />
              <span className="text-sm">
                (028) 5445 7777 - (028) 2248 3333
              </span>
            </div>
            <div className="flex items-center space-x-3">
              <Mail className="w-5 h-5 text-blue-300" />
              <span className="text-sm">hutech@hutech.edu.vn</span>
            </div>
          </div>
        </div>

        {/* Social Media Section */}
        <div className="flex flex-col items-center sm:items-start">
          <h3 className="text-xl font-bold mb-6 border-b-2 border-blue-400 pb-2">
            Kết nối với chúng tôi
          </h3>
          <div className="flex space-x-6">
            <a
              href="#"
              className="text-white hover:text-blue-200 transition-transform duration-300 hover:scale-110"
            >
              <Facebook className="w-7 h-7" />
            </a>
            <a
              href="#"
              className="text-white hover:text-blue-200 transition-transform duration-300 hover:scale-110"
            >
              <Twitter className="w-7 h-7" />
            </a>
            <a
              href="#"
              className="text-white hover:text-blue-200 transition-transform duration-300 hover:scale-110"
            >
              <Instagram className="w-7 h-7" />
            </a>
            <a
              href="#"
              className="text-white hover:text-blue-200 transition-transform duration-300 hover:scale-110"
            >
              <Youtube className="w-7 h-7" />
            </a>
          </div>
          <div className="mt-6 text-center sm:text-left">
            <p className="text-sm text-blue-200">
              &copy; {new Date().getFullYear()} Hutech University. All Rights
              Reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
