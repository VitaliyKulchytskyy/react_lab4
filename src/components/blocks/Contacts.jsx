import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import FieldError from "../utilsComponents/FieldError";
import DefaultInput from "../inputs/DefaultInput";
import NextStep from "../buttons/NextStep";
import BlockLayout from "../layout/BlockLayout";
import { useEffect, useState } from "react";
import AutoCombobox from "../inputs/AutoCombobox";
import { socialNetworks } from "../../utils/socialNetworkOptions";

const formSchema = z.object({
    nickname: z
        .string()
        .min(2, { message: "Profile ID must contain at least 2 characters" })
        .startsWith("@"),
});

const snSchemas = z.object({
    socialNetwork: z.array(formSchema),
});

function SocialNetwork({ register, err, name = "", selectedSnRef = {} }) {
    const [selectedSn, setSelectedSn] = useState(socialNetworks[0]);
    const [profileId, setProfileId] = useState("");

    useEffect(() => {
        selectedSnRef.socialNetwork = selectedSn.value;
        selectedSnRef.id = profileId;
    }, [profileId, selectedSn]);

    return (
        <div className="flex flex-row ">
            <AutoCombobox
                options={socialNetworks}
                className="w-20 mr-6"
                value={selectedSn}
                onChange={setSelectedSn}
            />
            <div className="mb-8 w-[100%]">
                <DefaultInput>
                    <input
                        // {...register("nickname")}
                        type="text"
                        name={name}
                        value={profileId}
                        onChange={(e) => setProfileId(e.target.value)}
                        className="h-10"
                        placeholder="@profile"
                    />
                </DefaultInput>
                {/* {err && <FieldError message={err.message} />} */}
            </div>
        </div>
    );
}

export default function Contacts({
    onSubmitCallback = (data) => {},
    email = "",
    phoneNumber = "",
}) {
    const {
        // register,
        handleSubmit,
        // formState: { errors },
    } = useForm({
        // resolver: zodResolver(formSchema),
    });

    const [socialNetworkNum, setSocialNetworkNum] = useState(1);
    const [socialNetworkInput, setSocialNetworkInput] = useState([{}]);

    const onSubmit = (data) => {
        onSubmitCallback({ socialNetworks: socialNetworkInput });
    };

    const addSocialNetwork = (e) => {
        e.preventDefault();
        setSocialNetworkInput([...socialNetworkInput, {}]);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <BlockLayout
                name="Contacts"
                description="These contacts are used to inform about orders"
            >
                <div className="mb-8">
                    <div>
                        <DefaultInput>
                            <img
                                src="../../../public/mail.svg"
                                alt="mail icon"
                                className="mr-4"
                            />
                            <div>{email}</div>
                        </DefaultInput>
                    </div>
                </div>
                <div className="mb-8">
                    <div>
                        <DefaultInput>
                            <img
                                src="../../../public/phone.svg"
                                alt="mail icon"
                                className="mr-4"
                            />
                            <div>{phoneNumber}</div>
                        </DefaultInput>
                    </div>
                </div>
                <div className="mb-8">
                    <div className="font-[Roboto] font-semibold text-[20px]">
                        Social network
                    </div>
                    <div className="font-[Poppins] text-[12px] text-secondary_text font-light">
                        Indicate the desired communication method
                    </div>
                </div>
                <div>
                    <div>
                        {socialNetworkInput.map((value, index) => (
                            <SocialNetwork
                                // register={register}
                                // err={errors.nickname}
                                selectedSnRef={socialNetworkInput[index]}
                            />
                        ))}
                    </div>
                    <div>
                        <button onClick={addSocialNetwork}>
                            <div className="flex flex-row items-center">
                                <img
                                    src="../../../public/add.svg"
                                    alt="add icon"
                                    className="mr-3 size-[14px]"
                                />
                                <div className="font-[Roboto] font-bold text-step_done text-[16px]">
                                    Add More
                                </div>
                            </div>
                        </button>
                    </div>
                </div>
            </BlockLayout>
            <button type="submit">
                <NextStep label="Go Next →" />
            </button>
        </form>
    );
}
