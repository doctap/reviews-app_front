import React from 'react';
import { type IComment } from '../../api';
import { Comment } from '../index';

interface ICommentList {
  comments: IComment[]
}

export const CommentList = (props: ICommentList) => {
  return (
    <>
      {
        props.comments.map(c => (
          <Comment
            key={c.date.toString()}
            first_name={c.first_name}
            last_name={c.last_name}
            user_id={c.user_id}
            date={c.date}
            text={c.text}
          />
        ))
      }
    </>
  );
};
