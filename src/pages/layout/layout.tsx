import { useAuth0 } from '@auth0/auth0-react';
import React from 'react';
import Nav from 'react-bootstrap/Nav';
import { Outlet, Link } from "react-router-dom";
import { AuthButton } from '../../components/authButton/AuthButton';
import UserAuth from '../../components/UserAuth/UserAuth';
import styles from './Layout.module.scss';

export default function Layout() {

	const { user } = useAuth0()

	return (
		<>
			<Nav className={styles.nav} variant="tabs">
				<Nav.Item>
					<Link to="/">Home</Link>
				</Nav.Item>
				<Nav.Item>
					<Link to="/profilePage">My Profile</Link>
				</Nav.Item>
				<Nav.Item>
					<UserAuth familyName={user?.family_name} givenName={user?.given_name} />
				</Nav.Item>
			</Nav>
			<Outlet />
		</>
	)
}

