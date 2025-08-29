import { Input } from '@/shared/ui/Input/Input'

import ArrowLeftRight from '@icons/arrow-left-right.svg'

import cls from './TravelInputs.module.scss'
import { Suggestions } from '../../../ComplexTripForm/ui/ComplexRoutes/Suggestions'
import { useState } from 'react'
import { fetchAirports } from '../../../ComplexTripForm/api'

export const TravelInputs = ({ errors, register, getValues, setValue }) => {
	const changeValue = () => {
		const { departure, destination } = getValues()
		setValue('departure', destination)
		setValue('destination', departure)
	}

	const [originAirports, setOriginAirports] = useState([])

	async function handleInputChange(e){
		console.log("NONOFE")
		const value = e.target.value
		if (value.length > 0){
			const airports = await fetchAirports(value)
			console.log(airports.data)
			setOriginAirports(airports.data)
		}
	}

	return (
		<div className={cls.inputs}>
			<div>
				<h1>hello</h1>
				<Input
					error={!!errors.departure}
					placeholder={'Откуда'}
					{...register('departure', {
						required: true,
						onChange: (event) => handleInputChange(event)
					})}
				/>
				<Suggestions
					airports={originAirports}
					onSelect={(airport) => setValue(`routes.${index}.departure`)}
				/>
			</div>
			<button
				className={cls.changeButton}
				type={'button'}
				onClick={changeValue}
			>
				<ArrowLeftRight fill={'var(--color-1)'} />
			</button>
			<Input
				error={!!errors.destination}
				placeholder={'Куда'}
				{...register('destination', {
					required: true
				})}
			/>
		</div>
	)
}
