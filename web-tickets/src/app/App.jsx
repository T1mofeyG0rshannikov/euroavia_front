import { AppRoutes } from './provider/router/ui/AppRoutes'
import { AirportProvider } from '@/context/AirportContext';
import './styles/global.scss'

export const App = () => {
	return (
		<div className={'app'}>
			<AirportProvider>
				<AppRoutes />
			</AirportProvider>
		</div>
	)
}
