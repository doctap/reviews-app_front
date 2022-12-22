import React from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import { LoginButton } from './loginButton/LoginButton'
import { LogoutButton } from './logoutButton/LogoutButton'
import { IRegisterUser } from '../../api/data-contracts/data-contracts'
import { registerUser } from '../../api/http-client'

export const AuthButton = () => {
	// статус авторизации, получение токена
	const { isAuthenticated } = useAuth0();

	return (
		isAuthenticated ? <LogoutButton /> : <LoginButton />
	)
}
