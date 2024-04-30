export const userSchema = {
    phone: "",
    email: "",
    password: "",
    firstName: "",
    secondName: "",
    dateOfBirth: "",
    birthPlace: "",
    socialNetworks: [],
    address: "",
    city: "",
    country: "",
    zipCode: "",
    optional: ""
};

/**
 * User's props (defined in userSchema). Read-only (for out of the storage.js)
 */ 
export let userData = {};

/**
 * Update an origin schema using values from another 
 * schema by the same keys
 * @param {*} origin the schema update to 
 * @param {*} part the schema get values from
 * @returns updated origin dictionary 
 */
export function updatePartOfSchema(origin, part) {
    console.log("here");
    for (let key in part) {
        if (origin.hasOwnProperty(key))
            origin[key] = part[key];
    }
    return origin;
}

/**
 * userData saving workaround 
 */ 
export function saveToUserStorage(obj) {
    userData = obj;
}

/**
 * macro 
 * @param {*} data input part of the schema to update userSchema 
 */
export const onUserSchemaUpdate = (data) => {
    saveToUserStorage(updatePartOfSchema(userSchema, data));
};