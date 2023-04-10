import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { createReview, fetchReviewsUserOwn } from '../../api';
import { useAppDispatch, useAppSelector } from '../../redux/hooks/redux';
import { CreateReviewForm, type ICreateReviewCardLabels, ReviewList, SpinnerBallTriangle, UserCard } from '../index';
import styles from './OwnReviews.module.scss';

const createFormLabels: ICreateReviewCardLabels = {
  labelTitle: 'title',
  labelType: 'type',
  labelTags: 'tags',
  labelNameWork: 'name work',
  labelAuthorRating: 'Author Rating',
  labelText: 'description',
  labelImage: 'Drag and drop an image!'
};

export const OwnReviews = () => {
  const { dataUser, token, isAuthenticated } = useAppSelector(state => state.userSlice);
  const [showCreateCard, setShowCreateCard] = useState(false);
  const [isSuccessCreation, setIsSuccessCreation] = useState(false);
  const { error, isLoading, items } = useAppSelector(state => state.reviewsSlice);
  const dispatch = useAppDispatch();

  const sendFrom = async (body: FormData) => {
    await createReview(body)
      .then(() => {
        setIsSuccessCreation(true);
      });
  };

  useEffect(() => {
    isAuthenticated && dispatch(fetchReviewsUserOwn({ skip: 0, take: 'ALL', sub: dataUser.sub, token }));
  }, [isSuccessCreation, dataUser, showCreateCard, dispatch, isAuthenticated, token]);

  return (
    <div className={styles.ownReviews}>
      <div className={styles.header}>
        <div className={styles.userCard}>
          <UserCard data_user={dataUser} />
          <div>
            <Button variant="primary" onClick={() => { setShowCreateCard(!showCreateCard); }}>
              Create a review
            </Button>
          </div>
        </div>
        {isSuccessCreation
          ? <h4 className={styles.successAnswer}>Successful Creation</h4>
          : null}
      </div>
      {showCreateCard
        ? <div className={styles.CreateReviewForm}>
          <CreateReviewForm
            authorId={dataUser?.sub}
            labels={createFormLabels}
            submitForm={b => { sendFrom(b); }}
          />
        </div>
        : null}
      <div className={styles.listReviews}>
        {error !== '' && <h1>{error}</h1>}
        {isLoading
          ? <SpinnerBallTriangle color='#0d6efd' />
          : <ReviewList reviews={items} />}
      </div>
    </div>
  );
};
