import { RiPoliceBadgeFill } from "react-icons/ri";

export default function Badge({ src }) {
  return (
    <div className="flex justify-center items-center min-w-20 aspect-11/12 bg-[#484848] rounded-lg relative">
      {src && (
        <img
          src={src}
          alt="badge"
          className="size-full object-cover"
          loading="lazy"
          fetchPriority="high"
        />
      )}
      <RiPoliceBadgeFill className="size-4 text-[#555555] absolute center-0 size-10" />
    </div>
  );
}
