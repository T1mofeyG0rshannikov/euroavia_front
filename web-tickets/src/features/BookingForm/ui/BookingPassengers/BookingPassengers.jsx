import { Box } from '@/shared/ui/Box/Box'
import { Button } from '@/shared/ui/Button/Button'
import { Checkbox } from '@/shared/ui/Checkbox/Checkbox'

import { BookingInput } from '../BookingInput/BookingInput'
import { DropdownButton } from '../DropdownButton/DropdownButton'
import { GenderSelector } from '../GenderSelector/GenderSelector'

import cls from './BookingPassengers.module.scss'

export const BookingPassengers = ({ values, register, errors, setValue, trigger, onSubmit, isComplete }) => {
	return (
		<Box className={cls.passengers}>
			<h5 className={cls.title}>Пассажиры</h5>
			<p className={cls.text}>Данные вводить латиницей, как в загранпаспорте</p>

			<div className={cls.flex} style={{flexDirection: "column", alignItems: "start"}}>
				<GenderSelector
					value={values.gender}
					setValue={setValue}
					error={errors.gender}
					register={register('gender')}
					trigger={trigger}
				/>
				<BookingInput
				style={{width: "210px"}}
					placeholder={'Имя'}
					register={register('name')}
					error={errors.name}
				/>
				<BookingInput
				style={{width: "210px"}}
					placeholder={'Фамилия'}
					register={register('secondName')}
					error={errors.secondName}
				/>
				<DropdownButton
					setValue={setValue}
					register={register('country')}
				/>
				<BookingInput
					style={{width: "210px"}}
					placeholder={'Дата Рождения'}
					error={errors.date}
					mask='dd.mm.yyyy'
					replacement={{ d: /\d/, m: /\d/, y: /\d/ }}
					register={register('date')}
				/>
				<BookingInput
					style={{width: "210px"}}
					placeholder={'Загран Паспорт'}
					register={register('passport')}
					error={errors.passport}
				/>
				<BookingInput
					style={{width: "210px"}}
					placeholder={'Срок Действия'}
					register={register('term')}
					error={errors.term}
					mask='dd.mm.yyyy'
					replacement={{ d: /\d/, m: /\d/, y: /\d/ }}
				/>
			</div>

			<Checkbox
				error={errors.checkbox}
				onChange={() => setValue('checkbox', !values.checkbox)}
				{...register('checkbox')}
			>
				Отправляя данную форму, Вы соглашаетесь с условиями тарифа, договора и обработкой
				персональных данных
			</Checkbox>
			<Button
				disabled={!isComplete}
				onClick={() => onSubmit()}
				className={cls.button}
			>
				Забронировать
			</Button>
		</Box>
	)
}
