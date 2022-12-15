import { useAuth0 } from '@auth0/auth0-react'
import { Button } from 'react-bootstrap'

export const LoginButton = () => {
	// метод для входа в систему
	const { loginWithRedirect } = useAuth0()

	return (
		<Button
			size='sm'
			variant="outline-success"
			children='Log In'
			onClick={loginWithRedirect}
		/>
	)
}