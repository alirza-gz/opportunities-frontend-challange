import { useState, useEffect, useRef } from "react";
import { formatSubZeroNumber } from "../lib/utils";
import { MdOutlineSwapHorizontalCircle } from "react-icons/md";

export function MarketItem({ data }) {
  const [isAnimating, setIsAnimating] = useState(false);
  const prevRankRef = useRef(data.rank);
  const itemRef = useRef(null);

  const isPositive = data.change >= 0;
  const changeColor = isPositive ? "text-green-400" : "text-red-400";
  const changeSign = isPositive ? "+" : "";

  useEffect(() => {
    if (prevRankRef.current !== data.rank) {
      setIsAnimating(true);
      const timer = setTimeout(() => {
        setIsAnimating(false);
      }, 1000);
      return () => clearTimeout(timer);
    }
    prevRankRef.current = data.rank;
  }, [data.rank]);

  return (
    <div
      ref={itemRef}
      className={`flex items-center justify-between relative p-3 rounded-xl bg-gray-800/30 hover:bg-gray-800/50 transition-all duration-300 group ${
        isAnimating ? "bg-gray-700/50" : ""
      }`}
    >
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-full overflow-hidden flex items-center justify-center">
          <img
            src={`assets/images/${data.symbol.toLowerCase()}.svg`}
            width={32}
            height={32}
            alt={data.symbol}
            className="object-cover"
          />
        </div>
        <div>
          <div className="font-semibold text-white text-sm">{data.symbol}</div>
          <div className="text-gray-400 text-xs">{data.name}</div>
        </div>
      </div>

      <div className="text-right mr-2">
        <div className="text-white font-semibold text-sm">
          {formatSubZeroNumber(data.price)}
        </div>
        <div className={`text-xs ${changeColor}`}>
          {changeSign}
          {data.change.toFixed(2)}%
        </div>
      </div>
      <button className="bg-violet-500 hover:bg-violet-600 rounded-sm p-0.5 absolute -right-3 opacity-0 group-hover:opacity-100 transition ease-in-out duration-300">
        <MdOutlineSwapHorizontalCircle size={18} className="text-white"/>
      </button>
    </div>
  );
}
