import { Link } from 'react-router-dom'

import { PAGE_ROUTE } from '@/shared/config/PageRoute/PageRoute'

export const Logo = () => {
	return <Link to={PAGE_ROUTE.HOME}>Logo</Link>
}
