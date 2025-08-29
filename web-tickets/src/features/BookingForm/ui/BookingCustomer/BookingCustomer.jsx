import { Box } from '@/shared/ui/Box/Box'

import { BookingInput } from '../BookingInput/BookingInput'

import cls from './BookingCustomer.module.scss'

export const BookingCustomer = ({ register, errors }) => {
	return (
		<Box className={cls.customer}>
			<h5 className={cls.title}>Покупатель</h5>

			<div className={cls.flex}>
				<BookingInput
					placeholder={'+7(XXX)XXX-XXXX'}
					register={register('phone')}
					error={errors.phone}
					mask='+______________________________'
					replacement={{ _: /\d/ }}
				/>
				<BookingInput
					placeholder={'Электронная почта'}
					register={register('mail')}
					error={errors.mail}
				/>
			</div>
		</Box>
	)
}
