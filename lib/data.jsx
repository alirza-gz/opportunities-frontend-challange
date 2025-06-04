import { AiOutlineFire } from "react-icons/ai";
import { IoMdStarOutline } from "react-icons/io";
import { HiArrowTrendingUp } from "react-icons/hi2";

export const CATEGORIES = [
  { id: "hot", title: "Hot List", icon: <AiOutlineFire size={16}/> },
  { id: "new", title: "New Coins", icon: <IoMdStarOutline size={16}/> },
  { id: "gainers", title: "Top Gainers", icon: <HiArrowTrendingUp size={16}/> },
];