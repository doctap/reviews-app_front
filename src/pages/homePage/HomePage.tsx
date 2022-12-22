import { useAuth0 } from '@auth0/auth0-react';
import React, { useEffect, useState } from 'react';
import { IReview } from '../../api/data-contracts/data-contracts';
import { getReviews, likeReview } from '../../api/http-client';
import ListReviews from '../../components/listReviews/ListReviews';
import styles from './HomePage.module.scss';

export default function HomePage() {
	const [reviews, setReviews] = useState<IReview[]>([]);
	const { loginWithRedirect, getAccessTokenSilently } = useAuth0();

	const qwerty = async () => {

		const token = await getAccessTokenSilently()

		likeReview({ isLike: true, reviewsId: 2 }, token)
			.then(r => console.log(r))
			.catch(e => loginWithRedirect())//разобраться с возможными ошибками
	}

	useEffect(() => {
		getReviews({ skip: 2, take: 2 }).then(r => setReviews(r))
	}, [])

	return (
		<div className={styles.homePage}>
			HomePage
			<button children='Давай жмакни' onClick={qwerty} />
			<div className={styles.listReviews}>
				<ListReviews reviews={reviews} />
			</div>
		</div>
	)
}