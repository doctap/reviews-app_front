import React from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import { LoginButton } from './loginButton/LoginButton'
import { LogoutButton } from './logoutButton/LogoutButton'

export const AuthButton = () => {
	// статус авторизации, получение токена
	const { isAuthenticated, getAccessTokenSilently } = useAuth0();

	isAuthenticated && getAccessTokenSilently().then(t => localStorage.setItem("reviewApp-token", t));

	return (
		isAuthenticated ? <LogoutButton /> : <LoginButton />
	)
}
