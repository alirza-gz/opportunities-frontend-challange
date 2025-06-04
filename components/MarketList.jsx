import { useState, useEffect } from "react";
import { generateMockData, updateMarketData } from "../lib/market-data";
import { MarketItem } from "./MarketItem";
import { AiOutlineFire } from "react-icons/ai";
import { IoMdStarOutline } from "react-icons/io";
import { HiArrowTrendingUp } from "react-icons/hi2";

const CATEGORIES = [
  { id: "hot", title: "Hot List", icon: <AiOutlineFire size={16}/> },
  { id: "new", title: "New Coins", icon: <IoMdStarOutline size={16}/> },
  { id: "gainers", title: "Top Gainers", icon: <HiArrowTrendingUp size={16}/> },
];

export function MarketList({ isInView }) {
  const [marketData, setMarketData] = useState({
    hot: [],
    new: [],
    gainers: [],
  });

  useEffect(() => {
    // Initialize data
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

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {CATEGORIES.map((category, index) => (
        <div
          key={category.id}
          className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-6 transition-all duration-500 text-violet-400"
          style={{ transitionDelay: `${200 + index * 100}ms` }}
        >
          <div className="flex items-center gap-x-1 mb-6">
            <span>{category.icon}</span>
            <h3 className="text-sm font-semibold ">
              {category.title}
            </h3>
          </div>

          <div className="space-y-3">
            {marketData[category.id].map((item, itemIndex) => (
              <MarketItem
                key={item.id}
                data={item}
                index={itemIndex}
                isInView={isInView}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
