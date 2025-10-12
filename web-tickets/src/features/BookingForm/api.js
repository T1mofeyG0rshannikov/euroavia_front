import { API_URL } from "@/shared/config/constants";
import { getData } from "../ComplexTripForm/api";
import { getToken } from "@/utils/user";


export async function createUserTicket(payload) {
    const response = await fetch(`${API_URL}/user-ticket`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${getToken()}`
        },
        body: JSON.stringify(payload),
    })

    return getData(response)
}

export async function createInsurance(userTicketId) {
    const response = await fetch(`${API_URL}/insurance?user_ticket_id=${userTicketId}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${getToken()}`
        },
    })

    return getData(response)
}