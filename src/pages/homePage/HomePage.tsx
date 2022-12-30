import React from 'react';
import { Outlet } from 'react-router-dom';
import styles from './HomePage.module.scss';

export default function HomePage() {

	return (
		<div className={styles.homePage}>
			HomePage
			<Outlet />
		</div>
	)
}