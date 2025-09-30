import { AppRoutes } from './provider/router/ui/AppRoutes'
import { AirportProvider } from '@/context/AirportContext';
import { UserProvider } from '../context/UserContext';
import './styles/global.scss'


export const App = () => {
	return (
		<div className={'app'}>
			<AirportProvider>
				<UserProvider>
					<AppRoutes />
				</UserProvider>
			</AirportProvider>
		</div>
	)
}
