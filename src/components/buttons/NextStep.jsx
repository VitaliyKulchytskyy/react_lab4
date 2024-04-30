export default function NextStep({label=""}) {
    return (
        <div className="font-[Poppins] text-[16px] px-6 h-12 flex justify-center items-center border-[1px] rounded-md hover:bg-notification_box">
            {label}
        </div>
    );
}