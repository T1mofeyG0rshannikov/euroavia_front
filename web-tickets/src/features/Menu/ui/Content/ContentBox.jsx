import { Link } from 'react-router-dom'

import cls from './Content.module.scss'

export const ContentBox = ({ links = [], name }) => {
	return (
		<div className={cls.box}>
			<span className={cls.boxName}>{name}</span>
			{links.map(item => (
				<Link
					key={item.name}
					className={cls.link}
					to={item.link}
				>
					{item.name}
				</Link>
			))}
		</div>
	)
}
