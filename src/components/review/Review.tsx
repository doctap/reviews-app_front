import { useAuth0 } from '@auth0/auth0-react';
import React, { useState } from 'react'
import { Button } from 'react-bootstrap';
import { IOpenReview, IReview } from '../../api/data-contracts/data-contracts'
import { giveRating, likeReview } from '../../api/http-client';
import { useAppSelector } from '../../redux/hooks/redux';
import CheckBoxLike from '../buttons/btnLike/CheckBoxLike';
import GiveRate from '../selects/giveRate/GiveRate';
import styles from './Review.module.scss';

export default function Review(props: IReview & IOpenReview) {

	const { data_user, token, isAuthenticated } = useAppSelector(st => st.userSlice);
	const { loginWithRedirect } = useAuth0();

	const reviewAuthor = props.user_id;

	const onChangeRate = (rate: number) => {
		isAuthenticated ?
			giveRating({ user_rating: rate, sub: data_user?.sub, review_id: props.id }, token)
			:
			loginWithRedirect();
	}

	const onChangeLike = (isLike: boolean) => {
		isAuthenticated ?
			likeReview({ user_likes_it: isLike, sub: data_user?.sub, review_id: props.id }, token)
			:
			loginWithRedirect();
	}

	return (
		<div id={`review${props.id}`} className={styles.review}>

			<div className={styles.title}>
				<div>{props.title}</div>
				<div>{`Review type: ${props.type}`}</div>
			</div>

			<div className={styles.imageContainer}>
				<img
					className={styles.image}
					src={`data:image/jpg;base64, ${props.image}`}
					alt="здесь должна быть картинка"
				/>
			</div>

			<div className={styles.description}>
				<div>{`Name work: ${props.name_work}`}</div>
				<div>{props.text}</div>
			</div>

			<div className={styles.ratingsAndLikes}>
				<div className={styles.authorRating}>
					{`Author rating: ${props.author_rating}/10`}
				</div>
				<div className={styles.ratingAmongUsers}>
					<div>
						{`Rating among users: ${parseFloat(props.average_rating ?? '')}/5`}
					</div>
					<div className={styles.selectRate}>
						<div className={styles.selectText}>
							Give rating
						</div>
						<GiveRate value={props.user_rating} size='sm' getRate={onChangeRate} options={[1, 2, 3, 4, 5]} />
					</div>
				</div>
				<div className={styles.likeButton}>
					<CheckBoxLike text='like it?' isLike={props.user_likes_it ?? false} onLike={onChangeLike} />
				</div>
			</div>

			{
				props.buttonOpen
					? <div className={styles.openReview}>
						<Button children='Open review' onClick={() => 0} />
					</div>
					: null
			}

			<div className={styles.tags}>
				{props.tags}
			</div>

		</div>
	)
}