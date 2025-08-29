import { Box } from '@/shared/ui/Box/Box'

import { AddParam } from '../AddParam/AddParam'
import { FastPayment } from '../FastPayment/FastPayment'
import { PaymentDeposit } from '../PaymenDeposit/PaymentDeposit'
import { PaymentByCard } from '../PaymentByCard/PaymentByCard'

import cls from './SupportPayment.module.scss'

export const SupportPayment = ({}) => {
	return (
		<Box className={cls.box}>
			<h3>Поддержка брони для визы</h3>
			<p>
				Получите бланк подтверждения бронирования для оформления визы, прохождения таможни и пр.
				Бронь будет поддерживается в глобальных системах бронирования и отменится автоматически, без
				дополнительных платежей. Если это будет возможно, то накануне отмены вам придет уведомление
				о продлении.
			</p>
			<AddParam />
			<p>Для оформления визы вам также потребуется страховка и бронь отеля</p>
			<h5>Выберите способ оплаты:</h5>
			<div className={cls.buttons}>
				<FastPayment price={780} />
				<PaymentByCard price={780} />
				<PaymentDeposit price={780} />
			</div>
			Отправляя данные, Вы соглашаетесь с условиями договора
		</Box>
	)
}
