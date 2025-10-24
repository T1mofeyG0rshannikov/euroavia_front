import { useForm } from 'react-hook-form'

import { Checkbox } from '@/shared/ui/Checkbox/Checkbox'
import { Dropdown } from '@/shared/ui/Dropdown/Dropdown'

import { Range } from '@/shared/ui/Range/Range'

import cls from './TicketsFilter.module.scss'

import 'rc-slider/assets/index.css'
import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { fetchTickets } from '@/widgets/Tickets/api'


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

function formatMinutesToHHMM(totalMinutes) {
  const hours = Math.floor(totalMinutes / 60);  // Получаем целые часы
  const minutes = totalMinutes % 60;             // Получаем оставшиеся минуты

  // Форматируем часы и минуты, добавляя ведущий ноль, если нужно
  const formattedHours = String(hours).padStart(2, '0');
  const formattedMinutes = String(minutes).padStart(2, '0');

  return `${formattedHours}:${formattedMinutes}`; // Возвращаем строку в формате hh:mm
}

function getMinutesFromISO(isoString){
	const date = new Date(isoString);

	const hours = date.getHours();
	const minutes = date.getMinutes();

	return hours * 60 + minutes
}

export const TicketsFilter = ({tickets, setFilteredTickets, ticketsLoading, setTicketsLoading}) => {
	const { search } = useLocation();
    const params = new URLSearchParams(search);


	const [airlines, setAirlines] = useState([]);
	const [defaultCosts, setDefaultCosts] = useState([20000, 40000])
	const [defaultDurations, setDefaultDurations] = useState([60, 600]);
	const [defaultDepartureTimes, setDefaultDepartureTimes] = useState([0, 24*60-1]);
	const [defaultReturnTimes, setDefaultReturnTimes] = useState([0, 24*60-1]);
	const [isFormReady, setIsFormReady] = useState(false);

	useEffect(() => {
		if (tickets && defaultCosts[0]  !== 20000 && defaultCosts[1] !== 40000 && defaultDurations[0] !== 60 && defaultDurations[1] !== 600 && airlines.length > 0){
			setIsFormReady(true)
		}
	}, [tickets, defaultCosts, defaultDurations, airlines])

	useEffect(() => {
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
		setValue("cost", defaultCosts)
	}, [defaultCosts])

	useEffect(() => {
		if (isFormReady){
			return;
		}
		setValue("duration", defaultDurations)
	}, [defaultDurations])

	const { watch, register, setValue } = useForm({
		defaultValues: {
			transfers,
			airlines,
			duration: defaultDurations,
			departure: [60, 44 * 60],
			cost: defaultCosts,
			departureTimes: defaultDepartureTimes,
			returnTimes: defaultReturnTimes,
		}
	})

	const values = watch();
	
	useEffect(() => {
		if (isFormReady){
			return;
		}
		setValue('airlines', airlines)
	}, [airlines])

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
            departure_at_time_min: values.departureTimes[0],
            departure_at_time_max: values.departureTimes[1],
            return_at: params.get('return_at'),
            return_at_time_min: values.returnTimes[0],
            return_at_time_max: values.returnTimes[1],
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

		async function fetchTicketsWithFilters(payload){
			setTicketsLoading(true)
			const response = await fetchTickets(payload)
			if (response.status === 200){
				setFilteredTickets(response.data)
			}
			setTicketsLoading(false)
		}

		if (!ticketsLoading){
			fetchTicketsWithFilters(payload)		
		}

	}, [values.airlines, values.cost, values.transfers, values.duration])

	useEffect(() => {
		setFilteredTickets(tickets.filter(ticket => {
			const result = values.departureTimes[0] <= getMinutesFromISO(ticket.itineraries[0].departure_at) && getMinutesFromISO(ticket.itineraries[0].departure_at) <= values.departureTimes[1] &&
			values.returnTimes[0] <= getMinutesFromISO(ticket.itineraries[ticket.itineraries.length - 1].return_at) && getMinutesFromISO(ticket.itineraries[ticket.itineraries.length - 1].return_at) <= values.returnTimes[1]
			
			console.log(ticket.itineraries[0].departure_at, getMinutesFromISO(ticket.itineraries[0].departure_at))
			return result;
		}
		))
		console.log(tickets.filter(ticket => 
			values.departureTimes[0] <= getMinutesFromISO(ticket.itineraries[0].departure_at) <= values.departureTimes[1] &&
			values.returnTimes[0] <= getMinutesFromISO(ticket.itineraries[ticket.itineraries.length - 1].return_at) <= values.returnTimes[1]
		), "fewfw")
	}, [ values.returnTimes, values.departureTimes])

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

				<p>Время туда</p>
				<Range
					diapason={defaultDepartureTimes}
					value={values.departureTimes}
					setValue={setValue}
					name={'departureTimes'}
				>
					<div>
						с {formatMinutesToHHMM(values.departureTimes[0])}
						 до {formatMinutesToHHMM(values.departureTimes[1])}
					</div>
				</Range>

				<p>Время обратно</p>
				<Range
					diapason={defaultReturnTimes}
					value={values.returnTimes}
					setValue={setValue}
					name={'returnTimes'}
				>
					<div>
						с {formatMinutesToHHMM(values.returnTimes[0])}
						 до {formatMinutesToHHMM(values.returnTimes[1])}
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
