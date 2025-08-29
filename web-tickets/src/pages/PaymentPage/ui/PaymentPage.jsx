import { Header } from '@/widgets/Header'
import { Payment } from '@/widgets/Payment'
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
		name: 'Оплата'
	},

	{
		to: '#',
		name: 'Получение заказа',
		disabled: true
	}
]
export const PaymentPage = () => {
	return (
		<>
			<Header />
			<Top
				title={'Выбор способа оплаты'}
				subtitle={'Заказ • 10056991'}
				breadcrumbs={breadcrumbs}
			/>
			<Payment />
		</>
	)
}
