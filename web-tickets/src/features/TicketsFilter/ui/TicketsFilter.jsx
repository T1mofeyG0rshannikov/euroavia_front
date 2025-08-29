import { useForm } from 'react-hook-form'

import { Checkbox } from '@/shared/ui/Checkbox/Checkbox'
import { Dropdown } from '@/shared/ui/Dropdown/Dropdown'

import { Range } from '../../../shared/ui/Range/Range'

import cls from './TicketsFilter.module.scss'

import 'rc-slider/assets/index.css'

const transplants = { 'Без пересадок': false, '1 пересадка': false, '2 пересадки': false }
const airlines = {
	'FlyOne Armenia': true,
	Аэрофлот: true,
	'Red Wings': true,
	ЮТэйр: true,
	Азимут: true,
	'Уральские Авиалинии': true
}

export const TicketsFilter = () => {
	const { watch, register, setValue } = useForm({
		defaultValues: {
			transplants,
			airlines,
			duration: [0, 44 * 60],
			departure: [60, 44 * 60],
			cost: [20000, 40000]
		}
	})

	const formData = watch()

	const handleChange = (fieldName, value) => {
		setValue(fieldName, value)
	}
	return (
		<form className={cls.form}>
			<Dropdown
				buttonValue={'Пересадки'}
				open={true}
			>
				{Object.entries(transplants).map(([key, value]) => (
					<Checkbox
						key={key}
						{...register(`transplants.${key}`)}
						defaultChecked={value}
						onChange={() => handleChange(`transplants.${key}`, !value)}
					>
						{key}
					</Checkbox>
				))}
			</Dropdown>
			<Dropdown buttonValue={'Авиакомпании'}>
				{Object.entries(airlines).map(([key, value]) => (
					<Checkbox
						key={key}
						{...register(`airlines.${key}`)}
						defaultChecked={value}
						onChange={() => handleChange(`airlines.${key}`, !value)}
					>
						{key}
					</Checkbox>
				))}
			</Dropdown>
			<Dropdown buttonValue={'Время'}>
				<Range
					diapason={formData.duration}
					setValue={setValue}
					name={'duration'}
				>
					<div>
						с {Math.floor(formData.duration[0] / 60)}ч {formData.duration[0] % 60 < 10 ? '0' : ''}
						{formData.duration[0] % 60}м до {Math.floor(formData.duration[1] / 60)}ч{' '}
						{formData.duration[1] % 60 < 10 ? '0' : ''}
						{formData.duration[1] % 60}м
					</div>
				</Range>
				<Range
					diapason={formData.departure}
					setValue={setValue}
					name={'departure'}
				>
					<div>
						с {Math.floor(formData.departure[0] / 60)}ч {formData.departure[0] % 60 < 10 ? '0' : ''}
						{formData.departure[0] % 60}м до {Math.floor(formData.departure[1] / 60)}ч{' '}
						{formData.departure[1] % 60 < 10 ? '0' : ''}
						{formData.departure[1] % 60}м
					</div>
				</Range>
			</Dropdown>
			<Dropdown buttonValue={'Цена'}>
				<Range
					diapason={formData.cost}
					setValue={setValue}
					name={'cost'}
				>
					<div>
						{Math.floor(formData.cost[0])} - {Math.floor(formData.cost[1])}
					</div>
				</Range>
			</Dropdown>
		</form>
	)
}
