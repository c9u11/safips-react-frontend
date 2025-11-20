import { FaChevronRight } from "react-icons/fa6";
import { Link } from "react-router-dom";

export default function SectionHeader({ title, detail, link }) {
  return (
    <div className="w-full flex justify-between items-center">
      <span className="text-xl">{title}</span>
      {link && (
        <Link
          to={link}
          className="text-sm text-[#767676] flex items-center gap-1"
        >
          {detail}
          <FaChevronRight className="size-3" />
        </Link>
      )}
    </div>
  );
}
