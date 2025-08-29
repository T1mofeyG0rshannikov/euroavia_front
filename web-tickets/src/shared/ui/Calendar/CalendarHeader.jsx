export const CalendarHeader = ({
	prevMonthButtonDisabled,
	decreaseMonth,
	increaseMonth,
	nextMonthButtonDisabled,
	date
}) => {
	return (
		<div className={'react-datepicker__top'}>
			<button
				onClick={decreaseMonth}
				disabled={prevMonthButtonDisabled}
				type={'button'}
			>
				«
			</button>
			<span>
				{date.toLocaleString('ru', { month: 'long' })} {date.getFullYear()}
			</span>
			<button
				onClick={increaseMonth}
				disabled={nextMonthButtonDisabled}
				type={'button'}
			>
				»
			</button>
		</div>
	)
}
