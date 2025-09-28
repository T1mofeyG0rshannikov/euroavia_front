import { Input } from '@/shared/ui/Input/Input'

import ArrowLeftRight from '@icons/arrow-left-right.svg'

import cls from './TravelInputs.module.scss'
import { Suggestions } from '../../../ComplexTripForm/ui/ComplexRoutes/Suggestions'
import { useState, useRef } from 'react'
import { fetchAirports } from '../../../ComplexTripForm/api'
import { useAirport } from '@/context/AirportContext';


export const TravelInputs = ({ errors, register, getValues, setValue }) => {
	const [originAirports, setOriginAirports] = useState([])
	const [originInput, setOriginInput] = useState('')
	const [originAirportId, setOriginAirportId] = useState(null)
	const originInputRef = useRef()

	const [destinationAirports, setDestinationAirports] = useState([])
	const [destinationInput, setDestinationInput] = useState('')
	const [destinationAirportId, setDestinationAirportId] = useState(null)
	const destinationInputRef = useRef()

	const { originAirport, setOriginAirport, destinationAirport, setDestinationAirport } = useAirport();

	const changeValue = () => {
		// Меняем значения в инпутах
		setOriginInput(destinationInput)
		setDestinationInput(originInput)
		// Меняем значения в форме
		setValue('departure', destinationAirportId)
		setValue('destination', originAirportId)
		// Меняем id
		const tempId = originAirportId
		setOriginAirportId(destinationAirportId)
		setDestinationAirportId(tempId)
	}

	async function handleInputChange(e){
		const value = e.target.value
		setOriginInput(value)
		if (value.length > 0){
			const airports = await fetchAirports(value)
			setOriginAirports(airports.data)
		} else {
			setOriginAirports([])
		}
		setOriginAirportId(null)
	}

	function handleOriginSelect(airport) {
		console.log(airport)
		setOriginAirport(airport)
		setOriginInput(`${airport.iata} — ${airport.city.name} (${airport.name_russian ? airport.name_russian : airport.name}), ${airport.country.name}`)
		setOriginAirportId(airport.id)
		setOriginAirports([])
		setValue('departure', airport.id)
	}

	async function handleDestinationInputChange(e) {
		const value = e.target.value
		setDestinationInput(value)
		if (value.length > 0) {
			const airports = await fetchAirports(value)
			setDestinationAirports(airports.data)
		} else {
			setDestinationAirports([])
		}
		setDestinationAirportId(null)
	}

	function handleDestinationSelect(airport) {
		console.log(airport)
		setDestinationAirport(airport)
		setDestinationInput(`${airport.iata} — ${airport.city.name} (${airport.name_russian ? airport.name_russian : airport.name}), ${airport.country.name}`)
		setDestinationAirportId(airport.id)
		setDestinationAirports([])
		setValue('destination', airport.id)
	}

	return (
		<div className={cls.inputs}>
			<div style={{ position: 'relative' }}>
				<Input
					error={!!errors.departure}
					placeholder={'Откуда'}
					value={originInput}
					onChange={handleInputChange}
					ref={originInputRef}
				/>
				<Suggestions
					airports={originAirports}
					onSelect={handleOriginSelect}
				/>
			</div>
			<button
				className={cls.changeButton}
				type={'button'}
				onClick={changeValue}
			>
				<ArrowLeftRight fill={'var(--color-1)'} />
			</button>
			<div style={{ position: 'relative' }}>
				<Input
					error={!!errors.destination}
					placeholder={'Куда'}
					value={destinationInput}
					onChange={handleDestinationInputChange}
					ref={destinationInputRef}
				/>
				<Suggestions
					airports={destinationAirports}
					onSelect={handleDestinationSelect}
				/>
			</div>
		</div>
	)
}
