import Img from '@/shared/assets/img.png'
import { PAGE_ROUTE } from '@/shared/config/PageRoute/PageRoute'
import { Button } from '@/shared/ui/Button/Button'

import cls from './TicketsCard.module.scss'

export const TicketsCard = () => {
	return (
		<li className={cls.card}>
			<div className={cls.tickets}>
				<div className={cls.ticket}>
					<div className={cls.item}>
						<span className={cls.time}> 21:10</span>
						<span className={cls.date}> 21 авг 2025, Чт</span>
						<span> Ереван EVN</span>
					</div>
					<div className={cls.item}>
						<span> Без пересадок</span>
						<span> -</span>
						<span> в пути: 4ч 15м</span>
					</div>
					<div className={cls.item}>
						<span className={cls.time}> 00:25</span>
						<span className={cls.date}>22 авг 2025, Пт</span>
						<span>Санкт Петербург LED</span>
					</div>
				</div>
				<div className={cls.ticket}>
					<div className={cls.item}>
						<span className={cls.time}> 21:10</span>
						<span className={cls.date}> 21 авг 2025, Чт</span>
						<span> Ереван EVN</span>
					</div>
					<div className={cls.item}>
						<span> Без пересадок</span>
						<span> -</span>
						<span> в пути: 4ч 15м</span>
					</div>
					<div className={cls.item}>
						<span className={cls.time}> 00:25</span>
						<span className={cls.date}>22 авг 2025, Пт</span>
						<span>Санкт Петербург LED</span>
					</div>
				</div>
			</div>
			<div className={cls.end}>
				<span>
					<img src={Img} />
				</span>
				<Button to={PAGE_ROUTE.TICKET_BOOKING}>19 555 ₽</Button>
			</div>
		</li>
	)
}
