import React, { useState } from 'react'
import { IReview } from '../../api/data-contracts/data-contracts'
import { likeReview } from '../../api/http-client';
import LikeBtn from '../btnLike/LikeBtn';
import Select from '../selects/select/Select';
import styles from './Review.module.scss';

export default function Review(props: IReview) {
	const reviewAuthor = props.user_id;

	const [like, setLike] = useState(false);

	const getNewLike = () => {
		setLike(!like);
		// likeReview({ });
	}


	return (
		<div id={`review${props.id}`} className={styles.review}>

			<div className={styles.title}>
				<div>{props.title}</div>
				<div>{`Review type: ${props.type}`}</div>
			</div>

			<div className={styles.image}>
				{props.image}
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
						{`Rating among users: ${parseFloat(props.average_rating)}/5`}
					</div>
					<div className={styles.selectRate}>
						<Select size='sm' getRate={() => 0} options={[1, 2, 3, 4, 5]} />
					</div>
				</div>
				<div className={styles.likeButton}>
					<LikeBtn onClick={getNewLike} isLike={like} />
				</div>
			</div>

			<div className={styles.tags}>
				{props.tags}
			</div>

		</div>
	)
}