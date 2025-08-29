import ReturnLeft from '@icons/return-left.svg'
import Shuffle from '@icons/shuffle.svg'

import cls from './HeaderWithForm.module.scss'

export const ChangeBlockButton = ({ plan, onClick }) => {
	return (
		<button
			className={cls.button}
			onClick={onClick}
			type={'button'}
		>
			{plan ? (
				<>
					<Shuffle />
					<span>Составить сложный маршрут</span>
				</>
			) : (
				<>
					<ReturnLeft />
					<span>Вернуться к простому маршруту</span>
				</>
			)}
		</button>
	)
}
