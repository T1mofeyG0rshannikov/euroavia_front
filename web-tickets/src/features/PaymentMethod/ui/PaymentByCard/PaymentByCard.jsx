import { useState } from 'react'

import { Box } from '@/shared/ui/Box/Box'
import { Button } from '@/shared/ui/Button/Button'
import { Dropdown } from '@/shared/ui/Dropdown/Dropdown'
import { Modal, OpenModalButton } from '@/shared/ui/Modal/Modal'

import cls from './PaymentByCard.module.scss'

export const PaymentByCard = ({ price }) => {
	const [isModalOpen, setIsModalOpen] = useState(false)

	const openModal = () => setIsModalOpen(true)
	const closeModal = () => setIsModalOpen(false)

	return (
		<>
			<OpenModalButton onClick={openModal}>Банковская карта {price} ₽</OpenModalButton>
			<Modal
				isOpen={isModalOpen}
				onClose={closeModal}
			>
				<h5>Оплата банковской картой</h5>
				<p>
					Выберите любой из способов оплаты Если платеж отлоняется, попробуйте другой способ оплаты
					Для карт российских банков: {price} руб.
				</p>
				<Box>
					Для карт российских банков: {price} руб.
					<Button className={cls.button}>Оплатить</Button>
				</Box>
				<Box>
					Международные платежи: 869 руб.
					<Button className={cls.button}>Оплатить</Button>
					<Dropdown
						className={cls.dropdownButton}
						type={'clear'}
						buttonValue={'Список запрещенных стран '}
					>
						<h5>Не примаются карты, выпущенные странами:</h5>
						<p>
							Куба, Иран, Ирак, Азербайджан, Судан, Сирия, Венесуэла, Мьянма, Корея, Западная
							Сахара, Никарагуа, Афганистан, Йемен, Мали, Зимбабве, Судан, Украина, США, Сингапур,
							Турция, Канада, Беларусь, Корейская НДР
						</p>
					</Dropdown>
				</Box>
			</Modal>
		</>
	)
}
