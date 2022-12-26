import React from 'react'
import { IReview } from '../../api/data-contracts/data-contracts'
import Review from '../review/Review';

interface IListReviews {
	reviews: IReview[];
}

export default function ListReviews(props: IListReviews) {
	return (
		<>
			{props.reviews.map(r => (
				<Review
					key={r.id}
					id={r.id}
					author_rating={r.author_rating}
					image={r.image}
					likes={r.likes}
					name_work={r.name_work}
					tags={r.tags}
					text={r.text}
					title={r.title}
					type={r.type}
					user_id={r.user_id}
					average_rating={r.average_rating}
					user_likes_it={r.user_likes_it}
					user_rating={r.user_rating}
				/>
			))}
		</>
	)
}
