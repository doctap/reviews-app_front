import React from 'react';
import { Outlet, Link } from "react-router-dom";
import { AuthButton } from '../../components/authButton/AuthButton';
import styles from './Layout.module.scss';

export default function Layout() {
	return (
		<>
			<nav className={styles.layout}>
				<Link to="/">Home</Link>
				<Link to="/profilePage">My Profile</Link>
				<AuthButton />
			</nav>


			<Outlet />
		</>
	)
}

