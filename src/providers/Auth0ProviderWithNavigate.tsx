import { Auth0Provider } from '@auth0/auth0-react'
import { useNavigate } from 'react-router-dom'
import { Children } from '../types/index'

const domain = process.env.REACT_APP_AUTH0_DOMAIN as string
const clientId = process.env.REACT_APP_AUTH0_CLIENT_ID as string
const audience = process.env.REACT_APP_AUTH0_AUDIENCE as string

const Auth0ProviderWithNavigate = ({ children }: Children) => {
	const navigate = useNavigate()

	// функция, вызываемая после авторизации
	const onRedirectCallback = (appState?: { returnTo?: string }) => {
		// путь для перенаправления указывается в свойстве `returnTo`
		// по умолчанию пользователь возвращается на текущую страницу
		navigate(appState?.returnTo || window.location.pathname)
	}

	return (
		<Auth0Provider
			domain={domain}
			clientId={clientId}
			// данная настройка нужна для взаимодействия с сервером
			audience={audience}
			redirectUri={window.location.origin}
			onRedirectCallback={onRedirectCallback}
		>
			{children}
		</Auth0Provider>
	)
}

export default Auth0ProviderWithNavigate
