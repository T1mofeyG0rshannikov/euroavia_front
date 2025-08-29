import { classNames } from '@/shared/lib/classNames/classNames'

import cls from './Container.module.scss'

export const Container = ({ className, children }) => {
	return <div className={classNames(cls.container, [className])}>{children}</div>
}
