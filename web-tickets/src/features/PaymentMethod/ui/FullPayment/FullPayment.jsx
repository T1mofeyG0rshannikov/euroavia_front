import { Box } from '@/shared/ui/Box/Box'

import { FastPayment } from '../FastPayment/FastPayment'
import { PaymentByCard } from '../PaymentByCard/PaymentByCard'

import cls from './FullPayment.module.scss'

export const FullPayment = () => {
	return (
		<Box className={cls.box}>
			<h3>
				Получите полностью оплаченный авиабилет для оформления визы, прохождения границы и пр.
			</h3>
			<ol className={cls.list}>
				<li>Мы вручную подберем билеты, по вашему направлению и датам перелета, рейсами а/к:</li>
				<li>Emirates, Etihad, Qatar, Air China, Gulf Air, Аэрофлот, Turkish Airlines.</li>
				<li>Вам не нужно тратить большую сумму для полной оплаты билетов</li>
				<li>Вам не нужно заниматься аннуляцией билетов</li>
				<li>Билеты открываются на сайте авиакомпании как полностью оплаченные</li>
				<li>Билеты аннулируются на 14й день после оформления</li>
				<li>Возможно продление срока отмены</li>
				<li>Возможно предоставление чека полной оплаты</li>
			</ol>
			<p className={cls.text}>
				Заказы оформляются только с понедельника по пятницу, 10-19 ч. МСК. Срок оформления около 2
				ч.
			</p>

			<p>Выберите способ оплаты:</p>
			<FastPayment price={5100} />
			<PaymentByCard price={5300} />
		</Box>
	)
}
