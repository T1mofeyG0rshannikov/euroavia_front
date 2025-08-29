import { BookingAbout } from '@/widgets/BookinAbout/ui/BookingAbout'
import { Header } from '@/widgets/Header'
import { Top } from '@/widgets/Top'

import { PAGE_ROUTE } from '@/shared/config/PageRoute/PageRoute'

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
	return (
		<>
			<Header />
			<Top
				title={'Бронирование авиабилетов'}
				subtitle={'Ереван — Санкт Петербург • 28 августа'}
				breadcrumbs={breadcrumbs}
			/>
			<BookingAbout />
		</>
	)
}
