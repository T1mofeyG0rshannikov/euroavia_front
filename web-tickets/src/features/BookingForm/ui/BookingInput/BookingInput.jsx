import { InputMask } from '@react-input/mask'

import { classNames } from '@/shared/lib/classNames/classNames'

import cls from './BookingInput.module.scss'

export const BookingInput = ({ mask, value, register, replacement, error, ...others }) => {
	if (mask) {
		return (
			<div style={{display: "flex", flexDirection: "column"}}>
			<InputMask
				value={value}
				className={classNames(cls.input, [], {
					[cls.error]: error
				})}
				mask={mask}
				replacement={replacement}
				{...others}
				{...register}
				/>
			{error?.message && <span style={{color: "red"}}>{error.message}</span>}
			</div>
		)
	}

	return (
		<div style={{display: "flex", flexDirection: "column"}}>
			<input
				className={classNames(cls.input, [], {
					[cls.error]: error
				})}
				{...others}
				{...register}
				/>
			{error?.message && <span style={{color: "red"}}>{error.message}</span>}
		</div>
	)
}
