import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

import { PAGE_ROUTE } from '@/shared/config/PageRoute/PageRoute'
import { Button } from '@/shared/ui/Button/Button'

import { PassengersSelector } from '../../../PassengersSelector'
import { ComplexRoutes } from '../ComplexRoutes/ComplexRoutes'

import cls from './ComplexTripForm.module.scss'

const defaultValues = {
	routes: [
		{
			departure: '',
			destination: '',
			startDate: null,
			id: Date.now()
		}
	]
}
export const ComplexTripForm = ({ ChangeBlockButton }) => {
	const {
		handleSubmit,
		register,
		watch,
		setValue,
		formState: { errors },
		...others
	} = useForm({
		defaultValues
	})

	const navigate = useNavigate()

	const routes = watch('routes')
	const onSubmit = e => {
		const onSubmit = e => {
			navigate(PAGE_ROUTE.TICKETS)
		}
	}

	const addItem = () => {
		if (routes.length >= 5) return
		setValue('routes', [
			...routes,
			{
				departure: '',
				destination: '',
				startDate: null,
				id: Date.now()
			}
		])
	}

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<ComplexRoutes
				routes={routes}
				errors={errors}
				setValue={setValue}
				register={register}
				{...others}
			/>
			<div className={cls.bottom}>
				<button
					className={cls.button}
					type={'button'}
					onClick={addItem}
				>
					{routes.length <= 4 ? 'Добавить' : 'Максимальное количество'}
				</button>

				<PassengersSelector
					setValue={setValue}
					error={errors.passengers}
					{...register('passengers')}
				/>
			</div>
			{ChangeBlockButton}

			<Button
				className={cls.submit}
				type={'submit'}
			>
				Отправить
			</Button>
		</form>
	)
}
