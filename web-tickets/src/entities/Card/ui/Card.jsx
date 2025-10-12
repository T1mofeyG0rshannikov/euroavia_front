import Img from '@/shared/assets/img.png'

import cls from './Card.module.scss'
import { getSeatClass, formatDate, minutesToHoursMinutes, extractHoursMinutes } from '@/utils/ticketFormatters'

export const Card = ({ticket}) => {
	return (
		<div className={cls.card}>
			{
				ticket.itineraries.map(itinerary =>
					<div className={cls.tickets}>
						<h5 className={cls.route}>{itinerary.segments[0].origin_airport.city.name} - {itinerary.segments[itinerary.segments.length - 1].destination_airport.city.name}</h5>
						{itinerary.segments.map(segment =>
							<div className={cls.ticket}>
								<div className={cls.content}>
									<div className={cls.item}>
										<span className={cls.time}>{extractHoursMinutes(segment.departure_at)}</span>
										<span className={cls.date}>{formatDate(segment.departure_at)}</span>
										<span>{segment.origin_airport.city.name} {segment.origin_airport.iata}</span>
									</div>
									<div className={cls.item}>
										<span style={{fontSize: "20px"}}>
											{segment.airline.name}
										</span>
										<span>в пути: {minutesToHoursMinutes(segment.duration)}</span>
									</div>
									<div className={cls.item}>
										<span className={cls.time}>{extractHoursMinutes(segment.return_at)}</span>
										<span className={cls.date}>{formatDate(segment.return_at)}</span>
										<span>{segment.destination_airport.city.name} {segment.destination_airport.iata}</span>
									</div>
								</div>
								<div className={cls.bottom}>
									<span> Рейс: {segment.flight_number}</span>
									<span>Выполняет: {segment.airline.name_russian}</span>
									<span>{getSeatClass(segment.seat_class)}</span>
									<span> Самолет: {segment.aircraft.iata}</span>
								</div>
								{/*<p className={cls.baggage}>Багаж платный</p>*/}
							</div>
						)}
					</div>
				)
			}
		</div>
	)
}
