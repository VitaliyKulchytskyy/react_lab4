import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import NextStep from "../buttons/NextStep";
import FieldError from "../utilsComponents/FieldError";
import DefaultInput from "../inputs/DefaultInput";
import BlockLayout from "../layout/BlockLayout";

const formSchema = z.object({
    accept: z.literal(true, {
        errorMap: () => ({ message: "You must accept terms of use" }),
    }),
    firstName: z.string().min(1),
    secondName: z.string().min(1),
    dateOfBirth: z.string().min(1, { message: "Set the date of birth" }),
    birthPlace: z.string().min(1, { message: "Set the place of birth" }),
});

export default function PersonalData({ onSubmitCallback = (data) => {} }) {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(formSchema),
    });

    const onSubmit = (data) => {
        onSubmitCallback(data);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col mb-8 font-[Roboto]">
                <div>
                    <input
                        {...register("accept")}
                        type="checkbox"
                        className="mr-4 size-[14px]"
                    />
                    <span>
                        I agree with{" "}
                        <a className="font-bold text-step_done">Term of use</a>
                    </span>
                </div>
                {errors.accept && (
                    <FieldError message={errors.accept.message} />
                )}
            </div>

            <BlockLayout
                name="Personal data"
                description="Specify excetly as in your passport"
            >
                <div className="mb-8">
                    <div className="font-[Poppins] text-[14px]">First name</div>
                    <div>
                        <DefaultInput>
                            <input
                                {...register("firstName", {
                                    required: true,
                                })}
                                type="text"
                            />
                        </DefaultInput>
                    </div>
                    {errors.firstName && (
                        <FieldError message={errors.firstName.message} />
                    )}
                </div>
                <div className="mb-8">
                    <div className="font-[Poppins] text-[14px]">
                        Second name
                    </div>
                    <div>
                        <DefaultInput>
                            <input
                                {...register("secondName", {
                                    required: true,
                                })}
                                type="text"
                            />
                        </DefaultInput>
                    </div>
                    {errors.secondName && (
                        <FieldError message={errors.secondName.message} />
                    )}
                </div>
                <div className="flex flex-row pb-8">
                    <div className="mr-8">
                        <div className="font-[Poppins] text-[14px]">
                            Date of Birth
                        </div>
                        <div>
                            <DefaultInput>
                                <input
                                    {...register("dateOfBirth", {
                                        required: true,
                                    })}
                                    type="date"
                                />
                            </DefaultInput>
                        </div>
                        {errors.dateOfBirth && (
                            <FieldError message={errors.dateOfBirth.message} />
                        )}
                    </div>
                    <div className="w-[100%]">
                        <div className="font-[Poppins] text-[14px]">
                            Place of Birth
                        </div>
                        <div>
                            <DefaultInput>
                                <input
                                    {...register("birthPlace", {
                                        required: true,
                                    })}
                                    type="text"
                                />
                            </DefaultInput>
                        </div>
                        {errors.birthPlace && (
                            <FieldError message={errors.birthPlace.message} />
                        )}
                    </div>
                </div>
            </BlockLayout>
            <div className="flex flex-col mb-8 p-5 border-[1px] rounded-md">
                <div className="font-[Roboto] text-[18px]">123-45-678</div>
                <div className="flex flex-row">
                    <img
                        src="../../../public/confirmed.svg"
                        alt="confirmed icon"
                        className="mr-2"
                    />
                    <div>
                        <span className="font-[Poppins] font-light text-[13px] text-secondary_text">
                            Your ITIN
                        </span>
                    </div>
                </div>
            </div>
            <button type="submit">
                <NextStep label="Go Next →" />
            </button>
        </form>
    );
}
