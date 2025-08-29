import { Link } from 'react-router-dom'

import { classNames } from '../../lib/classNames/classNames'

import cls from './Button.module.scss'

export const Button = ({ className, children, to, ...other }) => {
	const btnClassName = classNames(cls.button, [className])

	if (to) {
		return (
			<Link
				className={btnClassName}
				to={to}
				{...other}
			>
				{children}
			</Link>
		)
	}

	return (
		<button
			className={btnClassName}
			{...other}
		>
			{children}
		</button>
	)
}
