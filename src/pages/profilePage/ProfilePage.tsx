import React, { useEffect, useState } from 'react'
import { withAuthenticationRequired } from '@auth0/auth0-react'
import SpinnerBallTriangle from '../../components/boundary/spinners/Spinner'
import styles from './ProfilePage.module.scss';
import { useAppDispatch, useAppSelector } from '../../redux/hooks/redux';
import { Button } from 'react-bootstrap';
import { createReview, fetchReviewsUserOwn } from '../../api/http-client';
import CreateReviewForm, { ICreateReviewCardLabels } from '../../components/cards/createReviewForm/CreateReviewForm';
import ListReviews from '../../components/listReviews/ListReviews';

const createFormLabels: ICreateReviewCardLabels = {
	labelTitle: 'title',
	labelType: 'type',
	labelTags: 'tags',
	labelNameWork: 'name work',
	labelAuthorRating: 'Author Rating',
	labelText: 'description',
	labelImage: 'Drag and drop an image!',
}

export const ProfilePage = withAuthenticationRequired(
	() => {
		const { data_user } = useAppSelector(state => state.userSlice);
		const [showCreateCard, setShowCreateCard] = useState(false);
		const [isSuccessCreation, setIsSuccessCreation] = useState(false);
		const { error, isLoading, reviews } = useAppSelector(state => state.reviewsSlice);
		// const { isAuthenticated } = useAppSelector(state => state.userSlice);
		const dispatch = useAppDispatch();

		const sendFrom = async (body: FormData) => {
			await createReview(body)
				.then(() => {
					setIsSuccessCreation(true);
				})
		}

		useEffect(() => {
			dispatch(fetchReviewsUserOwn({ skip: 0, take: 'ALL', sub: data_user?.sub }))
		}, [isSuccessCreation, data_user, showCreateCard, dispatch])

		return (
			<div className={styles.profilePage}>

				<div className={styles.header}>
					<div className={styles.userCard}>
						<div>
							<img src={data_user?.picture} alt={data_user?.name} />
						</div>
						<div>
							<h5>{data_user?.name}</h5>
							<p>{data_user?.email}</p>
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

				<div>
					{isLoading ? <SpinnerBallTriangle color='#0d6efd' /> : <ListReviews reviews={reviews} />}
					{error && <h1>{error}</h1>}
				</div>

			</div>
		)
	},
	{
		returnTo: '/profilePage',
		onRedirecting: () => <div className={styles.spinner}><SpinnerBallTriangle color='#0d6efd' /></div>
	}
)