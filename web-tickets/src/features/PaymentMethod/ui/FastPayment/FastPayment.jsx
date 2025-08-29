import { useState } from 'react'

import { Button } from '@/shared/ui/Button/Button'
import { Modal, OpenModalButton } from '@/shared/ui/Modal/Modal'

export const FastPayment = ({ price }) => {
	const [isModalOpen, setIsModalOpen] = useState(false)

	const openModal = () => setIsModalOpen(true)
	const closeModal = () => setIsModalOpen(false)

	return (
		<>
			<OpenModalButton onClick={openModal}>
				Система Быстрых Платежей (СБП) {price} ₽
			</OpenModalButton>
			<Modal
				isOpen={isModalOpen}
				onClose={closeModal}
			>
				<h5>Система Быстрых платежей: {price} руб.</h5>
				<p>
					Для совершения платежа Вам будет предложено отсканировать QR-код и произвести оплату через
					мобильное приложение вашего банка.
				</p>
				<Button>Далее</Button>
			</Modal>
		</>
	)
}
