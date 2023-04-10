import React from 'react';
import { Card } from 'react-bootstrap';
import { type IComment } from '../../api';

export const Comment = (props: IComment) => {
  const date = new Date(props.date);

  return (
    <Card
      bg='light'
      // style={{ width: '18rem' }}
      className="mb-2"
    >
      <Card.Header>
        {`${props.first_name} ${props.last_name} ${date.getUTCDate()}`}
      </Card.Header>
      <Card.Body>
        <Card.Text>
          {props.text}
        </Card.Text>
      </Card.Body>
    </Card>
  );
};
