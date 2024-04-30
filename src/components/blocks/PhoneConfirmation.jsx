import DefaultInput from "../inputs/DefaultInput";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import FieldError from "../utilsComponents/FieldError";
import NextStep from "../buttons/NextStep";
import SendAgain from "../buttons/SendAgain";

const confirmCode = "1234";
const formSchema = z
    .object({
        code: z
            .string()
            .min(4, { message: "Code must contains at least 4 numbers" })
            .max(4, { message: "Code must contains at most 4 numbers" }),
    })
    .refine((data) => data.code.match(confirmCode), {
        message: "The confirmation code not valid",
        path: ["code"],
    });

export default function PhoneNumberConfirmation({
    onConfirmCallback = () => {},
}) {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(formSchema),
    });

    const onSendAgain = () => {
        alert(`Confirmation code: ${confirmCode}`);
    };

    const onSubmit = (data) => {
        onConfirmCallback();
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col mb-8">
                <div className="font-[Poppins] text-[13px]">
                    Confirmation code
                </div>
                <div className="flex flex-row justify-between items-end mb-2">
                    <DefaultInput>
                        <input
                            {...register("code", {
                                required: true,
                            })}
                            type="text"
                            placeholder="- - - -"
                        />
                    </DefaultInput>
                    <SendAgain onClick={onSendAgain} className="px-4" />
                </div>
                <div>
                    {errors.code && (
                        <FieldError message={errors.code.message} />
                    )}
                    <div className="font-[Poppins] text-[12px] text-secondary_text">
                        Confirm phone number with code from sms<br></br> message
                    </div>
                </div>
            </div>
            <button type="submit">
                <NextStep label="Confirm" />
            </button>
        </form>
    );
}
