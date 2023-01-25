import React from 'react'
import { LoginButton } from './loginButton/LoginButton'
import { LogoutButton } from './logoutButton/LogoutButton'

interface IAuthButton {
	onLogin(): void;
	onLogout(): void;
	isAuth: boolean;
}

export const AuthButton = (props: IAuthButton) => {
	return (
		props.isAuth ? <LogoutButton onLogout={props.onLogout} /> : <LoginButton onLogin={props.onLogin} />
	)
}