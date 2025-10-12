import { AppRoutes } from './provider/router/ui/AppRoutes'
import { AirportProvider } from '@/context/AirportContext';
import { UserProvider } from '../context/UserContext';
import './styles/global.scss'
import { ModalsProvider } from '../context/ModalsContext';


export const App = () => {
	return (
		<div className={'app'}>
			<AirportProvider>
				<UserProvider>
					<ModalsProvider>
						<AppRoutes />
					</ModalsProvider>
				</UserProvider>
			</AirportProvider>
		</div>
	)
}
