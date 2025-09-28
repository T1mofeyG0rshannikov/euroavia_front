import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'

import { PassengersSelector } from '@/features/PassengersSelector'
import { fetchTickets } from '@/features/ComplexTripForm/api'

import { PAGE_ROUTE } from '@/shared/config/PageRoute/PageRoute'
import { Button } from '@/shared/ui/Button/Button'

import { DateRangePicker } from '../DateRangePicker/DateRangePicker'
import { TravelInputs } from '../TravelInputs/TravelInputs'
import { useAirport } from '../../../../context/AirportContext'
import cls from './SimpleTripForm.module.scss'

export const SimpleTripForm = ({ ChangeBlockButton }) => {
    const navigate = useNavigate()
    const [searchResult, setSearchResult] = useState(null)
    const [loading, setLoading] = useState(false)
    const {
        handleSubmit,
        formState: { errors },
        register,
        setValue,
        getValues,
        watch,
        control,
        ...others
    } = useForm()

    const { originAirport, setOriginAirport, destinationAirport, setDestinationAirport } = useAirport();
    console.log(originAirport)
    const onSubmit = async () => {
        const { adults = 1, childrens = 0, infants = 0 } = getValues('passengers') || {}
        const params = new URLSearchParams({
            origin: getValues('departure'),
            destination: getValues('destination'),
            departure_at: getValues('startDate') ? new Date(getValues('startDate')).toISOString() : '',
            return_at: getValues('endDate') ? new Date(getValues('endDate')).toISOString() : '',
            adults,
            childrens,
            infants
        })
        const originId = getValues('departure')
        const destinationId = getValues('destination')
        const cityFromName = originAirport.city.name
        const cityToName = destinationAirport.city.name
        const departureDate = getValues('startDate') ? new Date(getValues('startDate')).toISOString() : ''
        const returnDate = getValues('endDate') ? new Date(getValues('endDate')).toISOString() : ''

        navigate(
            `/tickets?origin=${originId}&destination=${destinationId}` +
            `&cityFrom=${encodeURIComponent(cityFromName)}` +
            `&cityTo=${encodeURIComponent(cityToName)}` +
            `&departure_at=${departureDate}` +
            `&return_at=${returnDate}`
        )
    }

    return (
        <form
            className={cls.form}
            onSubmit={handleSubmit(onSubmit)}
        >
            <div className={cls.top}>
                <TravelInputs
                    errors={errors}
                    register={register}
                    setValue={setValue}
                    getValues={getValues}
                />
                <DateRangePicker
                    register={register}
                    errors={errors}
                    setValue={setValue}
                    watch={watch}
                    control={control}
                />
                <PassengersSelector
                    error={errors.passengers}
                    register={register}
                    setValue={setValue}
                    {...others}
                />
            </div>
            {ChangeBlockButton}
            <Button
                className={cls.button}
                type={'submit'}
            >
                Поиск
            </Button>
        </form>
    )
}
