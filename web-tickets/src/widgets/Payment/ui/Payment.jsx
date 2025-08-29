import { PaymentMethod } from '@/features/PaymentMethod'

import { Card } from '@/entities/Card'

import { Container } from '@/shared/ui/Container/Container'
import { Dropdown } from '@/shared/ui/Dropdown/Dropdown'

import cls from './Payment.module.scss'

export const Payment = () => {
	return (
		<section className={cls.payment}>
			<Container>
				<Dropdown
					type={'clear'}
					buttonValue={'Проверьте заказ'}
				>
					<div className={cls.order}>
						<Card />
						<div className={cls.aboutOrder}>
							<h5>Данные пасажира:</h5>
							<p className={cls.text}>
								Дата рождения: 02.12.2000 Документ: 2222 До: 12.12.2029 Гражданство: RU Пол: M
							</p>
						</div>
					</div>
				</Dropdown>

				<PaymentMethod />
			</Container>
		</section>
	)
}
