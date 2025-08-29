import { createPortal } from 'react-dom'

import { classNames } from '@/shared/lib/classNames/classNames'

import CloseIcon from '@icons/close.svg'

import { Content } from '../Content/Content'

import cls from './Menu.module.scss'

export const MenuOutline = ({ animate, closeMenuFn, preventFn }) => {
	return createPortal(
		<div
			className={classNames(cls.outline, [], {
				[cls.active]: animate
			})}
			onClick={closeMenuFn}
		>
			<aside
				className={cls.menu}
				onClick={preventFn}
			>
				<div className={cls.menuTop}>
					<h5 className={cls.title}>Меню</h5>
					<button
						className={cls.closeButton}
						onClick={closeMenuFn}
					>
						<CloseIcon fill={'#7F7F7F'} />
					</button>
				</div>
				<Content />
			</aside>
		</div>,
		document.body
	)
}
