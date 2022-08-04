import { clearUserData, setUserData } from "../util.js";
import { get, post } from "./api.js";

export async function login(/* properties */) {
const result = await post('/users/login', { /* properties */ });

    const userData = {
        // id: result._id,
        // username: result.username,
        // email: result.email,
        // gender: result.gender,
        // accessToken: result.accessToken
    };

    setUserData(userData);

    return result;
}

export async function register(/* properties */) {
    const result = await post('/users/register', { /* properties */ });

    const userData = {
        // id: result._id,
        // username: result.username,
        // email: result.email,
        // gender: result.gender,
        // accessToken: result.accessToken
    };

    setUserData(userData);

    return result;
}

export function logout() {
    get('/users/logout');
    clearUserData();
}