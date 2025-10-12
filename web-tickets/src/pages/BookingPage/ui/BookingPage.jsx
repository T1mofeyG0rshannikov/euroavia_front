import { BookingAbout } from '@/widgets/BookinAbout/ui/BookingAbout'
import { Header } from '@/widgets/Header'
import { Top } from '@/widgets/Top'

import { PAGE_ROUTE } from '@/shared/config/PageRoute/PageRoute'
import { useAirport } from '@/context/AirportContext'
import { fetchTicket } from '@/features/TicketsList/api'
import { useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react'

const breadcrumbs = [
	{
		to: PAGE_ROUTE.TICKETS,
		name: 'Поиск'
	},
	{
		to: PAGE_ROUTE.TICKET_BOOKING,
		name: 'Бронирование'
	},
	{
		to: PAGE_ROUTE.PAYMENT,
		name: 'Оплата',
		disabled: true
	},

	{
		to: '#',
		name: 'Получение заказа',
		disabled: true
	}
]

export const BookingPage = () => {
	const { originAirport, setOriginAirport, destinationAirport, setDestinationAirport } = useAirport();

	const [ticket, setTicket] = useState(null)

	async function getTicket(ticketId){
		const response = await fetchTicket(ticketId)
		if (response.status === 200){
			setTicket(response.data)
		}
	}
	const { search } = useLocation();
	const params = new URLSearchParams(search);

    useEffect(() => {
		getTicket(params.get('ticket'))
	}, [])

	return (
		<>
			<Header />
			<Top
				title={'Бронирование авиабилетов'}
				subtitle={`${originAirport ? originAirport.city.name : ''} — ${destinationAirport ? destinationAirport.city.name : ''} • 28 августа`}
				breadcrumbs={breadcrumbs}
			/>
			<BookingAbout ticket={ticket} />
		</>
	)
}
