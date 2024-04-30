/**
 * Parse input value (sequence of numbers) into the phone number format
 * @example 1234567890 => 123 456-7890; a234567890 => 234 567-890
 * @param {*} value input value to parse from 
 * @returns formated phone number 
 */
export function OnInputPhoneNumber(value) {
    if (value == "")
        return "";

    const phoneNumberLen = 10;
    const origin = value.replace(/\D/g, '').slice(0, phoneNumberLen);
    const layout = origin + "A".repeat(phoneNumberLen - origin.length);

    let regex = "$1";
    if (value.length > 3 && value.length <= 7)
        regex = "$1 $2";
    else if (value.length > 7)
        regex = "$1 $2-$3";

    return layout.replace(/(\w{3})(\w{3})(\w{4})/, regex).replace(/A/g, "");
}