export default function Item({ title, value }) {
  return (
    <div className="flex flex-col">
      <span className="text-sm text-[#767676]">{title}</span>
      <span className="text-2xl font-bold">{value}</span>
    </div>
  );
}
