import { useState, useEffect, useRef } from "react";
import { generateMockData, updateMarketData } from "../lib/market-data";
import { MarketItem } from "./MarketItem";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

const CATEGORIES = [
  { id: "hot", title: "Hot List", icon: "🔥" },
  { id: "new", title: "New Coins", icon: "⭐" },
  { id: "gainers", title: "Top Gainers", icon: "📈" },
];

export function MobileSlider({ isInView }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [marketData, setMarketData] = useState({
    hot: [],
    new: [],
    gainers: [],
  });
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const sliderRef = useRef(null);

  // Minimum swipe distance (in px)
  const minSwipeDistance = 50;

  useEffect(() => {
    const initialData = {
      hot: generateMockData("hot"),
      new: generateMockData("new"),
      gainers: generateMockData("gainers"),
    };
    setMarketData(initialData);
  }, []);

  useEffect(() => {
    if (!isInView) return;

    const interval = setInterval(() => {
      setMarketData((prev) => ({
        hot: updateMarketData(prev.hot),
        new: updateMarketData(prev.new),
        gainers: updateMarketData(prev.gainers),
      }));
    }, 3500);

    return () => clearInterval(interval);
  }, [isInView]);

  const onTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe && currentSlide < CATEGORIES.length - 1) {
      setCurrentSlide(currentSlide + 1);
    }
    if (isRightSwipe && currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const nextSlide = () => {
    if (currentSlide < CATEGORIES.length - 1) {
      setCurrentSlide(currentSlide + 1);
    }
  };

  const prevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  return (
    <div className="w-full max-w-full">
      {/* Slider Container */}
      <div
        ref={sliderRef}
        className="relative w-full bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl overflow-hidden min-h-[450px]"
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        {/* Slides */}
        {CATEGORIES.map((category, index) => (
          <div
            key={category.id}
            className={`w-full p-6 absolute top-0 left-0 transition-all duration-300 ease-in-out ${
              index === currentSlide
                ? "opacity-100 translate-x-0 z-10"
                : index < currentSlide
                ? "opacity-0 -translate-x-full z-0"
                : "opacity-0 translate-x-full z-0"
            }`}
          >
            <div className="flex items-center gap-2 mb-6">
              <span className="text-xl">{category.icon}</span>
              <h3 className="text-lg font-semibold text-white">
                {category.title}
              </h3>
            </div>

            <div className="space-y-3">
              {marketData[category.id] && marketData[category.id].length > 0 ? (
                marketData[category.id].map((item, itemIndex) => (
                  <MarketItem
                    key={item.id}
                    data={item}
                    index={itemIndex}
                    isInView={isInView}
                  />
                ))
              ) : (
                <div className="text-gray-400 text-center py-8">Loading...</div>
              )}
            </div>
          </div>
        ))}

        {/* Navigation Arrows */}
        <button
          onClick={prevSlide}
          className={`absolute left-4 top-1/2 -translate-y-1/2 bg-gray-800/80 hover:bg-gray-700/80 text-white p-2 rounded-full transition-colors duration-200 z-20 ${
            currentSlide === 0 ? "opacity-50 cursor-not-allowed" : "opacity-100"
          }`}
          disabled={currentSlide === 0}
          aria-label="Previous slide"
        >
          <IoIosArrowBack size={22} />
        </button>

        <button
          onClick={nextSlide}
          className={`absolute right-4 top-1/2 -translate-y-1/2 bg-gray-800/80 hover:bg-gray-700/80 text-white p-2 rounded-full transition-colors duration-200 z-20 ${
            currentSlide === CATEGORIES.length - 1
              ? "opacity-50 cursor-not-allowed"
              : "opacity-100"
          }`}
          disabled={currentSlide === CATEGORIES.length - 1}
          aria-label="Next slide"
        >
          <IoIosArrowForward size={22}/>
        </button>
      </div>

      {/* Dots Indicator */}
      <div className="flex justify-center gap-2 mt-6">
        {CATEGORIES.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-2 h-2 rounded-full transition-colors duration-200 ${
              index === currentSlide ? "bg-violet-500" : "bg-gray-600"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
