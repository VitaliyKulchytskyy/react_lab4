import CompanyLogo from "../utilsComponents/ComponyLogo";
import StepProgress from "../utilsComponents/StepProgress";

export default function PageLayout({
    children,
    name = "",
    description = "",
    step = 1,
    stepNum = 3,
}) {
    return (
        <div className="flex flex-row flex-wrap justify-between p-[44px]">
            <CompanyLogo/>
            <div className="mx-auto min-w-[456px]">
                <div className="mt-2 mb-[80px]">
                    <StepProgress step={step} stepNum={stepNum} />
                </div>
                <div className="w-[456px] mb-8">
                    <p className="font-[Poppins] font-bold text-[32px] mb-4">
                        {name}
                    </p>
                    <p className="break-words font-[Roboto] text-[16px] text-secondary_text">
                        {description}
                    </p>
                </div>
                {children}
            </div>
            <img
                src="../../../public/main_cross.svg"
                alt="exit sign"
                className="size-12 m-2"
            />
        </div>
    );
}
