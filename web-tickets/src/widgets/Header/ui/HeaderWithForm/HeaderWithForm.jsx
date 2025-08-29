import { useState } from 'react'

import { ComplexTripForm } from '@/features/ComplexTripForm'
import { SimpleTripForm } from '@/features/SimpleTripForm'

import { Container } from '@/shared/ui/Container/Container'

import { ChangeBlockButton } from './ChangeBlockButton'

import cls from './HeaderWithForm.module.scss'

export const HeaderWithForm = () => {
	const [plan, setPlan] = useState(true)

	const handleClick = () => setPlan(!plan)
	const Button = (
		<ChangeBlockButton
			plan={plan}
			onClick={handleClick}
		/>
	)
	return (
		<div className={cls.block}>
			<Container className={cls.wrapper}>
				<h1 className={cls.title}>Дешевые авиабилеты онлайн</h1>
				<p className={cls.subtitle}>Бронирование для визы, рассрочка и кредит</p>
				{plan ? (
					<SimpleTripForm ChangeBlockButton={Button} />
				) : (
					<ComplexTripForm ChangeBlockButton={Button} />
				)}
			</Container>
		</div>
	)
}
