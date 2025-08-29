import { ru } from 'date-fns/locale'
import { forwardRef } from 'react'
import DatePicker, { registerLocale } from 'react-datepicker'

import { Input } from '@/shared/ui/Input/Input'

import { CalendarHeader } from './CalendarHeader'

import './Calendar.scss'

registerLocale('ru', ru)
const CustomInput = forwardRef(({ error, ...others }, ref) => (
	<Input
		error={error}
		ref={ref}
		{...others}
		readOnly
	/>
))

export const Calendar = ({ setValue, placeholder, error, ...others }) => {
	return (
		<DatePicker
			renderCustomHeader={props => <CalendarHeader {...props} />}
			customInput={<CustomInput error={error} />}
			placeholderText={placeholder}
			locale='ru'
			onChange={setValue}
			dateFormat='dd-MM-yyyy'
			{...others}
		/>
	)
}
