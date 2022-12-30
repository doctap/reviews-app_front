import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchProtected_Review, fetch_Review } from '../../api/http-client';
import SpinnerBallTriangle from '../../components/boundary/spinners/Spinner';
import Review from '../../components/review/Review';
import { useAppDispatch, useAppSelector } from '../../redux/hooks/redux';
import styles from './ReviewPage.module.scss';

export default function ReviewPage() {

	const { error, reviews, isLoading } = useAppSelector(st => st.reviewsSlice);
	const { isAuthenticated, token, data_user } = useAppSelector(st => st.userSlice);
	const dispatch = useAppDispatch();

	const review = reviews[0];

	const params = useParams();
	const review_id = parseInt(params.id as string);

	useEffect(() => {
		isAuthenticated ? dispatch(fetchProtected_Review({ sub: data_user.sub, token, review_id })) : dispatch(fetch_Review(review_id))
	}, [isAuthenticated])

	return (
		<div className={styles.reviewPage}>
			{error && <h1>{error}</h1>}
			{
				isLoading
					? <SpinnerBallTriangle color='#0d6efd' />
					:	<Review
							buttonOpen={true}
							key={review.id}
							id={review.id}
							author_rating={review.author_rating}
							image={review.image}
							likes={review.likes}
							name_work={review.name_work}
							tags={review.tags}
							text={review.text}
							title={review.title}
							type={review.type}
							user_id={review.user_id}
							average_rating={review.average_rating}
							user_likes_it={review.user_likes_it}
							user_rating={review.user_rating}
						/>
			}
		</div>
	)
}
