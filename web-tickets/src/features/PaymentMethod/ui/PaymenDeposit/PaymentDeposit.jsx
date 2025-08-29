import { useState } from 'react'

import { Box } from '@/shared/ui/Box/Box'
import { Button } from '@/shared/ui/Button/Button'
import { Modal, OpenModalButton } from '@/shared/ui/Modal/Modal'

import cls from './PaymentDeposit.module.scss'

export const PaymentDeposit = ({ price }) => {
	const [isModalOpen, setIsModalOpen] = useState(false)

	const openModal = () => setIsModalOpen(true)
	const closeModal = () => setIsModalOpen(false)

	return (
		<>
			<OpenModalButton onClick={openModal}>С депозита {price} ₽</OpenModalButton>
			<Modal
				isOpen={isModalOpen}
				onClose={closeModal}
			>
				<h5>Через депозитный счет: {price} руб.</h5>
				<p>На вашем счете: 0 RUB</p>
				<Box>
					<p>Как использовать депозит:</p>
					<ol className={cls.list}>
						<li>Пополните депозит, от 2000 р.</li>
						<li> Используйте средства на депозите для оплаты заказов с дополнительной скидкой</li>
					</ol>
					<Button>Пополнить депозит</Button>
				</Box>
			</Modal>
		</>
	)
}
