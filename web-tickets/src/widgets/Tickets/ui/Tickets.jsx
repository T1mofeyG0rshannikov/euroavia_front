import { useEffect, useState } from 'react'

import { TicketsFilter } from '@/features/TicketsFilter/ui/TicketsFilter'
import { TicketsList } from '@/features/TicketsList'

import { Container } from '@/shared/ui/Container/Container'
import { Loading } from '@/shared/ui/Loading/Loading'

import cls from './Tickets.module.scss'
import { fetchTickets } from '../api'
import { useLocation } from 'react-router-dom'


export const Tickets = () => {
	useEffect(() => {
		document.body.classList.add(cls.bggray)
		
		return () => {
			document.body.classList.remove(cls.bggray)
		}
	}, [])
	const [tickets, setTickets] = useState([]);
	const [filteredTickets, setFilteredTickets] = useState(tickets);
	const [ticketsLoading, setTicketsLoading] = useState(false)

	const { search } = useLocation();
    const params = new URLSearchParams(search);
	
	const loadTickets = async () => {
		const payload = {
            origin_airport_ids: [params.get('origin')],
            destination_airport_ids: [params.get('destination')],
            departure_at: params.get('departure_at'),
            return_at: params.get('return_at'),
            adults: Number(params.get('adults')),
            childrens: Number(params.get('childrens')),
            infants: Number(params.get('infants')),
			//price_min:,
			//proce_max:,
        };

		console.log(payload)

		const response = await fetchTickets(payload)
		console.log(response, "r")
		if (response.status === 200){
			setTickets(response.data)
		}
	}

	useEffect(() => {
		loadTickets()
	}, [])

	useEffect(() => {
		console.log(tickets, "t")
	}, [tickets])

	useEffect(() => {
		console.log(filteredTickets, "filtered tickets")
	}, [filteredTickets])

	return (
		<Container className={cls.row}>

		<TicketsFilter tickets={tickets} setFilteredTickets={setFilteredTickets} ticketsLoading={ticketsLoading} setTicketsLoading={setTicketsLoading} />
		<TicketsList filteredTickets={filteredTickets} ticketsLoading={ticketsLoading} />

		</Container>
	)
}
