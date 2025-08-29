import { Button } from '@/shared/ui/Button/Button'

import CommentIcon from '@icons/comment.svg'
import ShopIcon from '@icons/shop.svg'

import { about, forVisa, main } from '../../config/linksConfig'

import { ContentBox } from './ContentBox'

import cls from './Content.module.scss'

export const Content = () => {
	return (
		<div className={cls.content}>
			<ContentBox
				name={'Главная'}
				links={main}
			/>
			<ContentBox
				name={'Для визы'}
				links={forVisa}
			/>
			<ContentBox
				name={'О ЕвроАвиа'}
				links={about}
			/>

			<Button
				className={cls.contentButton}
				type={'color3'}
				size={'size2'}
				to={'#'}
			>
				<ShopIcon />
				<span>Ваш заказ</span>
			</Button>
			<Button
				className={cls.contentButton}
				type={'color3'}
				size={'size2'}
				to={'#'}
			>
				<CommentIcon />
				<span>Задать вопросы</span>
			</Button>
		</div>
	)
}
