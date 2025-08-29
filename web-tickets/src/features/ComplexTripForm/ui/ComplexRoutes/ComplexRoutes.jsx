import { Controller } from 'react-hook-form'

import { Calendar } from '@/shared/ui/Calendar/Calendar'
import { Input } from '@/shared/ui/Input/Input'

import Cancel from '@icons/close.svg'

import cls from './ComplexRoutes.module.scss'
import { Suggestions } from './Suggestions'
import { useState } from 'react'

export const ComplexRoutes = ({ errors, routes, register, control, setValue }) => {
	const deleteItem = index => {
		setValue(
			'routes',
			routes.filter((_, i) => i !== index)
		)
	}

	return (
		<div className={cls.routes}>
			{routes &&
				routes.map((route, index) => (
					<div
						className={cls.item}
						key={route.id}
					>
						<div>
						<Input
							placeholder={'Откуда'}
							error={!!errors.routes?.[index]?.departure}
							{...register(`routes.${index}.departure`, { required: true,  onChange: (event) => handleInputChange(event)})}
						/>
						<Suggestions
							airports={originAirports}
							value={route.departure}
							onSelect={(airport) => setValue(`routes.${index}.departure`)}
						/>
						</div>
						<Input
							placeholder={'Куда'}
							error={!!errors.routes?.[index]?.destination}
							{...register(`routes.${index}.destination`, { required: true })}
						/>
						<Controller
							control={control}
							name={`routes.${index}.startDate`}
							rules={{ required: true }}
							render={({ field }) => (
								<Calendar
									selectsStart
									minDate={new Date()}
									onChange={date => {
										field.onChange(date)
									}}
									error={!!errors.routes?.[index]?.startDate}
									placeholder={'Откуда'}
									selected={field.value}
								/>
							)}
						/>
						{routes.length > 1 && (
							<button
								type={'button'}
								className={cls.cancelButton}
								onClick={() => deleteItem(index)}
							>
								<Cancel fill={'var(--color-1)'} />
							</button>
						)}
					</div>
				))}
		</div>
	)
}
