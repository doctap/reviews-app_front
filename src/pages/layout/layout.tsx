import React from 'react';
import Nav from 'react-bootstrap/Nav';
import { Outlet, Link } from "react-router-dom";
import UserAuth from '../../components/UserAuth/UserAuth';
import styles from './Layout.module.scss';

export default function Layout() {
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
					<UserAuth/>
				</Nav.Item>
			</Nav>
			<Outlet />
		</>
	)
}

