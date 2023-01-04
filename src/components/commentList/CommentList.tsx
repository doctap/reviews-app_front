import React from 'react'
import { IComment } from '../../api/data-contracts/data-contracts'
import Comment from '../comment/Comment'

interface ICommentList {
	comments: IComment[]
}

export default function CommentList(props: ICommentList) {
	return (
		<>
			{
				props.comments.map(c => (
					<Comment
						key={crypto.randomUUID()}
						first_name={c.first_name}
						last_name={c.last_name}
						user_id={c.user_id}
						date={c.date}
						text={c.text} />
				))
			}
		</>
	)
}
