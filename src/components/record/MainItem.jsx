

export default function MainItem({icon, title, value}){
    return (
        <div className="flex flex-col w-full items-center">
            <span>{icon}</span>
            <span className="text-7xl font-black mt-3">{value}</span>
            <span className="text-[#d4d4d8]">{title}</span>
        </div>
    )
}