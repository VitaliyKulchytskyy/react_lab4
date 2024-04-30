import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import FieldError from "../utilsComponents/FieldError";
import SubmitButton from "../buttons/SubmitButton";
import DefaultInput from "../inputs/DefaultInput";
import BlockLayout from "../layout/BlockLayout";

const formSchema = z.object({
    address: z.string().min(1),
    city: z.string().min(1),
    country: z.string().min(1),
    zipCode: z.string().min(5).max(5),
    optional: z.string(),
});

export default function DeliveryAddress({ onSubmitCallback = (data) => {} }) {
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
            <BlockLayout name="Delivery address" description="Used for shipping orders"> 
                <div className="mb-8">
                    <div className="font-[Poppins] text-[14px]">Address</div>
                    <div>
                        <DefaultInput>
                            <input
                                {...register("address", {
                                    required: true,
                                })}
                                type="text"
                            />
                        </DefaultInput>
                    </div>
                    {errors.address && (
                        <FieldError message={errors.address.message} />
                    )}
                </div>
                <div className="mb-8">
                    <div className="font-[Poppins] text-[14px]">City</div>
                    <div>
                        <DefaultInput>
                            <input
                                {...register("city", {
                                    required: true,
                                })}
                                type="text"
                            />
                        </DefaultInput>
                    </div>
                    {errors.city && (
                        <FieldError message={errors.city.message} />
                    )}
                </div>
                <div className="flex flex-row mb-8">
                    <div className="mr-8">
                        <div className="font-[Poppins] text-[14px]">
                            Country
                        </div>
                        <div>
                            <DefaultInput>
                                <input
                                    {...register("country", {
                                        required: true,
                                    })}
                                    type="text"
                                />
                            </DefaultInput>
                        </div>
                        {errors.country && (
                            <FieldError message={errors.country.message} />
                        )}
                    </div>
                    <div>
                        <div className="font-[Poppins] text-[14px]">
                            Zip code
                        </div>
                        <div>
                            <DefaultInput>
                                <input
                                    {...register("zipCode", {
                                        required: true,
                                    })}
                                    type="text"
                                />
                            </DefaultInput>
                        </div>
                        {errors.zipCode && (
                            <FieldError message={errors.zipCode.message} />
                        )}
                    </div>
                </div>
                <div className="mb-8">
                    <div className="font-[Poppins] text-[14px]">Optional</div>
                    <div>
                        <DefaultInput>
                            <input
                                {...register("optional", {
                                    required: true,
                                })}
                                type="text"
                            />
                        </DefaultInput>
                    </div>
                </div>
            </BlockLayout>
            <button type="submit">
                <SubmitButton label="Save">
                    <img
                        src="../../../public/confirmedWhite.svg"
                        alt="confirmed icon"
                        className="mr-2 size-[14px]"
                    />
                </SubmitButton>
            </button>
        </form>
    );
}
