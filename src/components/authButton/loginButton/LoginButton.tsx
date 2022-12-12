import { useAuth0 } from '@auth0/auth0-react'

export const LoginButton = () => {
 // метод для входа в систему
 const { loginWithRedirect } = useAuth0()

 return (
   <button className='auth login' onClick={loginWithRedirect}>
     Log In
   </button>
 )
}