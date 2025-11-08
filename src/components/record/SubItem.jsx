
export default function SubItem({icon, title, value}){
    return (
        <div className="flex flex-col items-center flex-1">
            <span>{icon}</span>
            <span className="text-2xl font-black mt-2">{value}</span>
            <span className="text-[#d4d4d8]">{title}</span>
        </div>
    )
}