import { classNames } from '@/shared/lib/classNames/classNames'

import cls from './Box.module.scss'

export const Box = ({ children, className }) => {
	return <div className={classNames(cls.box, [className])}>{children}</div>
}
