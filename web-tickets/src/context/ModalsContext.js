import React, { createContext, useContext, useState } from 'react';
import { LoginForm } from '../features/LoginForm/ui/LoginForm';
import { RegisterForm } from '../features/RegisterForm/ui/RegisterForm';
import Modal from '@/widgets/Modal/Modal'

const ModalsContext = createContext();

export function ModalsProvider({ children }) {
    const [isOpenLogin, setOpenLogin] = useState(false);
    const [isOpenRegister, setOpenRegister] = useState(false);
    const [isLoginRequired, setLoginRequired] = useState(false);

    const openLoginForm = () => setOpenLogin(true);

    const openRequiredLoginForm = () => {
        setOpenLogin(true);
        setLoginRequired(true);
    }

    const closeRequiredLoginForm = () => {
        console.log("CLOSE REQUIRED")
        setOpenLogin(false);
        setLoginRequired(false)
    }

    const closeLoginForm = () => {
        console.log("CLOSED FORM")
        setOpenLogin(false);
        setLoginRequired(false);
    }

    const openRegisterForm = () => setOpenRegister(true);
    const closeRegisterForm = () => setOpenRegister(false);

    const openLoginFormAction = () => {
        setLoginRequired(false)
		setOpenRegister(false)
		setOpenLogin(true)
	}

	const openRegisterFormAction = () => {
		setOpenLogin(false)
		setOpenRegister(true)
	}

    return (
        <ModalsContext.Provider value={{ openLoginForm, closeLoginForm, openRegisterForm, closeRegisterForm, openRequiredLoginForm, closeRequiredLoginForm }}>
            {children}
            {<Modal isOpen={isOpenLogin}>
                <LoginForm onClose={closeLoginForm} openRegisterForm={openRegisterFormAction} required={isLoginRequired} />
            </Modal>}
            {<Modal isOpen={isOpenRegister}>
                <RegisterForm onClose={closeRegisterForm} openLoginForm={openLoginFormAction} />
            </Modal>}
        </ModalsContext.Provider>
  );
}

export const useModals = () => useContext(ModalsContext);