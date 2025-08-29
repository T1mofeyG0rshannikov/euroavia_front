import React, { useState } from 'react'
import ReactDOM from 'react-dom'

import { classNames } from '../../lib/classNames/classNames'

import cls from './Modal.module.scss'

const Modal = ({ isOpen, onClose, children }) => {
	const handleBackgroundClick = e => {
		if (e.target === e.currentTarget) {
			onClose()
		}
	}

	return ReactDOM.createPortal(
		<div
			className={classNames(cls.modal, [], {
				[cls.open]: isOpen
			})}
			onClick={handleBackgroundClick}
		>
			<div className={cls.inner}>{children}</div>
		</div>,
		document.body
	)
}

const OpenModalButton = ({ onClick, children }) => {
	return (
		<button
			className={cls.button}
			onClick={onClick}
		>
			{children}
		</button>
	)
}

export { Modal, OpenModalButton }
