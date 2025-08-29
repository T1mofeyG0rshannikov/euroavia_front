import { classNames } from '@/shared/lib/classNames/classNames'

import cls from './GenderSelector.module.scss'

export const GenderSelector = ({ setValue, error, value, register, trigger }) => {
	const handleClick = gender => {
		setValue('gender', gender)
		trigger('gender')
	}

	return (
		<div
			className={classNames(cls.selector, [], {
				[cls.error]: error
			})}
		>
			<button
				className={classNames(cls.button, [], {
					[cls.active]: value === 'Мужской'
				})}
				onClick={() => handleClick('Мужской')}
				type='button'
			>
				М
			</button>
			<button
				className={classNames(cls.button, [], {
					[cls.active]: value === 'Женский'
				})}
				onClick={() => handleClick('Женский')}
				type='button'
			>
				Ж
			</button>
			<input
				style={{ display: 'none' }}
				type='text'
				{...register}
			/>
		</div>
	)
}
