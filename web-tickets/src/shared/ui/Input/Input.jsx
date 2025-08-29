import { classNames } from '@/shared/lib/classNames/classNames'

import cls from './Input.module.scss'

export const Input = ({ type = 'text', error, className, ...others }) => {
	return (
		<input
			className={classNames(cls.input, [className], {
				[cls.error]: error
			})}
			type={type}
			{...others}
		/>
	)
}
