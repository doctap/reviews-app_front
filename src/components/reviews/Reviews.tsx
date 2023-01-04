import React, { useEffect } from 'react'
import { fetchProtectedReviews, fetchReviews } from '../../api/http-client';
import { useAppDispatch, useAppSelector } from '../../redux/hooks/redux';
import SpinnerBallTriangle from '../boundary/spinners/Spinner';
import ReviewList from '../reviewList/ReviewList';
import styles from './Reviews.module.scss';

export default function Reviews() {

	const { error, items, isLoading } = useAppSelector(st => st.reviewsSlice);
	const { isAuthenticated, token, data_user } = useAppSelector(st => st.userSlice);
	const dispatch = useAppDispatch();

	useEffect(() => {
		isAuthenticated
			? dispatch(fetchProtectedReviews({ skip: 0, take: 'ALL', token: token, sub: data_user?.sub }))
			: dispatch(fetchReviews({ skip: 0, take: 'ALL' }));
	}, [isAuthenticated])

	return (
		<div className={styles.listReviews}>
			{error && <h1>{error}</h1>}
			{isLoading
				? <SpinnerBallTriangle color='#0d6efd' />
				: <ReviewList
					currentPage={''}
					reviews={items} />}
		</div>
	)
}
