import { IoArrowBack } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

export default function HistoryTopBar() {
  const navigate = useNavigate();

  return <div className="w-full px-6 py-3 text-xl font-bold flex items-center justify-between">
    <button
      className="h-full aspect-square flex items-center justify-center"
      onClick={() => navigate(-1)}
    >
      <IoArrowBack className="size-6 fill-[#f6f6f6]" />
    </button>
    <span>최근 기록</span>
    <button className="h-full aspect-square" />
  </div>;
}
