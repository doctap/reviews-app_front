import React, { useEffect, useState } from 'react'
import { withAuthenticationRequired } from '@auth0/auth0-react'
import SpinnerBallTriangle from '../../components/boundary/spinners/Spinner'
import { useAppDispatch, useAppSelector } from '../../redux/hooks/redux';
import { Button } from 'react-bootstrap';
import { createReview, fetchReviewsUserOwn } from '../../api/http-client';
import CreateReviewForm, { ICreateReviewCardLabels } from '../../components/createReviewForm/CreateReviewForm';
import styles from './ProfilePage.module.scss';
import ReviewList from '../../components/reviewList/ReviewList';
import { Outlet } from 'react-router-dom';

export const ProfilePage = withAuthenticationRequired(
	() => {

		return (
			<div className={styles.profilePage}>
				ProfilePage
				<Outlet />
			</div>
		)
	},
	{
		returnTo: '/profilePage',
		onRedirecting: () => <div className={styles.spinner}><SpinnerBallTriangle color='#0d6efd' /></div>
	}
)