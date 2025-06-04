import React, { useEffect, useRef, useState } from "react";
import { MobileSlider } from "./MobileSlider";
import { MarketList } from "./MarketList";
import { BiBarChartSquare } from "react-icons/bi";
import { IoMdArrowForward } from "react-icons/io";
import { HiArrowLongRight } from "react-icons/hi2";

function OpportunitiesSection() {
  const ref = useRef(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { rootMargin: "-100px" }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  return (
    <section
      ref={ref}
      className="min-h-screen bg-black text-white py-12 md:py-20"
    >
      <div className="w-full max-w-7xl mx-auto px-4">
        {/* Badge */}
        <div
          className={`flex justify-center mb-6 md:mb-8 transform transition-all duration-500 ${
            isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
          }`}
        >
          <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-full px-4 py-2 text-sm text-gray-300 flex items-center">
          <BiBarChartSquare size={20} className="mr-1 text-violet-500"/>
            <p>New opportunities</p>
          </div>
        </div>

        {/* Title */}
        <div
          className={`text-center mb-4 md:mb-6 transform transition-all duration-700 delay-200 ${
            isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <h2 className="text-3xl md:text-6xl font-bold leading-tight">
            <span className="text-violet-500">TRADE</span>{" "}
            <span className="text-white">YOUR</span>
            <br />
            <span className="text-white">FAVOURITE MARKETS</span>
          </h2>
        </div>

        {/* Description with Blur Effect */}
        <div
          className={`text-center mb-6 md:mb-8 transition-all duration-1000 delay-500 ${
            isInView ? "opacity-100 blur-none" : "opacity-0 blur-md"
          }`}
        >
          <p className="text-gray-400 text-base md:text-lg max-w-2xl mx-auto leading-relaxed px-4">
            Want to buy Bitcoin outright or trade CFDs on Gold or EUR/USD? We've
            got you covered with access to 100+ global markets on one platform.
          </p>
        </div>

        {/* Button */}
        <div
          className={`flex justify-center mb-12 md:mb-16 transform transition-all duration-500 delay-800 ${
            isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
          }`}
        >
          <button className="bg-violet-600 hover:bg-violet-700 text-white px-6 md:px-12 py-3 rounded-xl font-medium transition-colors duration-200 flex items-center gap-2 text-sm md:text-base">
            View All coins
            <HiArrowLongRight size={25} />
          </button>
        </div>

        {/* Market Lists - Show mobile slider on small screens, desktop grid on larger screens */}
        <div
          className={`w-full transform transition-all duration-700 delay-1000 ${
            isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          {/* Mobile Slider - visible only on screens smaller than 768px */}
          <div className="block md:hidden">
            <MobileSlider isInView={isInView} />
          </div>

          {/* Desktop Grid - visible only on screens 768px and larger */}
          <div className="hidden md:block">
            <MarketList isInView={isInView} />
          </div>
        </div>
      </div>
    </section>
  );
}

export default OpportunitiesSection;
