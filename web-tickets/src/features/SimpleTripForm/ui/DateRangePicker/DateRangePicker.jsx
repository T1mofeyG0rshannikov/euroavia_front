import { Controller } from 'react-hook-form'

import { Calendar } from '@/shared/ui/Calendar/Calendar'

import Close from '@icons/close.svg'

import cls from './DateRandePicker.module.scss'

export const DateRangePicker = ({ watch, setValue, control, errors }) => {
	const startDate = watch('startDate')
	const endDate = watch('endDate')

	return (
		<>
			<Controller
				control={control}
				name='startDate'
				rules={{ required: true }}
				render={({ field }) => (
					<Calendar
						selectsStart
						minDate={new Date()}
						onChange={date => {
							field.onChange(date)
							if (endDate && endDate < date) {
								setValue('endDate', null)
							}
						}}
						error={errors.startDate}
						placeholder={'Дата туда'}
						startDate={startDate}
						endDate={endDate}
						selected={field.value}
					/>
				)}
			/>

			<div className={cls.endDateWrapper}>
				<Controller
					control={control}
					name='endDate'
					render={({ field }) => (
						<Calendar
							selectsEnd
							startDate={startDate}
							endDate={endDate}
							placeholder={'Дата обратно'}
							error={errors.endDate}
							minDate={startDate || new Date()}
							onChange={date => {
								field.onChange(date)
							}}
							selected={field.value}
						/>
					)}
				/>

				{endDate && (
					<button
						className={cls.cancelButton}
						onClick={() => setValue('endDate', null)}
						type={'button'}
					>
						<Close fill={'var(--color-1)'} />
					</button>
				)}
			</div>
		</>
	)
}
