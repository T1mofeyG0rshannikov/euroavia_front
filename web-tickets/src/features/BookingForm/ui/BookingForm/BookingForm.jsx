import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

import { PAGE_ROUTE } from '@/shared/config/PageRoute/PageRoute'

import { schema } from '../../config/schema'
import { BookingCustomer } from '../BookingCustomer/BookingCustomer'
import { BookingPassengers } from '../BookingPassengers/BookingPassengers'

import cls from './BookingForm.module.scss'

export const BookingForm = () => {
	const navigate = useNavigate()
	const {
		handleSubmit,
		watch,
		formState: { errors },
		setValue,
		register,
		trigger
	} = useForm({
		defaultValues: {
			country: 'Россия'
		},
		resolver: yupResolver(schema)
	})

	const values = watch()
	const onSubmit = e => {
		navigate(PAGE_ROUTE.PAYMENT)
	}
	return (
		<form
			className={cls.form}
			onSubmit={handleSubmit(onSubmit)}
		>
			<BookingCustomer
				register={register}
				errors={errors}
			/>
			<BookingPassengers
				register={register}
				errors={errors}
				setValue={setValue}
				values={values}
				trigger={trigger}
			/>
		</form>
	)
}
