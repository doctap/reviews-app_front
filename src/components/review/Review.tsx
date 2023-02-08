import { useAuth0 } from '@auth0/auth0-react';
import React, { useEffect } from 'react'
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { fetchComments, giveRating, IAddPropsReview, IReview, likeReview } from '../../api';
import { useAppDispatch, useAppSelector } from '../../redux/hooks/redux';
import CheckBoxLike from '../buttons/btnLike/CheckBoxLike';
import { CommentList, SpinnerBallTriangle } from '../index';
import GiveRate from '../selects/giveRate/GiveRate';
import styles from './Review.module.scss';

export default function Review(props: IReview & IAddPropsReview) {

	const { data_user, token, isAuthenticated } = useAppSelector(st => st.userSlice);
	const { items, isLoading, error } = useAppSelector(st => st.commentsSlice);
	const { loginWithRedirect } = useAuth0();
	const navigate = useNavigate();
	const dispatch = useAppDispatch();

	const onChangeRate = (rate: number) => {
		isAuthenticated
			? giveRating({ user_rating: rate, sub: data_user?.sub, review_id: props.id }, token)
			: loginWithRedirect();
	}

	const onChangeLike = (isLike: boolean) => {
		isAuthenticated
			? likeReview({ user_likes_it: isLike, sub: data_user?.sub, review_id: props.id }, token)
			: loginWithRedirect();
	}

	useEffect(() => {
		props.viewComments && dispatch(fetchComments(props.id))
	}, [])

	return (
		<div id={`review${props.id}`} className={styles.review}>

			<div className={styles.title}>
				<div>{props.title}</div>
				<div>{new Date(props.date).toLocaleString()}</div>
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
						{`Rating among users: ${parseFloat(props.average_rating as string)}/5`}
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
				props.isReviewOpen
					? <div className={styles.openReview}>
						<Button children='Open review' onClick={() => navigate(`review/${props.id}`)} />
					</div>
					: null
			}
			<div className={styles.tags}>
				{props.tags}
			</div>
			{
				props.viewComments
					? <div className={styles.comments}>
						{error && <h1>{error}</h1>}
						{isLoading
							? <SpinnerBallTriangle color='#0d6efd' />
							: <CommentList comments={items} />}
					</div>
					: null
			}
		</div>
	)
}