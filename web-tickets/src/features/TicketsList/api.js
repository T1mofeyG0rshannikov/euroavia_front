import { API_URL } from "../../shared/config/constants"
import { getData } from "../../features/ComplexTripForm/api"

export async function fetchTicket(ticketId){
    const response = await fetch(`${API_URL}/ticket/${ticketId}`, {
        headers: { 'Content-Type': 'application/json' },
    })
    return await getData(response)
}