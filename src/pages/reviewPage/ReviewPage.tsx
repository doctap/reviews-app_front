import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchSelectedProtectedReview, fetchSelectedReview } from '../../api';
import { SpinnerBallTriangle } from '../../components';
import { Review } from '../../components/review/Review';
import { useAppDispatch, useAppSelector } from '../../redux/hooks/redux';
import styles from './ReviewPage.module.scss';
import { spinnerColor } from '../../theme';

export const ReviewPage = () => {
  const { error, items, isLoading } = useAppSelector(st => st.reviewsSlice);
  const { isAuthenticated, token, dataUser } = useAppSelector(st => st.userSlice);
  const dispatch = useAppDispatch();

  let review = items[0];

  const params = useParams();
  const reviewId = parseInt(params.id as string);

  useEffect(() => {
    isAuthenticated
      ? dispatch(fetchSelectedProtectedReview({ sub: dataUser.sub, token, review_id: reviewId }))
      : dispatch(fetchSelectedReview(reviewId));
  }, [isAuthenticated]);

  return (
    <div className={styles.reviewPage}>
      {error !== '' && <h1>{error}</h1>}
      {
        isLoading
          ? <SpinnerBallTriangle color={spinnerColor} />
          : <Review
            viewComments={true}
            isReviewOpen={false}
            date={review.date}
            key={review.id}
            id={review.id}
            author_rating={review.author_rating}
            image={review.image}
            likes={review.likes}
            name_work={review.name_work}
            tags={review.tags}
            text={review.text}
            title={review.title}
            type={review.type}
            user_id={review.user_id}
            average_rating={review.average_rating}
            user_likes_it={review.user_likes_it}
            user_rating={review.user_rating}
          />
      }
    </div>
  );
};
