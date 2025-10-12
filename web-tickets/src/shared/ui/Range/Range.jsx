import Slider from 'rc-slider'
import { useMemo } from 'react'

import './Range.scss'

export const Range = ({ diapason, value, setValue, children, name }) => {
	return (
		<div className={'range'}>
			<Slider
				range
				min={diapason[0]}
				max={diapason[1]}
				value={value}
				onChange={value => {
					setValue(name, value)
				}}
			/>

			{children}
		</div>
	)
}
