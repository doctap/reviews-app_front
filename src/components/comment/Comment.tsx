import React from 'react'
import { Card } from 'react-bootstrap'
import { IComment } from '../../api'

export const Comment = (props: IComment) => {
	return (
		<Card
			bg='light'
			// style={{ width: '18rem' }}
			className="mb-2"
		>
			<Card.Header>{`${props.first_name} ${props.last_name} ${new Date(props.date)}`}</Card.Header>
			<Card.Body>
				<Card.Text>
					{props.text}
				</Card.Text>
			</Card.Body>
		</Card>
	)
}
