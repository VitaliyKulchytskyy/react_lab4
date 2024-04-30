import NotificationBox from "../utilsComponents/NotificationBox";
import EnterPhoneNumber from "../blocks/EnterPhoneNumber";
import PhoneConfirmation from "../blocks/PhoneConfirmation";
import { useState } from "react";
import EmailPasswordInput from "../blocks/EmailPasswordInput";
import PageLayout from "../layout/PageLayout";
import { onUserSchemaUpdate } from "../../utils/storage";

export default function Registration() {
    const [isPhoneNumberPassed, setPhoneNumberState] = useState(false);
    const [isPhoneNumberConfirmed, setPhoneNumberConfirmState] =
        useState(false);
    const [regProgress, setRegProgress] = useState(1);

    return (
        <PageLayout
            name="Registration"
            description="Fill in the registration data. It will take a couple of minutes. 
            All you need is a phone number and e-mail."
            step={regProgress}
        >
            <div className="mb-8">
                <NotificationBox
                    message={
                        "We take privacy issues seriously. You can be sure that your personal data is securely protected."
                    }
                    className="rounded-md"
                />
            </div>
            <div>
                <div className="mb-8">
                    <EnterPhoneNumber
                        isConfirmed={isPhoneNumberConfirmed}
                        onSumbitCallback={(data) => {
                            setRegProgress(2);
                            setPhoneNumberState(true);
                            onUserSchemaUpdate(data);
                        }}
                        onEditModeCallback={() => {
                            setRegProgress(1);
                            setPhoneNumberState(false);
                        }}
                    />
                </div>
                {isPhoneNumberPassed && !isPhoneNumberConfirmed && (
                    <div className="mb-8">
                        <PhoneConfirmation
                            onConfirmCallback={(data) => {
                                setRegProgress(3);
                                setPhoneNumberConfirmState(true);
                            }}
                        />
                    </div>
                )}
                {isPhoneNumberConfirmed && (
                    <EmailPasswordInput
                        onSubmitCallback={(data) => onUserSchemaUpdate(data)}
                    />
                )}
            </div>
        </PageLayout>
    );
}
