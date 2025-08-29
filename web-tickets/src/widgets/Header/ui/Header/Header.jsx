import { Menu } from '@/features/Menu'

import { Container } from '@/shared/ui/Container/Container'
import { Logo } from '@/shared/ui/Logo/Logo'

import MenuIcon from '@icons/menu-icon.svg'

import { HeaderWithForm } from '../HeaderWithForm/HeaderWithForm'

import cls from './Header.module.scss'

export const Header = ({ children, isForm = false }) => {
	return (
		<header className={cls.header}>
			<div className={cls.wrapper}>
				<Container className={cls.wrapper}>
					<Logo
						width='127'
						height='28'
					/>
					{children && children}
					<Menu buttonValue={<MenuIcon/>}/>
				</Container>
			</div>
			{isForm && <HeaderWithForm />}
		</header>
	)
}
