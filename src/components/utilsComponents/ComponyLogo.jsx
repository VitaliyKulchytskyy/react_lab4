export default function CompanyLogo() {
    return (
        <div className="flex flex-row h-6 w-[174px] items-center justify-center">
            <img src="./logo.svg" alt="logo" />
            <div className="ml-3 font-[Raleway] text-sm font-semibold">
                COMPANY NAME
            </div>
        </div>
    );
}