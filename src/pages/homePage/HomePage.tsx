import React, { useEffect } from 'react';
import { fetchProtectedReviews, fetchReviews } from '../../api/http-client';
import SpinnerBallTriangle from '../../components/boundary/spinners/Spinner';
import ListReviews from '../../components/listReviews/ListReviews';
import { useAppDispatch, useAppSelector } from '../../redux/hooks/redux';
import styles from './HomePage.module.scss';

export default function HomePage() {

	const { error, reviews, isLoading } = useAppSelector(st => st.reviewsSlice);
	const { isAuthenticated, token, data_user } = useAppSelector(st => st.userSlice);
	const dispatch = useAppDispatch();

	useEffect(() => {
		isAuthenticated ? dispatch(fetchProtectedReviews({ skip: 0, take: 'ALL', token: token, sub: data_user?.sub })) : dispatch(fetchReviews({ skip: 0, take: 'ALL' }));
		console.log('first')
	}, [isAuthenticated])

	return (
		<div className={styles.homePage}>
			<div className={styles.listReviews}>
				{isLoading ? <SpinnerBallTriangle color='#0d6efd' /> : <ListReviews reviews={reviews} />}
				{error && <h1>{error}</h1>}
			</div>
		</div>
	)
}