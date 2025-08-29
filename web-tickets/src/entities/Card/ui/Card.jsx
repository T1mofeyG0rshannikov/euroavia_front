import Img from '@/shared/assets/img.png'

import cls from './Card.module.scss'

export const Card = () => {
	return (
		<div className={cls.card}>
			<div className={cls.tickets}>
				<h5 className={cls.route}>Ереван - Санкт Петербург</h5>
				<div className={cls.ticket}>
					<div className={cls.content}>
						<div className={cls.item}>
							<span className={cls.time}>06:00</span>
							<span className={cls.date}>28 августа 2025, Чт</span>
							<span>Ереван EVN</span>
						</div>
						<div className={cls.item}>
							<span>
								<img src={Img} />
							</span>
							<span>в пути: 3ч 50м</span>
						</div>
						<div className={cls.item}>
							<span className={cls.time}>08:50</span>
							<span className={cls.date}>28 августа 2025, Чт</span>
							<span>Санкт Петербург LED</span>
						</div>
					</div>
					<div className={cls.bottom}>
						<span> Рейс: 3F333</span>
						<span>Выполняет: FlyOne Armenia</span>
						<span> Эконом</span>
						<span> Самолет: A320A</span>
					</div>
					<p className={cls.baggage}>Багаж платный</p>
				</div>
				<div className={cls.ticket}>
					<div className={cls.content}>
						<div className={cls.item}>
							<span className={cls.time}>06:00</span>
							<span className={cls.date}>28 августа 2025, Чт</span>
							<span>Ереван EVN</span>
						</div>
						<div className={cls.item}>
							<span>
								<img src={Img} />
							</span>
							<span>в пути: 3ч 50м</span>
						</div>
						<div className={cls.item}>
							<span className={cls.time}>08:50</span>
							<span className={cls.date}>28 августа 2025, Чт</span>
							<span>Санкт Петербург LED</span>
						</div>
					</div>
					<div className={cls.bottom}>
						<span> Рейс: 3F333</span>
						<span>Выполняет: FlyOne Armenia</span>
						<span> Эконом</span>
						<span> Самолет: A320A</span>
					</div>
					<p className={cls.baggage}>Багаж платный</p>
				</div>
			</div>
			<div className={cls.tickets}>
				<h5 className={cls.route}> Санкт Петербург - Ереван</h5>
				<div className={cls.ticket}>
					<div className={cls.content}>
						<div className={cls.item}>
							<span className={cls.time}>06:00</span>
							<span className={cls.date}>28 августа 2025, Чт</span>
							<span>Ереван EVN</span>
						</div>
						<div className={cls.item}>
							<span>
								<img src={Img} />
							</span>
							<span>в пути: 3ч 50м</span>
						</div>
						<div className={cls.item}>
							<span className={cls.time}>08:50</span>
							<span className={cls.date}>28 августа 2025, Чт</span>
							<span>Санкт Петербург LED</span>
						</div>
					</div>
					<div className={cls.bottom}>
						<span> Рейс: 3F333</span>
						<span>Выполняет: FlyOne Armenia</span>
						<span> Эконом</span>
						<span> Самолет: A320A</span>
					</div>
					<p className={cls.baggage}>Багаж платный</p>
				</div>
				<div className={cls.ticket}>
					<div className={cls.content}>
						<div className={cls.item}>
							<span className={cls.time}>06:00</span>
							<span className={cls.date}>28 августа 2025, Чт</span>
							<span>Ереван EVN</span>
						</div>
						<div className={cls.item}>
							<span>
								<img src={Img} />
							</span>
							<span>в пути: 3ч 50м</span>
						</div>
						<div className={cls.item}>
							<span className={cls.time}>08:50</span>
							<span className={cls.date}>28 августа 2025, Чт</span>
							<span>Санкт Петербург LED</span>
						</div>
					</div>
					<div className={cls.bottom}>
						<span> Рейс: 3F333</span>
						<span>Выполняет: FlyOne Armenia</span>
						<span> Эконом</span>
						<span> Самолет: A320A</span>
					</div>
					<p className={cls.baggage}>Багаж платный</p>
				</div>
			</div>
		</div>
	)
}
