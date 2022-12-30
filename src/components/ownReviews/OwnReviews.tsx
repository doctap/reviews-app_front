import React, { useEffect, useState } from 'react'
import { Button } from 'react-bootstrap';
import { createReview, fetchReviewsUserOwn } from '../../api/http-client';
import { useAppDispatch, useAppSelector } from '../../redux/hooks/redux';
import SpinnerBallTriangle from '../boundary/spinners/Spinner'
import CreateReviewForm, { ICreateReviewCardLabels } from '../cards/createReviewForm/CreateReviewForm';
import ReviewList from '../reviewList/ReviewList'
import styles from './OwnReviews.module.scss';

const createFormLabels: ICreateReviewCardLabels = {
	labelTitle: 'title',
	labelType: 'type',
	labelTags: 'tags',
	labelNameWork: 'name work',
	labelAuthorRating: 'Author Rating',
	labelText: 'description',
	labelImage: 'Drag and drop an image!',
}

export default function OwnReviews() {

	const { data_user, token } = useAppSelector(state => state.userSlice);
	const [showCreateCard, setShowCreateCard] = useState(false);
	const [isSuccessCreation, setIsSuccessCreation] = useState(false);
	const { error, isLoading, reviews } = useAppSelector(state => state.reviewsSlice);
	const dispatch = useAppDispatch();

	const sendFrom = async (body: FormData) => {
		await createReview(body)
			.then(() => {
				setIsSuccessCreation(true);
			})
	}

	useEffect(() => {
		dispatch(fetchReviewsUserOwn({ skip: 0, take: 'ALL', sub: data_user.sub, token }))
	}, [isSuccessCreation, data_user, showCreateCard, dispatch])

	return (
		<div className={styles.ownReviews}>
			<div className={styles.header}>
				<div className={styles.userCard}>
					<div>
						<img src={data_user?.picture} alt={data_user?.name} />
					</div>
					<div>
						<h5>{data_user?.name}</h5>
						<div>{data_user?.email}</div>
					</div>
					<div>
						<Button variant="primary" children='Create a review' onClick={() => setShowCreateCard(!showCreateCard)} />
					</div>
				</div>
				{
					isSuccessCreation
						? <h4 className={styles.successAnswer}>Successful Creation</h4>
						: null
				}
			</div>
			{
				showCreateCard
					? <div className={styles.CreateReviewForm}>
						<CreateReviewForm
							authorId={data_user?.sub}
							labels={createFormLabels}
							submitForm={sendFrom}
						/>
					</div>
					: null
			}

			<div className={styles.listReviews}>
				{error && <h1>{error}</h1>}
				{isLoading ? <SpinnerBallTriangle color='#0d6efd' /> : <ReviewList currentPage='profilePage' reviews={reviews} />}
			</div>

		</div>
	)
}
