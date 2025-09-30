import { API_URL } from "../../shared/config/constants";
import { getData } from "../ComplexTripForm/api";


export async function registerAPI(payload) {
    const response = await fetch(`${API_URL}/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            email: payload.email,
            password: payload.password,
            first_name: payload.firstName,
            second_name: payload.secondName,
            birth_date: payload.birthDate
        }),
    });
    return await getData(response);
}
