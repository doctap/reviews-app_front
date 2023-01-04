import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchProtected_Review, fetch_Review } from '../../api/http-client';
import SpinnerBallTriangle from '../../components/boundary/spinners/Spinner';
import Review from '../../components/review/Review';
import { useAppDispatch, useAppSelector } from '../../redux/hooks/redux';
import styles from './ReviewPage.module.scss';

export default function ReviewPage() {

	const { error, items, isLoading } = useAppSelector(st => st.reviewsSlice);
	const { isAuthenticated, token, data_user } = useAppSelector(st => st.userSlice);
	const dispatch = useAppDispatch();

	// const review = items[0];

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
					: <Review
						viewComments={true}
						isReviewOpen={false}
						date={items[0].date}
						key={items[0].id}
						id={items[0].id}
						author_rating={items[0].author_rating}
						image={items[0].image}
						likes={items[0].likes}
						name_work={items[0].name_work}
						tags={items[0].tags}
						text={items[0].text}
						title={items[0].title}
						type={items[0].type}
						user_id={items[0].user_id}
						average_rating={items[0].average_rating}
						user_likes_it={items[0].user_likes_it}
						user_rating={items[0].user_rating}
					/>
			}
		</div>
	)
}
