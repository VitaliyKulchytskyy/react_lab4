import DefaultInput from "../inputs/DefaultInput";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState } from "react";
import FieldError from "../utilsComponents/FieldError";
import FieldSuccess from "../utilsComponents/FieldSuccess";
import SubmitButton from "../buttons/SubmitButton";
import { Link, useNavigate } from "react-router-dom";

const formSchema = z
    .object({
        email: z
            .string()
            .min(1, { message: "This field has to be filled" })
            .email("This is not a valid email"),
        password: z.string().min(8, {
            message: {
                label: "Password must contains at least 8 symbols",
                isGood: false,
            },
        }),
    })
    .refine((data) => data.password.length >= 8, {
        message: {
            label: "Good password",
            isGood: true,
        },
        path: ["password"],
    });

export default function EmailPasswordInput({
    onSubmitCallback = (data) => {},
}) {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(formSchema),
    });

    const navigate = useNavigate();
    const onSubmit = (data) => {
        onSubmitCallback(data);
        navigate("/profileInfo");
    };

    const [password, setPassword] = useState("");
    const [type, setType] = useState("password");

    const handleToggle = () => {
        if (type === "password") {
            setType("text");
        } else {
            setType("password");
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col border-[1px] rounded-md p-8 mb-8">
                <div className="mb-8">
                    <div className="font-[Poppins] text-[14px]">
                        Enter your email
                    </div>
                    <DefaultInput>
                        <input
                            {...register("email", {
                                required: true,
                            })}
                            type="text"
                            placeholder="example@email.com"
                        />
                    </DefaultInput>
                    {errors.email && (
                        <FieldError message={errors.email.message} />
                    )}
                </div>
                <div className="">
                    <div className="font-[Poppins] text-[14px]">
                        Set a password
                    </div>
                    <div>
                        <DefaultInput className="justify-between">
                            <input
                                {...register("password", {
                                    required: true,
                                })}
                                type={type}
                                placeholder=""
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-[100%]"
                            />
                            <img
                                src="../../../public/showPassword.svg"
                                alt="show password icon"
                                className="size-6"
                                onClick={handleToggle}
                            />
                        </DefaultInput>
                    </div>
                    <div>
                        {errors.password && (
                            <>
                                {errors.password.message.isGood ? (
                                    <FieldSuccess
                                        message={errors.password.message.label}
                                    />
                                ) : (
                                    <FieldError
                                        message={errors.password.message.label}
                                    />
                                )}
                            </>
                        )}
                    </div>
                </div>
            </div>
            <button type="submit">
                <SubmitButton label="Register Now" />
            </button>
        </form>
    );
}
