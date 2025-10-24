import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

import { useEffect, useState } from 'react'

import { schema } from '../../config/schema'
import { BookingCustomer } from '../BookingCustomer/BookingCustomer'
import { BookingPassengers } from '../BookingPassengers/BookingPassengers'
import { useAirport } from '@/context/AirportContext'
import cls from './BookingForm.module.scss'
import { createUserTicket, createInsurance } from '../../api'
import { RepeatSearchModal } from '../../../RepeatSearchModal/ui/RepeatSearchModal'
import { useUser } from '@/context/UserContext'
import { useModals } from '@/context/ModalsContext'
import { useMemo } from 'react';
import { API_URL } from '../../../../shared/config/constants'
import { getToken } from '../../../../utils/user'


function formatISODate(dateStr){
	const [day, month, year] = dateStr.split(".");
	return `${year}-${month.padStart(2,'0')}-${day.padStart(2,'0')}`;
}

export const BookingForm = ({ticket}) => {
	const { user, setUser} = useUser()
	const { openLoginForm, closeLoginForm, openRegisterForm, closeRegisterForm, openRequiredLoginForm, closeRequiredLoginForm } = useModals();

	useEffect(() => {
		if (user == null){
			openRequiredLoginForm()
		} else{
			setValue("email", user.email)
		}
	}, [user])

	const [successData, setSuccessData] = useState(null) // ✅ Состояние успешного бронирования
	const [userTicketId, setUserTicketId] = useState(null) // ✅ Созданный билет
	const [insuranceId, setInsuranceId] = useState(null) // ✅ Созданная страховка

	const { originAirport, setOriginAirport, destinationAirport, setDestinationAirport } = useAirport();
	const [openRepeatSearchModal, setOpenRepeatSearchModal] = useState(false)
	const navigate = useNavigate()
	const {
		handleSubmit,
		watch,
		formState: { errors },
		setValue,
		register,
		trigger,
		setError
	} = useForm({
		defaultValues: {
			country: originAirport ? originAirport.country.name : '',
			email: user ? user.email : '',
		},
		resolver: yupResolver(schema)
	})

	const values = watch()

	const isComplete = useMemo(() => {
	// Проверяем, что каждое значение не пустое
	return Object.values(values).every(v => v && v.toString().trim().length > 0);
	}, [values]);

	function mapServerFieldToFormField(field) {
		const mapping = {
			passport: 'passport',
			expiration_date: 'term',
			birth_date: 'date',
			first_name: 'name',
			second_name: 'secondName',
		};
		return mapping[field] || field;
	}

	const onSubmit = async(e) => {
        const passengers = [{
			first_name: values.name,
			second_name: values.secondName,
			gender: values.gender,
			birth_date: formatISODate(values.date),
			passport: values.passport,
			expiration_date: formatISODate(values.term)
		}]

		const payload = {
			ticket_id: ticket.id,
			passengers: passengers
		}

		console.log(payload)

		const response = await createUserTicket(payload);
		console.log(errors)
		if (response.status == 400){
			Object.entries(response.data.errors).forEach(([passenger, fields]) => {
			Object.entries(fields).forEach(([field, message]) => {
				// Если поле соответствует твоему названию в форме
				console.log(field, message)
				const fieldName = mapServerFieldToFormField(field);
				console.log(fieldName, field)
				if (fieldName) {
				setError(fieldName, {"message": message});
				}
			});
			});
		} else if (response.status === 201){
			const Iresponse = await createInsurance(response.data.user_ticket_id)
			if (Iresponse.status == 201){
				setInsuranceId(Iresponse.data.insurance_id);
			}
			setSuccessData(true);
			setUserTicketId(response.data.user_ticket_id)
		}

		console.log(response)
	}

	useEffect(() => {
		if (originAirport != undefined && originAirport != null){
			setOpenRepeatSearchModal(false)
		} else {
			setOpenRepeatSearchModal(true)
		}
	}, [originAirport])

	async function downloadFileWithAuth(url, defaultFilename = 'file.pdf') {
		try {
			const response = await fetch(url, {
			method: 'GET',
			headers: {
				'Authorization': `Bearer ${getToken()}`
			},
			});

			console.log(response)

			if (!response.ok) {
			throw new Error('Ошибка при скачивании файла');
			}

			// Получаем blob
			const blob = await response.blob();

			// Пытаемся получить имя файла из заголовка Content-Disposition
			const disposition = response.headers.get('Content-Disposition');
			let filename = defaultFilename;

			if (disposition && disposition.includes('filename=')) {
			filename = disposition
				.split('filename=')[1]
				.split(';')[0]
				.replace(/"/g, '')
				.trim();
			}

			// Создаем временный объект URL
			const blobUrl = window.URL.createObjectURL(blob);

			// Создаем ссылку и инициируем скачивание
			const link = document.createElement('a');
			link.href = blobUrl;
			link.download = filename;
			document.body.appendChild(link);
			link.click();

			// Чистим за собой
			link.remove();
			window.URL.revokeObjectURL(blobUrl);
		} catch (error) {
			console.error('Ошибка скачивания:', error);
		}
		}

	return (
		<>
		{openRepeatSearchModal ? <RepeatSearchModal /> : <></>}
		<form
			className={cls.form}
			onSubmit={handleSubmit(onSubmit)}
		>
			<BookingCustomer
				register={register}
				errors={errors}
			/>
			<BookingPassengers
				isComplete={isComplete}
				register={register}
				errors={errors}
				setValue={setValue}
				values={values}
				trigger={trigger}
				onSubmit={onSubmit}
			/>

			{/* ✅ Блок успешного бронирования */}
			{successData && (
				<div className={cls.successBox}>
					<p className={cls.successMessage}>
						✅ Бронирование успешно! Ваш билет оформлен.
					</p>
					<div className={cls.successButtons}>
						<button className={cls.genbtn}
							onClick={() =>
							downloadFileWithAuth(
							`${API_URL}/pdf-ticket?user_ticket_id=${userTicketId}`,
							)
						}>
							Скачать билет в PDF
						</button>
						<button className={cls.genbtn} onClick={() =>
							downloadFileWithAuth(
							`${API_URL}/pdf-insurance?insurance_id=${insuranceId}`,
							)
						}>
							Скачать страховку в PDF
						</button>
					</div>
				</div>
			)}
		</form>
		</>
	)
}
