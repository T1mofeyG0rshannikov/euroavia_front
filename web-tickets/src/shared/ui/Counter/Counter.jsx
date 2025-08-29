import cls from './Counter.module.scss'

export const Counter = ({ count, setCount, minCount = 0, maxCount = 100, isMaxStop }) => {
	return (
		<div className={cls.counter}>
			<button
				className={cls.minus}
				type={'button'}
				onClick={() => {
					if (count === minCount) return
					setCount(count - 1)
				}}
			>
				-
			</button>
			<div> {count}</div>
			<button
				className={cls.plus}
				type={'button'}
				onClick={() => {
					if (maxCount <= count || isMaxStop) return
					setCount(count + 1)
				}}
			>
				+
			</button>
		</div>
	)
}
