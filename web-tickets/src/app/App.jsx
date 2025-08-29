import { AppRoutes } from './provider/router/ui/AppRoutes'

import './styles/global.scss'

export const App = () => {
	return (
		<div className={'app'}>
			<AppRoutes />
		</div>
	)
}
