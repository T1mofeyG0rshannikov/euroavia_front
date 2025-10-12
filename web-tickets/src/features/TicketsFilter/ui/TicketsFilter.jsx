import { useForm } from 'react-hook-form'

import { Checkbox } from '@/shared/ui/Checkbox/Checkbox'
import { Dropdown } from '@/shared/ui/Dropdown/Dropdown'

import { Range } from '../../../shared/ui/Range/Range'

import cls from './TicketsFilter.module.scss'

import 'rc-slider/assets/index.css'
import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { fetchTickets } from '../../../widgets/Tickets/api'


const transfers = [
	{ 
		value: 0,
		name: 'Без пересадок',
		checked: true
	},
	{
		value: 1,
		name: '1 пересадка',
		checked: true
	},
	{
		value: 2,
		name: '2 пересадки',
		checked: true
	}
]


export const TicketsFilter = ({tickets, setTickets, ticketsLoading, setTicketsLoading}) => {
	const [airlines, setAirlines] = useState([]);
	const [defaultCosts, setDefaultCosts] = useState([20000, 40000])
	const [defaultDurations, setDefaultDurations] = useState([60, 600]);
	const [isFormReady, setIsFormReady] = useState(false);

	useEffect(() => {
		if (tickets && defaultCosts[0]  !== 20000 && defaultCosts[1] !== 40000 && defaultDurations[0] !== 60 && defaultDurations[1] !== 600 && airlines.length > 0){
			console.log(tickets && defaultCosts  != [20000, 40000] && defaultDurations != [60, 600] && airlines != [])
			console.log(tickets,defaultCosts,defaultDurations,airlines)
			setIsFormReady(true)
		}
	}, [tickets, defaultCosts, defaultDurations, airlines])

	useEffect(() => {
		console.log(tickets)
		if (!tickets?.length) return;

		const airlinesMap = new Map();
		const prices = [];
		const durations = [];

		for (let ticket of tickets) {
			for (let itinerary of ticket.itineraries) {
				const airline = itinerary.airline;
				if (!airlinesMap.has(airline.id)) {
					airlinesMap.set(airline.id, {
						value: airline.id,
						name: airline.name_russian,
						checked: true
					});
				}

				durations.push(itinerary.duration)
			}

			prices.push(ticket.price)
		}

		setDefaultCosts([Math.min(...prices), Math.max(...prices)])
		setDefaultDurations([Math.min(...durations), Math.max(...durations)])
		setAirlines(Array.from(airlinesMap.values()));
	}, [tickets]);

	useEffect(() => {
		if (isFormReady){
			return;
		}
		console.log(defaultCosts)
		setValue("cost", defaultCosts)
	}, [defaultCosts])

	useEffect(() => {
		if (isFormReady){
			return;
		}
		console.log(defaultDurations)
		setValue("duration", defaultDurations)
	}, [defaultDurations])

	const { watch, register, setValue } = useForm({
		defaultValues: {
			transfers,
			airlines,
			duration: defaultDurations,
			departure: [60, 44 * 60],
			cost: defaultCosts
		}
	})

	const values = watch();
	
	useEffect(() => {
		if (isFormReady){
			return;
		}
		setValue('airlines', airlines)
	}, [airlines])

	const { search } = useLocation();
    const params = new URLSearchParams(search);

	useEffect(() => {
		if (!isFormReady){
			return;
		}

		const payload = {
            origin_airport_ids: [params.get('origin')],
            destination_airport_ids: [params.get('destination')],
			airline_ids: values.airlines
  .filter(a => a.checked)   // оставляем только те, где checked === true
  .map(a => a.value),
            departure_at: params.get('departure_at'),
            return_at: params.get('return_at'),
            adults: Number(params.get('adults')),
            childrens: Number(params.get('childrens')),
            infants: Number(params.get('infants')),
			price_min: Math.floor(values.cost[0]),
			price_max: Math.floor(values.cost[1]),
			duration_min: values.duration[0],
			duration_max: values.duration[1],
			transfers: values.transfers
  .filter(t => t.checked)   // оставляем только те, где checked === true
  .map(t => t.value),
        };

		console.log(payload, "payload")
		console.log(isFormReady, "ready")
		console.log(values, "values")
		async function fetchTicketsWithFilters(payload){
			setTicketsLoading(true)
			const response = await fetchTickets(payload)
			console.log(response)
			if (response.status === 200){
				setTickets(response.data)
			}
			setTicketsLoading(false)
		}

		if (!ticketsLoading){
			console.log("fetching")
			fetchTicketsWithFilters(payload)		
		}

	}, [values.airlines, values.cost, values.transfers, values.duration])

	useEffect(() => {
		console.log(ticketsLoading, "ticletsLoading")
	}, [ticketsLoading])

	const handleChange = (fieldName, value) => {
		setValue(
			fieldName,
			values[fieldName].map((obj) =>
				obj.value === value
					? { ...obj, checked: !obj.checked }
					: obj
			)
		)
	}

	return (
		<form className={cls.form}>
			<Dropdown
				buttonValue={'Пересадки'}
				open={true}
			>
				{values.transfers.map(({ value, name, checked }) => (
					<Checkbox
						key={value}
						defaultChecked={checked}
						onChange={() => handleChange('transfers', value)}
					>
						{name}
					</Checkbox>
				))}
			</Dropdown>
			<Dropdown buttonValue={'Авиакомпании'}>
				{values.airlines.map(({ value, name, checked }) => (
					<Checkbox
						key={value}
						defaultChecked={checked}
						onChange={() => handleChange('airlines', value)}
					>
						{name}
					</Checkbox>
				))}
			</Dropdown>
			<Dropdown buttonValue={'Время'}>
				<p>Время в пути</p>
				<Range
					diapason={defaultDurations}
					value={values.duration}
					setValue={setValue}
					name={'duration'}
				>
					<div>
						с {Math.floor(values.duration[0] / 60)}ч {values.duration[0] % 60 < 10 ? '0' : ''}
						{values.duration[0] % 60}м до {Math.floor(values.duration[1] / 60)}ч{' '}
						{values.duration[1] % 60 < 10 ? '0' : ''}
						{values.duration[1] % 60}м
					</div>
				</Range>
			</Dropdown>
			<Dropdown buttonValue={'Цена'}>
				<Range
					diapason={defaultCosts}
					setValue={setValue}
					value={values.cost}
					name={'cost'}
				>
					<div>
						{Math.floor(values.cost[0])} - {Math.floor(values.cost[1])}
					</div>
				</Range>
			</Dropdown>
		</form>
	)
}
