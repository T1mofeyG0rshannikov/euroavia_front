import { Breadcrumbs } from '@/entities/Breadcrumbs'

import { Container } from '@/shared/ui/Container/Container'

import cls from './Top.module.scss'

export const Top = ({ title, subtitle, breadcrumbs }) => {
	return (
		<section className={cls.booking}>
			<Container>
				<Breadcrumbs>{breadcrumbs}</Breadcrumbs>
				<div className={cls.content}>
					<h1 className={cls.title}>{title}</h1>
					<p className={cls.subtitle}>{subtitle}</p>
				</div>
			</Container>
		</section>
	)
}
