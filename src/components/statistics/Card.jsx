export default function Card({ children }) {
  return (
    <div className="px-4 py-5 bg-[#272727] rounded-lg flex flex-col gap-2">
      {children}
    </div>
  );
}
