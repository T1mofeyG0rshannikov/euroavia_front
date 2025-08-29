import { PassengersItem } from './PassengersItem'

import cls from './PassengersSelector.module.scss'

export const PassengersList = ({ passengers, classType, handlePassengerChange, setClassType }) => {
	return (
		<div className={cls.list}>
			<PassengersItem
				text='Взрослые'
				count={passengers.adults}
				setCount={count => handlePassengerChange('adults', count)}
				minCount={1}
			/>
			<PassengersItem
				text='Дети до 12 лет'
				count={passengers.to12Years}
				setCount={count => handlePassengerChange('to12Years', count)}
			/>
			<PassengersItem
				text='Дети до 2 лет'
				count={passengers.to2Years}
				setCount={count => handlePassengerChange('to2Years', count)}
				maxCount={passengers.adults}
			/>
			<button
				className={cls.button}
				type='button'
				onClick={() => setClassType(classType === 'economy' ? 'business' : 'economy')}
			>
				{classType === 'economy' ? 'Бизнес' : 'Эконом'}
			</button>
		</div>
	)
}
