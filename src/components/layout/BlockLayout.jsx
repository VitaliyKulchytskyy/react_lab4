export default function BlockLayout({ children, name = "", description = "" }) {
    return (
        <div className="flex flex-col mb-8 p-8 border-[1px] rounded-md">
            <div className="font-[Roboto] font-semibold text-[20px]">
                {name}
            </div>
            <div className="font-[Poppins] text-[12px] text-secondary_text font-light mb-8">
                {description}
            </div>
            {children}
        </div>
    );
}
