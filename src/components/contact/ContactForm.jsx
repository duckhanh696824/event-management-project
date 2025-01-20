import { Clock, FileText, MailIcon, MessageCircleCode, Phone, UniversityIcon } from 'lucide-react';
import React from 'react';

const ContactForm = () => {
  return (
    <section className="contact py-14" data-scroll-index="6">
      <div className="container mx-auto px-4">
        <div className="text-center">
          <h3 className="text-4xl font-bold mb-4 text-indigo-800">Contact us</h3>
          <span className="block w-16 h-1 bg-gray-800 mx-auto mb-4 bg-indigo-800"></span>
          <p className="text-gray-600 text-lg">
            Trang web giải đáp mọi thắc mắc của sinh viên Khoa Công nghệ Thông tin về các hoạt động, sự kiện.
          </p>
        </div>
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-3 gap-8 bg-gray-100 p-9 rounded-2xl shadow-xl">
          <div className="lg:col-span-2">
            <form id="contact_form">
            <div className="flex items-center text-indigo-800 mb-3 gap-2">
                <FileText className="w-6 h-6" />
                <h3 className="text-xl font-semibold">Thông tin cá nhân</h3>
            </div>
                <input
                  type="text"
                  id="your_name"
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 mb-6"
                  name="full-name"
                  placeholder="Họ tên"
                  required
                />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-6">
                <input
                  type="text"
                  id="your_name"
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                  name="full-name"
                  placeholder="Mã số sinh viên"
                  required
                />
                <input
                  type="email"
                  id="email"
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                  name="email"
                  placeholder="Email"
                  required
                />
              </div>
              <div className="flex items-center text-indigo-800 mb-3 gap-2">
                <MessageCircleCode className="w-6 h-6" />
                <h3 className="text-xl font-semibold">Nội dung</h3>
            </div>
              {/* <input
                type="text"
                id="subject"
                className="form-input h-10 px-4 bg-white border border-gray-300 rounded-full mb-4 transition-all"
                name="subject"
                placeholder="Subject"
              /> */}
              <textarea
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl min-h-[120px] focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                id="message"
                placeholder="Bạn cần liên hệ về vấn đề gì"
                name="message"
              ></textarea>
              <button
                className="py-2 px-8 inline-block text-white rounded-full bg-indigo-600 cursor-pointer mt-3 hover:bg-indigo-700 transition-all"
                type="submit"
                name="button"
              >
                Submit
              </button>
            </form>
          </div>
          <div className="contact-info p-8 rounded-xl bg-gradient-to-l from-indigo-600 to-indigo-300 text-white shadow-lg">
          <h2 className="text-2xl font-bold text-white-800 mb-7 flex items-center">
                Thông tin liên hệ
              </h2>
              <div className="space-y-4">
                <div className="flex items-start space-x-4 mb-7">
                  <div className="bg-indigo-50 p-3 rounded-lg">
                    <UniversityIcon className="w-6 h-6 text-indigo-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-white-800">
                      Văn phòng khoa CNTT: E1 - 02.06
                    </p>
                    <p className="text-white/80 text-sm">
                      Trường Đại học Công nghệ TP.HCM 
                    </p>
                  </div>
                </div>
            </div>
            <div className="flex items-start space-x-4 mb-7">
                <div className="bg-green-50 p-3 rounded-lg">
                <MailIcon className="w-6 h-6 text-green-600" />
                </div>
                <div>
                <p className="font-semibold text-white-800">Email</p>
                <a
                    href="mailto:contact@uit.edu.vn"
                    className="text-white/80 hover:text-indigo-800 transition-colors"
                >
                    khoa.cntt@hutech.edu.vn
                </a>
                </div>
            </div>
            <div className="flex items-start space-x-4 mb-7">
                <div className="bg-blue-50 p-3 rounded-lg">
                <Phone className="w-6 h-6 text-red-600" />
                </div>
                <div>
                <p className="font-semibold text-white-800">Số điện thoại</p>
                <a
                    href="tel:+84123456789"
                    className="text-white/80 hover:text-indigo-800 transition-colors"
                >
                    (028) 7101 2388
                </a>
                </div>
            </div>
            <div className="flex items-start space-x-4">
                <div className="bg-blue-50 p-3 rounded-lg">
                <Clock className="w-6 h-6 text-yellow-600" />
                </div>
                <div>
                <p className="font-semibold text-white-800">Giờ làm việc</p>
                <a
                    // href="tel:+84123456789"
                    className="text-white/80 text-base"
                >
                    07:30 am - 16:30 pm
                </a>
                </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
