import React from 'react'
import { withAuthenticationRequired } from '@auth0/auth0-react'
import { SpinnerBallTriangle } from '../../components/index'
import styles from './ProfilePage.module.scss';
import { Outlet } from 'react-router-dom';

export const ProfilePage = withAuthenticationRequired(
	() => {

		return (
			<div className={styles.profilePage}>
				ProfilePage
				<Outlet />
			</div>
		)
	},
	{
		returnTo: '/profilePage',
		onRedirecting: () => <div className={styles.spinner}><SpinnerBallTriangle color='#0d6efd' /></div>
	}
)