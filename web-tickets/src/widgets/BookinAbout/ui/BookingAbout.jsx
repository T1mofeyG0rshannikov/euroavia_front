import { Link } from 'react-router-dom'

import { BookingForm } from '@/features/BookingForm'

import { Card } from '@/entities/Card'

import { Box } from '@/shared/ui/Box/Box'
import { Container } from '@/shared/ui/Container/Container'

import cls from './BookingAbout.module.scss'

export const BookingAbout = () => {
	return (
		<section className={cls.about}>
			<Container>
				<div className={cls.wrapper}>
					<Box className={cls.box}>
						<Card />
						<p> Указано местное время вылета и прилета</p>
						<Box className={cls.innerBox}>
							{' '}
							Возможен безпроцентный займ до 30 дней или кредит до 36 месяцев.
						</Box>
						<Box className={cls.secondBox}>
							Возможно бронирование для получения визы и прохождения границы.
						</Box>
					</Box>
					<Box className={cls.linkBox}>
						<Link to={'#'}>Правила и условия тарифа</Link>
					</Box>
				</div>
				<BookingForm />
			</Container>
		</section>
	)
}
