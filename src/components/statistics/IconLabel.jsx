export default function IconLabel({ icon, label, unit }) {
  return (
    <div className="flex items-center gap-1">
      {icon}
      <div className="flex items-baseline gap-1">
        <span>{label}</span>
        {unit && <span className="text-xs">{unit}</span>}
      </div>
    </div>
  );
}
