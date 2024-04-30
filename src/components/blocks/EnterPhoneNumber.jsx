import AutoCombobox from "../inputs/AutoCombobox";
import { OnInputPhoneNumber } from "../../utils/inputPatterns";
import { numbers } from "../../utils/numberOptions";
import FieldError from "../utilsComponents/FieldError";
import DefaultInput from "../inputs/DefaultInput";
import { useState } from "react";
import NextStep from "../buttons/NextStep";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

const formSchema = z.object({
    phone: z
        .string()
        .min(12, { message: "Phone number doesn't match the format" }),
});

export default function EnterPhoneNumber({
    isConfirmed = false,
    onSumbitCallback = (data) => {},
    onEditModeCallback = () => {},
}) {
    const [selectedNumber, setSelectedNumber] = useState(numbers[0].value);
    const [phoneNumber, setPhoneNumber] = useState("");
    const [isPhoneEditMode, setPhoneEditMode] = useState(false);
    const [fullPhoneNumber, setFullPhoneNumber] = useState("");

    const onPhoneNumberChange = (e) => {
        setPhoneNumber(OnInputPhoneNumber(e.target.value));
    };

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(formSchema),
    });

    const toggleEditMode = () => {
        setPhoneEditMode(!isPhoneEditMode);
    };

    const onSubmit = (data) => {
        toggleEditMode();
        const fullPhoneNumber = selectedNumber + " " + data.phone; 
        setFullPhoneNumber(fullPhoneNumber);
        onSumbitCallback({phone: fullPhoneNumber});
    };

    return (
        <>
            {isPhoneEditMode ? (
                <div className="flex flex-col mb-8 p-4 border-[1px] rounded-md">
                    <div className="font-[Roboto] text-[18px]">
                        {fullPhoneNumber}
                    </div>
                    {!isConfirmed ? (
                        <div className="flex flex-row justify-between">
                            <div>
                                <span className="font-[Poppins] font-light text-[13px] text-secondary_text">
                                    Number not confirmed yet
                                </span>
                            </div>
                            <img
                                src="../../../public/edit.svg"
                                alt="edit icon"
                                onClick={() => {
                                    toggleEditMode();
                                    onEditModeCallback();
                                }}
                            />
                        </div>
                    ) : (
                        <div className="flex flex-row">
                            <img
                                src="../../../public/confirmed.svg"
                                alt="confirmed icon"
                                className="mr-2"
                                onClick={() => {
                                    toggleEditMode();
                                    onEditModeCallback();
                                }}
                            />
                            <div>
                                <span className="font-[Poppins] font-light text-[13px] text-secondary_text">
                                    Number confirmed
                                </span>
                            </div>
                        </div>
                    )}
                </div>
            ) : (
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="flex flex-col mb-8 p-8 border-[1px] rounded-md">
                        <div className="pb-8 font-[Poppins] text-[14px]">
                            Enter your phone number
                        </div>
                        <div className="flex flex-row mx-auto">
                            <AutoCombobox
                                options={numbers}
                                value={selectedNumber}
                                onChange={setSelectedNumber}
                                className="w-10 mr-6"
                            />
                            <DefaultInput>
                                <input
                                    {...register("phone", {
                                        required: true,
                                    })}
                                    type="text"
                                    onChange={onPhoneNumberChange}
                                    value={phoneNumber}
                                    placeholder={OnInputPhoneNumber(
                                        "1234567890"
                                    )}
                                />
                            </DefaultInput>
                        </div>
                        {errors.phone && (
                            <FieldError message={errors.phone.message} />
                        )}
                    </div>
                    <button type="submit">
                        <NextStep label="Send code" />
                    </button>
                </form>
            )}
        </>
    );
}
