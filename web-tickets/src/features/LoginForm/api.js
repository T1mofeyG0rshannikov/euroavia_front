import { API_URL } from "../../shared/config/constants";
import { getData } from "../ComplexTripForm/api";


export async function loginAPI(payload) {
    const response = await fetch(`${API_URL}/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
    });
    return await getData(response);
}
