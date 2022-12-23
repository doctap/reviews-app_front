import { useAuth0 } from '@auth0/auth0-react';
import React, { useEffect } from 'react';
import { fetchReviews } from '../../api/http-client';
import SpinnerBallTriangle from '../../components/boundary/spinners/Spinner';
import ListReviews from '../../components/listReviews/ListReviews';
import { useAppDispatch, useAppSelector } from '../../redux/hooks/redux';
import styles from './HomePage.module.scss';

export default function HomePage() {
	const { getAccessTokenSilently } = useAuth0();

	const { error, reviews, isLoading } = useAppSelector(st => st.reviewsSlice);
	const dispatch = useAppDispatch();

	const qwerty = async () => {

		const token = await getAccessTokenSilently()


	}

	useEffect(() => {
		dispatch(fetchReviews({ skip: 2, take: 2 }))
	}, [])

	return (
		<div className={styles.homePage}>
			HomePage
			<button children='Давай жмакни' onClick={qwerty} />
			<div className={styles.listReviews}>

				{isLoading && <SpinnerBallTriangle color='#0d6efd' />}
				{error && <h1>{error}</h1>}
				<ListReviews reviews={reviews} />
			</div>
		</div>
	)
}