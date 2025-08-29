import { Homepage } from 'pages/Homepage'
import { Route, Routes } from 'react-router-dom'

import { BookingPage } from '@/pages/BookingPage'
import { PaymentPage } from '@/pages/PaymentPage'
import { TicketsPage } from '@/pages/TicketsPage/ui/TicketsPage'

import { PAGE_ROUTE } from '@/shared/config/PageRoute/PageRoute'

export const AppRoutes = () => {
	return (
		<Routes>
			<Route
				path={PAGE_ROUTE.HOME}
				element={<Homepage />}
			/>
			<Route
				path={PAGE_ROUTE.TICKETS}
				element={<TicketsPage />}
			/>
			<Route
				path={PAGE_ROUTE.TICKET_BOOKING}
				element={<BookingPage />}
			/>
			<Route
				path={PAGE_ROUTE.PAYMENT}
				element={<PaymentPage />}
			/>
		</Routes>
	)
}
