import { ACCESS_TOKEN_KEY, API_URL } from "../shared/config/constants";
import { getData } from "../features/ComplexTripForm/api";


function getToken(){
    return localStorage.getItem(ACCESS_TOKEN_KEY)
}

function setToken(accessToken){
    localStorage.setItem(ACCESS_TOKEN_KEY, accessToken)
}


export async function getUserAPI() {
    const response = await fetch(`${API_URL}/user`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${getToken()}`
        },
    });
    return await getData(response);
}


export default setToken