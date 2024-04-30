export default function FieldError({ message = "" }) {
    return (
        <div className="font-[Roboto] text-red-600 my-2 text-[14px]">
            {message}
        </div>
    );
}
