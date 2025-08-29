import Slider from 'rc-slider'
import { useMemo } from 'react'

import './Range.scss'

export const Range = ({ diapason, setValue, children, name }) => {
	const diapasonCopy = useMemo(() => diapason, [])

	return (
		<div className={'range'}>
			<Slider
				range
				min={diapasonCopy[0]}
				max={diapasonCopy[1]}
				value={diapason}
				onChange={value => {
					setValue(name, value)
				}}
			/>

			{children}
		</div>
	)
}
