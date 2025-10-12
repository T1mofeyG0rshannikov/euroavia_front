import { useState } from "react"


export function useFilterTickets() {
    const [filteredTickets, setFilteredTickets] = useState([])
    const [filterLoading, setFilterLoading] = useState(false)

    const filterTickets = async (filters) => {
        setFilterLoading(true)
        try {
            const response = await fetch(`${API_URL}/filter-tickets`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(filters)
            })
            const data = await response.json()
            setFilteredTickets(data)
        } catch (e) {
            setFilteredTickets([])
        } finally {
            setFilterLoading(false)
        }
    }

    return { filteredTickets, filterLoading, filterTickets }
}