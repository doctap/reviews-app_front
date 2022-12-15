import { useAuth0 } from '@auth0/auth0-react';
import React, { useEffect, useState } from 'react';
import { IReviews } from '../../api/data-contracts/data-contracts';
import { getProtectedMessage, getReviews, likeReview } from '../../api/http-client';
import styles from './HomePage.module.scss';

export default function HomePage() {
	const [reviews, setReviews] = useState<IReviews[]>([]);

	const qwerty = () => {

	}

	useEffect(() => {
		getReviews({ skip: 2, take: 2 }).then(r => console.log(r))
	}, [])

	return (
		<div className={styles.qwe}>
			HomePage
			<button children='Давай жмакни' onClick={qwerty} />
		</div>
	)
}