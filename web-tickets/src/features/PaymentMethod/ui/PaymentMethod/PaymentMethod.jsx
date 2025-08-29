import { useState } from 'react'

import { classNames } from '@/shared/lib/classNames/classNames'
import { Box } from '@/shared/ui/Box/Box'

import { FullPayment } from '../FullPayment/FullPayment'
import { SupportPayment } from '../SupportPayment/SupportPayment'

import cls from './PaymentMethod.module.scss'

export const PaymentMethod = () => {
	const [method, setMethod] = useState(true)
	return (
		<div className={cls.methods}>
			<div className={cls.buttons}>
				<button
					className={classNames(cls.button, [], {
						[cls.active]: method
					})}
					onClick={() => setMethod(true)}
				>
					Бронь для визы
				</button>
				<button
					className={classNames(cls.button, [], {
						[cls.active]: !method
					})}
					onClick={() => setMethod(false)}
				>
					Авиабилет для визы
				</button>
			</div>

			{method ? <SupportPayment price={780} /> : <FullPayment />}

			<Box className={cls.box}>
				<h5>Гарантии безопасности</h5>

				<p className={cls.text}>
					Безопасность процессинга подтверждена сертификатом стандарта безопасности данных индустрии
					платежных карт PCI DSS. Надежность сервиса обеспечивается интеллектуальной системой
					мониторинга мошеннических операций, а также применением 3D Secure - современной
					технологией безопасности интернет-платежей. Передача информации происходит с применением
					технологии шифрования TLS. Дальнейшая передача информации осуществляется по закрытым
					банковским каналам, имеющим наивысший уровень надежности. Ваши данные не передаются
					третьим лицам.
				</p>
			</Box>
		</div>
	)
}
