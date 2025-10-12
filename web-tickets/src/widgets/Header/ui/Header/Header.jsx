import { Menu } from '@/features/Menu'

import { Container } from '@/shared/ui/Container/Container'
import { Logo } from '@/shared/ui/Logo/Logo'

import MenuIcon from '@icons/menu-icon.svg'

import { HeaderWithForm } from '../HeaderWithForm/HeaderWithForm'

import cls from './Header.module.scss'
import { useModals } from '../../../../context/ModalsContext'

export const Header = ({ children, isForm = false }) => {
	const { openLoginForm, closeLoginForm, openRegisterForm, closeRegisterForm, openRequiredLoginForm, closeRequiredLoginForm } = useModals();

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
						<img onClick={openRegisterForm} src='/static/icons/profile.png' style={{padding: "5px"}} />
						<Menu buttonValue={<MenuIcon/>}/>
					</div>
				</Container>
			</div>
			{isForm && <HeaderWithForm />}
		</header>
	)
}
