import React, { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../redux/hooks/redux';
import styles from './Reviews.module.scss';
import { ReviewList, SpinnerBallTriangle } from '../index';
import { fetchProtectedReviews, fetchReviews } from '../../api';

export const Reviews = () => {

	const colorSpinner = '#0d6efd';

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
				? <SpinnerBallTriangle color={colorSpinner} />
				: <ReviewList reviews={items} />}
		</div>
	)
}