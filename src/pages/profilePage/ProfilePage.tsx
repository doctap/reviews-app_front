import React, { useState } from 'react'
import { withAuthenticationRequired } from '@auth0/auth0-react'
import SpinnerBallTriangle from '../../components/boundary/spinners/Spinner'
import styles from './ProfilePage.module.scss';
import { useAppSelector } from '../../redux/hooks/redux';
import { Button } from 'react-bootstrap';
import { createReview } from '../../api/http-client';
import CreateReviewForm, { ICreateReviewCardLabels } from '../../components/cards/createReviewForm/CreateReviewForm';

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

		const sendFrom = async (body: FormData) => {
			await createReview(body)
				.then(() => {
					setIsSuccessCreation(true);
				})
		}

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

			</div>
		)
	},
	{
		returnTo: '/profilePage',
		onRedirecting: () => <div className={styles.spinner}><SpinnerBallTriangle color='#0d6efd' /></div>
	}
)