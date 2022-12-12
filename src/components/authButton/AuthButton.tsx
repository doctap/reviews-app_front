import React from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import { LoginButton } from './loginButton/LoginButton'
import { LogoutButton } from './logoutButton/LogoutButton'

export const AuthButton = () => {
	// статус авторизации
	const { isAuthenticated } = useAuth0()

	return isAuthenticated ? <LogoutButton /> : <LoginButton />
}
