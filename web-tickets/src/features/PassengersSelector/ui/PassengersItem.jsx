import { Counter } from '@/shared/ui/Counter/Counter'

import cls from './PassengersSelector.module.scss'

export const PassengersItem = ({
	text,
	allCount,
	count,
	setCount,
	minCount = 0,
	maxCount = 100
}) => {
	return (
		<div className={cls.item}>
			<span>{text}</span>
			<Counter
				minCount={minCount}
				isMaxStop={allCount >= 9}
				count={count}
				maxCount={maxCount}
				setCount={setCount}
			/>
		</div>
	)
}
