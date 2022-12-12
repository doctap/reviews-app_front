import React from 'react'
import { useAuth0, withAuthenticationRequired } from '@auth0/auth0-react'
import Spinner from '../../components/boundary/spinner/Spinner'
import styles from './ProfilePage.module.scss';

// оборачиваем код компонента в утилиту
export const ProfilePage = withAuthenticationRequired(
	() => {
	  // получаем данные пользователя
	  const { user } = useAuth0()
  
	  return (
		 <>
			<h1>Profile Page</h1>
			<div className='profile'>
			  <img src={user?.picture} alt={user?.name} />
			  <div>
				 <h2>{user?.name}</h2>
				 <p>{user?.email}</p>
			  </div>
			</div>
		 </>
	  )
	},
	{
	  // обе настройки являются опциональными
	  returnTo: '/profile',
	  onRedirecting: () => <div className={styles.spinner}><Spinner /></div>
	}
  )