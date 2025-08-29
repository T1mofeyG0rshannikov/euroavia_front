import { useEffect, useRef, useState } from 'react'

import { MenuOutline } from './MenuOutline'

import cls from './Menu.module.scss'

export const Menu = ({ buttonValue }) => {
	const [showMenu, setShowMenu] = useState(false)
	const [animate, setAnimate] = useState(false)
	const timeoutRef = useRef(null)

	const showMenuFn = () => setShowMenu(true)
	const closeMenuFn = () => {
		if (timeoutRef.current) clearTimeout(timeoutRef.current)
		setAnimate(false)
		timeoutRef.current = setTimeout(() => setShowMenu(false), 200)
	}
	const preventFn = e => e.stopPropagation()

	useEffect(() => {
		if (showMenu) {
			timeoutRef.current = setTimeout(() => {
				setAnimate(true)
			}, 200)
		}
		return () => {
			if (timeoutRef.current) {
				clearTimeout(timeoutRef.current)
				timeoutRef.current = null
			}
		}
	}, [showMenu])

	return (
		<>
			<button
				className={cls.button}
				onClick={showMenuFn}
			>
				{buttonValue}
			</button>
			{showMenu && (
				<MenuOutline
					animate={animate}
					closeMenuFn={closeMenuFn}
					preventFn={preventFn}
				/>
			)}
		</>
	)
}
