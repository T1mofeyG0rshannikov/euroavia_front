import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'

import { PassengersSelector } from '@/features/PassengersSelector'

import { Button } from '@/shared/ui/Button/Button'

import { DateRangePicker } from '../DateRangePicker/DateRangePicker'
import { TravelInputs } from '../TravelInputs/TravelInputs'
import { useAirport } from '@/context/AirportContext'
import cls from './SimpleTripForm.module.scss'
import { useMemo } from 'react';


export const SimpleTripForm = ({ ChangeBlockButton }) => {
    const navigate = useNavigate()

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

    const values = watch()
    
    const isComplete = useMemo(() => {
        // Проверяем, что каждое значение не пустое
        console.log(values)
        return Object.values(values).every(v => v && v.toString().trim().length > 0);
    }, [values]);

    const { originAirport, setOriginAirport, destinationAirport, setDestinationAirport } = useAirport();

    const onSubmit = async () => {
        const { adults = 1, childrens = 0, infants = 0 } = getValues('passengers') || {}
        console.log(getValues('passengers'), "passengers")
        console.log(adults, childrens, infants, "adults")

        const originId = getValues('departure')
        const destinationId = getValues('destination')
        const cityFromName = originAirport.city.name
        const cityToName = destinationAirport.city.name
        const departureDate = getValues('startDate') ? new Date(getValues('startDate')).toISOString() : ''
        const returnDate = getValues('endDate') ? new Date(getValues('endDate')).toISOString() : ''

        navigate(
            `/search?origin=${originId}&destination=${destinationId}` +
            `&cityFrom=${encodeURIComponent(cityFromName)}` +
            `&cityTo=${encodeURIComponent(cityToName)}` +
            `&departure_at=${departureDate}` +
            `&return_at=${returnDate}` +
            `&adults=${adults}` +
            `&childrens=${childrens}` + 
            `&infants=${infants}`
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
                disabled={!isComplete}
                className={cls.button}
                type={'submit'}
            >
                Поиск
            </Button>
        </form>
    )
}
