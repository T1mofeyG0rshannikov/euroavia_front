import { PAGE_ROUTE } from '@/shared/config/PageRoute/PageRoute'
import { Button } from '@/shared/ui/Button/Button'

import cls from './TicketsCard.module.scss'
import { fetchTicket } from '../../api';
import { extractHoursMinutes, formatDate, minutesToHoursMinutes, getTransfersString } from '@/utils/ticketFormatters';


export const TicketsCard = ({ticket, setTicket}) => {
	async function openTicketModal(ticketId){
		const response = await fetchTicket(ticketId)
		if (response.status === 200){
			setTicket(response.data)
		}
	}

	return (
		<li onClick={() => openTicketModal(ticket.id)} className={cls.card}>
			<div className={cls.tickets}>
				{
					ticket.itineraries.map(itinerary =>
						<div className={cls.ticket}>
							<div className={cls.item}>
								<span className={cls.time}> {extractHoursMinutes(itinerary.departure_at)}</span>
								<span className={cls.date}> {formatDate(itinerary.departure_at)}</span>
								<span> {itinerary.origin_airport.city.name } {itinerary.origin_airport.iata}</span>
							</div>
							<div className={cls.item}>
								<span>{getTransfersString(itinerary.transfers)}</span>
								<span> -</span>
								<span> в пути: {minutesToHoursMinutes(itinerary.duration)}</span>
							</div>
							<div className={cls.item}>
								<span className={cls.time}> {extractHoursMinutes(itinerary.return_at)}</span>
								<span className={cls.date}>{formatDate(itinerary.return_at)}</span>
								<span> {itinerary.destination_airport.city.name } {itinerary.destination_airport.iata}</span>
							</div>
						</div>
					)
				}
			</div>
			<div className={cls.end}>
				<span>
					<p>{ticket.itineraries[0].airline.name_russian}</p>
				</span>
				<Button to={{
					pathname: PAGE_ROUTE.TICKET_BOOKING,
					search: `?ticket=${ticket.id}`
				}}>{ ticket.price } ₽</Button>
			</div>
		</li>
	)
}
