import React, { useRef, useState } from 'react'

import { useCloseModal } from '@/shared/lib/hooks/useCloseModal/useCloseModal'

import cls from './DropdownButton.module.scss'

export const DropdownButton = ({ register, setValue }) => {
	const [isOpen, setIsOpen] = useState(false)
	const ref = useRef(null)
	const toggleDropdown = () => {
		setIsOpen(!isOpen)
	}

	useCloseModal(ref, setIsOpen)

	const handleClick = value => {
		setValue('country', value)
		setIsOpen(false)
	}
	return (
		<div
			className={cls.wrapper}
			ref={ref}
			style={{width: "210px"}}
		>
			<input
				style={{width: "100%", textAlign: "left"}}
				onClick={toggleDropdown}
				type={'button'}
				className={cls.button}
				{...register}
			/>

			{isOpen && (
				<ul className={cls.list}>
					{/*<li
						className={cls.item}
						onClick={() => handleClick('Опция 1')}
					>
						Опция 1
					</li>
					<li
						className={cls.item}
						onClick={() => handleClick('Опция 2')}
					>
						Опция 2
					</li>
					<li
						className={cls.item}
						onClick={() => handleClick('Опция 3')}
					>
						Опция 3
					</li>*/}
				</ul>
			)}
		</div>
	)
}
