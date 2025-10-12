import { API_URL } from "../../shared/config/constants"
import { getData } from "../../features/ComplexTripForm/api"

export async function fetchTickets(filters){
    const response = await fetch(`${API_URL}/filter-tickets`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(filters)
    })
    return await getData(response)
}