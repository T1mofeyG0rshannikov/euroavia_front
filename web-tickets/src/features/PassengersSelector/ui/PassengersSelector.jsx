import { useEffect, useRef, useState } from 'react'

import { useCloseModal } from '@/shared/lib/hooks/useCloseModal/useCloseModal'
import { Input } from '@/shared/ui/Input/Input'

import { PassengersList } from './PassengersList'

import cls from './PassengersSelector.module.scss'

export const PassengersSelector = ({ error, setValue,register, ...others }) => {
	const ref = useRef()
	const [showList, setShowList] = useState(false)
	const [classType, setClassType] = useState('economy')
	const [passengers, setPassengers] = useState({
		adults: 1,
		to12Years: 0,
		to2Years: 0
	})
	useCloseModal(ref, setShowList)

	useEffect(() => {
		setValue('passengers', {
			adults: passengers.adults,
			childrens: passengers.to12Years,
			infants: passengers.to2Years,
			classType: classType
		});
	}, [passengers, classType, setValue])

	const allCount = passengers.adults + passengers.to12Years + passengers.to2Years
	const handlePassengerChange = (type, value) => {
		if (allCount >= 9 && passengers[type] <= value) return
		setPassengers(prevState => ({ ...prevState, [type]: value }))
	}
	return (
		<div
			className={cls.wrapper}
			ref={ref}
		>
			<Input
				type='button'
				value={`${allCount} пасс, ${classType === 'economy' ? 'эконом' : 'бизнес'}`}
				onClick={() => setShowList(true)}
				{...register('passengers')}
			/>

			{showList && (
				<PassengersList
					classType={classType}
					passengers={passengers}
					handlePassengerChange={handlePassengerChange}
					setClassType={setClassType}
				/>
			)}
		</div>
	)
}
