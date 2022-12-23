import React, { useEffect } from 'react'
import { useAuth0, withAuthenticationRequired } from '@auth0/auth0-react'
import SpinnerBallTriangle from '../../components/boundary/spinners/Spinner'
import styles from './ProfilePage.module.scss';

export const ProfilePage = withAuthenticationRequired(
	() => {
		const { user } = useAuth0()

		useEffect(() => {
			console.log(user)
			console.log(JSON.stringify(user, null, 2))
		}, [])

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
		onRedirecting: () => <div className={styles.spinner}><SpinnerBallTriangle color='#0d6efd' /></div>
	}
)