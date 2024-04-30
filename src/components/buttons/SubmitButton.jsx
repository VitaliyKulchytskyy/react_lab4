export default function SubmitButton({children, label="", className=""}) {
    return (
        <div className="flex flex-row font-[Poppins] text-[16px] font-medium px-6 h-12 justify-center items-center rounded-md bg-step_done text-white hover:bg-blue-800">
            <div>{children}</div>
            <span>{label}</span>
        </div>
    );
}