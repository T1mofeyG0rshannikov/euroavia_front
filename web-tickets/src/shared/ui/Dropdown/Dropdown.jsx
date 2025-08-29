import { useState } from 'react'

import { classNames } from '@/shared/lib/classNames/classNames'

import ArrowBottom from '@icons/arrow-bottom.svg'

import cls from './Dropdown.module.scss'

export const Dropdown = ({ buttonValue = '', className, type, children, open = false }) => {
	const [opened, setOpened] = useState(open)

	const handleClick = () => setOpened(!opened)
	return (
		<div className={cls.dropdown}>
			<button
				type={'button'}
				onClick={handleClick}
				className={classNames(cls.button, [className], {
					[cls.opened]: opened,
					[cls.clear]: type
				})}
			>
				{buttonValue}
				<ArrowBottom fill={'var(--primary-text)'} />
			</button>
			<div
				className={classNames(cls.wrapper, [], {
					[cls.opened]: opened
				})}
			>
				<div className={cls.content}>{children}</div>
			</div>
		</div>
	)
}
