import React from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import { LoginButton } from './loginButton/LoginButton'
import { LogoutButton } from './logoutButton/LogoutButton'
import { IUser } from '../../api/data-contracts/data-contracts'

interface IAuthButton {
	onLogin(): void;
	onLogout(): void;
}

export const AuthButton = (props: IAuthButton) => {
	// статус авторизации, получение токена
	const { isAuthenticated } = useAuth0();
	
	return (
		isAuthenticated ? <LogoutButton onLogout={props.onLogout} /> : <LoginButton onLogin={props.onLogin} />
	)
}
