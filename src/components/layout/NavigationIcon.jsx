import { Link, useMatch } from "react-router-dom";
export default function NavigationIcon({ Icon, to }) {
  const isActive = useMatch(to);
  return (
    <Link
      to={to}
      className={`flex flex-col items-center justify-center h-full aspect-square transition-colors duration-300 ${
        isActive ? "text-[#72D9FF]" : "text-[#d4d4d8]"
      }`}
    >
      <Icon className="size-6" />
    </Link>
  );
}
