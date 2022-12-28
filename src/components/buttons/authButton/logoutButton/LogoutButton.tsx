import Button from 'react-bootstrap/esm/Button'

interface ILogoutButton {
	onLogout(): void;
}

export const LogoutButton = (props: ILogoutButton) => {
	return (
		<Button
			size='sm'
			children='Log Out'
			// после выхода из системы, пользователь перенаправляется на главную страницу
			onClick={() => props.onLogout()}
			variant="outline-danger"
		/>
	)
}