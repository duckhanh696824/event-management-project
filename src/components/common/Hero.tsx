import React from "react";
import { PhoneCall } from "lucide-react";

const Hero = () => {
  return (
    <section className="pb-7">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Hero Search */}
        <div className="md:col-span-3">
          <div className="flex flex-wrap items-center ml-7">
            <div className="relative w-full md:w-3/4">
              <input
                type="text"
                placeholder="What do you need?"
                className="w-full p-3 border border-gray-300 focus:outline-none"
              />
            </div>
            <button className="w-full md:w-1/4 font-bold border-2 border-indigo-600
             bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 
             text-white p-3 hover:bg-green-700 ">
              SEARCH
            </button>
          </div>
        </div>
        
        {/* Hero Contact */}
        <div className="flex items-center justify-end mr-8">
          <div className="flex items-center space-x-4">
            <div className="bg-gray-100 p-4 rounded-full">
              <PhoneCall className="text-indigo-700 w-5 h-5" />
            </div>
            <div>
              <h5 className="text-lg font-semibold text-gray-900">+65 11.188.888</h5>
              <span className="text-sm text-gray-600">Support 24/7 time</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
