import { useAuth0 } from '@auth0/auth0-react'
import Button from 'react-bootstrap/esm/Button'

export const LogoutButton = () => {
	const { logout } = useAuth0()

	return (
		<Button
			size='sm'
			children='Log Out'
			// после выхода из системы, пользователь перенаправляется на главную страницу
			onClick={() => logout({ returnTo: window.location.origin })}
			variant="outline-danger"
		/>
	)
}