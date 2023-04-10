import React, { useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { fetchComments, giveRating, type IAddPropsReview, type IReview, likeReview } from '../../api';
import { useAppDispatch, useAppSelector } from '../../redux/hooks/redux';
import { CheckBoxLike, CommentList, GiveRate, SpinnerBallTriangle } from '../index';
import styles from './Review.module.scss';
import { spinnerColor } from '../../theme';

export const Review = (props: IReview & IAddPropsReview) => {
  const { dataUser, token, isAuthenticated } = useAppSelector(st => st.userSlice);
  const { items, isLoading, error } = useAppSelector(st => st.commentsSlice);
  const { loginWithRedirect } = useAuth0();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const onChangeRate = (rate: number) => {
    isAuthenticated
      ? giveRating({ user_rating: rate, sub: dataUser?.sub, review_id: props.id }, token)
      : loginWithRedirect();
  };

  const onChangeLike = (isLike: boolean) => {
    isAuthenticated
      ? likeReview({ user_likes_it: isLike, sub: dataUser?.sub, review_id: props.id }, token)
      : loginWithRedirect();
  };

  useEffect(() => {
    props.viewComments && dispatch(fetchComments(props.id));
  }, []);

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
            <Button onClick={() => { navigate(`review/${props.id}`); }}>
              Open review
            </Button>
          </div>
          : null
      }
      <div className={styles.tags}>
        {props.tags}
      </div>
      {
        props.viewComments
          ? <div className={styles.comments}>
            {error !== '' && <h1>{error}</h1>}
            {isLoading
              ? <SpinnerBallTriangle color={spinnerColor} />
              : <CommentList comments={items} />}
          </div>
          : null
      }
    </div>
  );
};
