import React from 'react'
import { useAuth0, withAuthenticationRequired } from '@auth0/auth0-react'
import Spinner from '../../components/boundary/spinner/Spinner'
import styles from './ProfilePage.module.scss';
import { getProtectedMessage } from '../../api/http-client';

export const ProfilePage = withAuthenticationRequired(
	() => {
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
		returnTo: '/profilePage',
		onRedirecting: () => <div className={styles.spinner}><Spinner /></div>
	}
)