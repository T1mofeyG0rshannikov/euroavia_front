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
				<h1 style={{textAlign: "center", padding: "8px 14px", fontSize: "calc(1.3rem + .6vw)", marginTop: "1.5rem", color: "#222", fontWeight: "300", transition: "background 0.15s", color: "white", gap: "8px"
				}}>Дешевые авиабилеты онлайн</h1>
				<p style={{textAlign: "center", padding: "8px 14px", fontSize: "15px", color: "white", marginBottom: "50px"
  }}
>
  Бронирование для визы, рассрочка и кредит
</p>
				{plan ? (
					<SimpleTripForm ChangeBlockButton={Button} />
				) : (
					<ComplexTripForm ChangeBlockButton={Button} />
				)}
			</Container>
		</div>
	)
}
