import * as yup from 'yup'

export const schema = yup.object({
	mail: yup.string().email().required(),
	phone: yup.string().required(),
	gender: yup.string().oneOf(['Мужской', 'Женский'], 'Выберите пол').required('Пол обязателен'),
	name: yup.string().required(),
	lastName: yup.string().required(),
	abroad: yup.string().required(),
	term: yup.string().required(),
	date: yup
		.string()

		.required(),
	checkbox: yup.boolean().oneOf([true], '').required()
})
