import { match } from 'path-to-regexp'
import React from 'react'
import { Link, useLocation } from 'react-router-dom'

import { classNames } from '@/shared/lib/classNames/classNames'

import cls from './Breadcrumbs.module.scss'

export const Breadcrumbs = ({ children }) => {
	const location = useLocation()
	return (
		<div className={cls.breadcrumbs}>
			{children.map((item, index) => (
				<Link
					key={item.name}
					to={item.to}
					className={classNames(cls.link, [], {
						[cls.disabled]: item.disabled,
						[cls.active]: !!match(location.pathname)(item.to)
					})}
				>
					{item.name}
					{index !== children.length - 1 && <span>&gt;</span>}
				</Link>
			))}
		</div>
	)
}
