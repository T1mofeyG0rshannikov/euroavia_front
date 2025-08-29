import React from 'react'
import ReactDOM from 'react-dom/client'

import { App } from '@/app/App'
import { RouterProvider } from '@/app/provider/router'

const root = ReactDOM.createRoot(document.getElementById('root'))

root.render(
	<RouterProvider>
		<App />
	</RouterProvider>
)
