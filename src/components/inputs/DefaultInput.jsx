/**
 * Set default style for inner blocks
 * @param {*} children inner blocks
 * @returns styled blocks
 */
export default function DefaultInput({ children, className = "" }) {
    return (
        <div
            className={
                "flex flex-row [&>*]:outline-none border-b-2 py-2 px-6 font-[Roboto] text-[18px] focus-within:border-step_done transition-all duration-200"
            }
        >
            {children}
        </div>
    );
}
