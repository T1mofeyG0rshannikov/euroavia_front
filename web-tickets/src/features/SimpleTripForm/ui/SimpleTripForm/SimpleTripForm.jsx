import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

import { PassengersSelector } from '@/features/PassengersSelector'

import { PAGE_ROUTE } from '@/shared/config/PageRoute/PageRoute'
import { Button } from '@/shared/ui/Button/Button'

import { DateRangePicker } from '../DateRangePicker/DateRangePicker'
import { TravelInputs } from '../TravelInputs/TravelInputs'

import cls from './SimpleTripForm.module.scss'

export const SimpleTripForm = ({ ChangeBlockButton }) => {
	const navigate = useNavigate()
	const {
		handleSubmit,
		formState: { errors },
		register,
		...others
	} = useForm()

	const onSubmit = e => {
		navigate(PAGE_ROUTE.TICKETS)
	}

	return (
		<form
			className={cls.form}
			onSubmit={handleSubmit(onSubmit)}
		>
			<div className={cls.top}>
				<TravelInputs
					errors={errors}
					register={register}
					{...others}
				/>
				<DateRangePicker
					register={register}
					errors={errors}
					{...others}
				/>
				<PassengersSelector
					error={errors.passengers}
					register={register}
					{...others}
				/>
			</div>

			{ChangeBlockButton}

			<Button
				className={cls.button}
				type={'submit'}
			>
				Поиск
			</Button>
		</form>
	)
}
