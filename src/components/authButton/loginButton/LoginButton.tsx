import { useAuth0 } from '@auth0/auth0-react'
import { Button } from 'react-bootstrap'

export const LoginButton = () => {
	// метод для входа в систему
	const { loginWithRedirect } = useAuth0()


	// if (isAuthenticated) {
	// 	getAccessTokenSilently()
	// 		.then(t => {
	// 			data.token = t;
	// 			registerUser(data)
	// 				.then(r => {
	// 					console.log(r)
	// 				})
	// 		})
	// }

	return (
		<Button
			size='sm'
			variant="outline-success"
			children='Log In'
			onClick={loginWithRedirect}
		/>
	)
}