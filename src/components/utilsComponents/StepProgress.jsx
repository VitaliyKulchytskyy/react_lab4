function Step({ state = false }) {
    return (
        <>
            {state ? (
                <div className="size-[12px] rounded-full bg-step_done"></div>
            ) : (
                <div className="size-[12px] border-[1px] border-default rounded-full bg-white"></div>
            )}
        </>
    );
}

function Line({ state = false }) {
    const bg = state ? "#007AFF" : "#B9B9C3";
    return (
        <div
            className="bg-default w-[40px] h-[.75px] border-spacing-2 mx-4"
            style={{ background: bg }}
        ></div>
    );
}

export default function StepProgress({ step, stepNum }) {
    return (
        <div className="h-[12px] flex flex-row items-center">
            {[...Array(stepNum)].map((e, i) => (
                <>
                    <Step state={i < step} />
                    {i !== stepNum - 1 && <Line state={i < step - 1} />}
                </>
            ))}
        </div>
    );
}
