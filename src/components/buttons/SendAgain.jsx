export default function SendAgain({ className = "", onClick = () => {} }) {
    return (
        <div
            className={"flex flex-row justify-between items-center cursor-pointer " + className}
            onClick={onClick}
        >
            <img
                src="../../../public/resend.svg"
                className="size-6 m-2"
                alt="resend icon"
            />
            <div className="font-[Roboto] text-step_done text-[18px] font-medium">
                Send again
            </div>
        </div>
    );
}
