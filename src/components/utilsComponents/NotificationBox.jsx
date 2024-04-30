import { useState } from "react";

export const notificationType = {
    Secure: { id: 0, icon: "../../../public/lock.svg" },
};

export default function NotificationBox({
    message,
    className="",
    type = notificationType.Secure,
}) {
    const [isHide, setHide] = useState(false);

    const iconPath = type.icon;
    return (
        <>
            {!isHide && (
                <div className={"flex flex-row justify-between h-[68px] w-auto p-4 bg-notification_box " + className}>
                    <img
                        src={iconPath}
                        alt="notification icon"
                        className="size-6"
                    />
                    <div className="font-[Poppins] text-[13px] break-words h-9 w-[344px] ml-4">
                        {message}
                    </div>
                    <img
                        src="../../../public/cross.svg"
                        alt="exit sign"
                        className="size-6"
                        onClick={() => setHide(true)}
                    />
                </div>
            )}
        </>
    );
}
