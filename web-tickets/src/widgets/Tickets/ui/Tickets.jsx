import { useEffect, useState } from 'react'

import { TicketsFilter } from '@/features/TicketsFilter/ui/TicketsFilter'
import { TicketsList } from '@/features/TicketsList'

import { Container } from '@/shared/ui/Container/Container'
import { Loading } from '@/shared/ui/Loading/Loading'

import cls from './Tickets.module.scss'

export const Tickets = () => {
	const [isLoading, setIsLoading] = useState(true)
	useEffect(() => {
		const timer = setTimeout(() => {
			setIsLoading(false)
		}, 3000)

		return () => clearTimeout(timer)
	}, [])

	return (
		<Container className={cls.row}>
			{isLoading ? (
				<Loading />
			) : (
				<>
					<TicketsFilter />
					<TicketsList />
				</>
			)}
		</Container>
	)
}
