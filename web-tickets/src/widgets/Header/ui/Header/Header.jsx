import { Menu } from '@/features/Menu'

import { Container } from '@/shared/ui/Container/Container'
import { Logo } from '@/shared/ui/Logo/Logo'

import MenuIcon from '@icons/menu-icon.svg'

import { HeaderWithForm } from '../HeaderWithForm/HeaderWithForm'

import cls from './Header.module.scss'
import { useState } from 'react'
import Modal from '@/widgets/Modal/Modal'
import { RegisterForm } from '@/features/RegisterForm'


export const Header = ({ children, isForm = false }) => {
	const [isOpenRegister, setOpenRegister] = useState(false);

	return (
		<header className={cls.header}>
			<div className={cls.wrapper}>
				<Container className={cls.wrapper}>
					<Logo
						width='127'
						height='28'
					/>
					{children && children}
					<div>
						<img onClick={() => setOpenRegister(true)} src='/static/icons/profile.png' style={{padding: "5px"}} />
						<Menu buttonValue={<MenuIcon/>}/>
					</div>

					<Modal isOpen={isOpenRegister}>
						<RegisterForm onClose={() => setOpenRegister(false)} />
					</Modal>
				</Container>
			</div>
			{isForm && <HeaderWithForm />}
		</header>
	)
}
