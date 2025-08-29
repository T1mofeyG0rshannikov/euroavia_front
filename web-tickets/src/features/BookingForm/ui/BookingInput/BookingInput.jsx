import { InputMask } from '@react-input/mask'

import { classNames } from '@/shared/lib/classNames/classNames'

import cls from './BookingInput.module.scss'

export const BookingInput = ({ mask, value, register, replacement, error, ...others }) => {
	if (mask) {
		return (
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
		)
	}

	return (
		<input
			className={classNames(cls.input, [], {
				[cls.error]: error
			})}
			{...others}
			{...register}
		/>
	)
}
