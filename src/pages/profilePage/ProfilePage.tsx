import React from 'react'
import { useAuth0, withAuthenticationRequired } from '@auth0/auth0-react'
import Spinner from '../../components/boundary/spinner/Spinner'
import styles from './ProfilePage.module.scss';
import { getProtectedMessage } from '../../api/messages';

export const ProfilePage = withAuthenticationRequired(
	() => {
		const { user } = useAuth0()

		const qwerty = () => {
			getProtectedMessage(localStorage.getItem("reviewApp-token") ?? '').then(r => console.log(r))
		}

		return (
			<>
				<h1>Profile Page</h1>
				<div className='profile'>
					<img src={user?.picture} alt={user?.name} />
					<div>
						<h2>{user?.name}</h2>
						<p>{user?.email}</p>
					</div>
					<button children='Давай жмакни на меня ублюдок' onClick={qwerty} />
				</div>
			</>
		)
	},
	{
		returnTo: '/profile',
		onRedirecting: () => <div className={styles.spinner}><Spinner /></div>
	}
)