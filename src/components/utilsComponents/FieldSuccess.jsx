export default function FieldSuccess({ message = "" }) {
    return (
        <div className="flex flex-row items-center">
            <img
                src="../../../public/confirmedGreen.svg"
                alt="success icon"
                className="size-[18px] p-[1px] ml-1"
            />
            <div className="ml-3 font-[Roboto] text-green_success my-2 text-[14px]">
                {message}
            </div>
        </div>
    );
}
