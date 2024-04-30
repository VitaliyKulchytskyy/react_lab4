import PageLayout from "../layout/PageLayout";
import PersonalData from "../blocks/PersonalData";
import DeliveryAddress from "../blocks/DeliveryAddress";
import Contacts from "../blocks/Contacts";
import { useState } from "react";
import { userData, onUserSchemaUpdate } from "../../utils/storage";

export default function ProfileInfo() {
    const [progress, setProgress] = useState(1);
    const [isPersonalData, setPersonalData] = useState(true);
    const [isContacts, setContacts] = useState(false);
    const [isDeliveryAddress, setDeliveryAddress] = useState(false);

    return (
        <PageLayout
            name="Profile Info"
            description="Fill in the data for profile. It will take a couple of minutes. 
            You only need a passport"
            step={progress}
        >
            {isPersonalData && (
                <PersonalData
                    onSubmitCallback={(data) => {
                        setProgress(2);
                        setContacts(true);
                        setPersonalData(false);
                        onUserSchemaUpdate(data);
                    }}
                />
            )}
            {isContacts && (
                <Contacts
                    email={userData.email}
                    phoneNumber={userData.phone}
                    onSubmitCallback={(data) => {
                        setProgress(3);
                        setDeliveryAddress(true);
                        setContacts(false);
                        onUserSchemaUpdate(data);
                    }}
                />
            )}
            {isDeliveryAddress && (
                <DeliveryAddress
                    onSubmitCallback={(data) => {
                        onUserSchemaUpdate(data);
                        console.log(userData);
                    }}
                />
            )}
        </PageLayout>
    );
}
