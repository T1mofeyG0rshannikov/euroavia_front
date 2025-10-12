import * as yup from 'yup'

export const schema = yup.object({
	email: yup.string().email().required(),
	gender: yup.string().oneOf(['Мужской', 'Женский'], 'Выберите пол').required('Пол обязателен'),
	name: yup.string().required(),
	secondName: yup.string().required(),
	passport: yup.string().required(),
	expiration_date: yup.string().required(),
	date: yup
		.string()

		.required(),
	checkbox: yup.boolean().oneOf([true], '').required()
})
