import { Link } from 'react-router-dom'

import { Checkbox } from '@/shared/ui/Checkbox/Checkbox'

import cls from './AddParam.module.scss'

export const AddParam = () => {
	return (
		<div className={cls.addParam}>
			<h5>Добавить заказ со скидкой</h5>
			<Checkbox>
				Страховка "Испании на 7дн" <span className={cls.price}>+790 </span>
				<Link to={'#'}>Подробно</Link>
			</Checkbox>
			<Checkbox>
				Страховка "Испании на 7дн" <span className={cls.price}>+790 </span>
				<Link to={'#'}>Подробно</Link>
			</Checkbox>
		</div>
	)
}
