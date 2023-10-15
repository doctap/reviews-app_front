import { type AxiosResponse } from 'axios';
import { commentsSlice } from '../redux/reducers/CommentsSlice';
import { reviewsSlice } from '../redux/reducers/ReviewsSlice';
import { type AppDispatch } from '../redux/store/store';
import { API_CONFIG } from './index';
import type {
  ILike,
  IUser,
  IRequestSlice,
  IResponseRegister,
  IReview,
  IRate,
  IReviewId,
  ITokenSub,
  IComment
} from './index';

const SERVER_URI = process.env.REACT_APP_SERVER_URI as string;

export const fetchComments = (reviewId: number) => async (dispatch: AppDispatch) => {
  try {
    dispatch(commentsSlice.actions.commentsFetching());
    const res = await API_CONFIG.get<IComment[]>(`${SERVER_URI}/comments${reviewId}`);
    dispatch(commentsSlice.actions.commentsFetchingSuccess(res.data));
  } catch (e: any) {
    dispatch(commentsSlice.actions.commentsFetchingError(e.message));
  }
};

export const fetchReviews = (slice: IRequestSlice) => async (dispatch: AppDispatch) => {
  try {
    dispatch(reviewsSlice.actions.reviewsFetching());
    const res = await API_CONFIG.post<IReview[]>(`${SERVER_URI}/`, slice);
    dispatch(reviewsSlice.actions.reviewsFetchingSuccess(res.data));
  } catch (e: any) {
    dispatch(reviewsSlice.actions.reviewsFetchingError(e.message));
  }
};

export const fetchSelectedReview = (id: number) => async (dispatch: AppDispatch) => {
  try {
    dispatch(reviewsSlice.actions.reviewsFetching());
    const res = await API_CONFIG.get<IReview[]>(`${SERVER_URI}/review/${id}`);
    dispatch(reviewsSlice.actions.reviewsFetchingSuccess(res.data));
  } catch (e: any) {
    dispatch(reviewsSlice.actions.reviewsFetchingError(e.message));
  }
};

export const fetchProtectedReviews = (body: IRequestSlice & ITokenSub) => async (dispatch: AppDispatch) => {
  try {
    dispatch(reviewsSlice.actions.reviewsFetching());
    const res = await API_CONFIG.post<IReview[]>(
      `${SERVER_URI}/protectedReviews`, body, { headers: { Authorization: `Bearer ${body.token}` } }
    );
    dispatch(reviewsSlice.actions.reviewsFetchingSuccess(res.data));
  } catch (e: any) {
    dispatch(reviewsSlice.actions.reviewsFetchingError(e.message));
  }
};

export const fetchSelectedProtectedReview = (body: IReviewId & ITokenSub) => async (dispatch: AppDispatch) => {
  try {
    dispatch(reviewsSlice.actions.reviewsFetching());
    const res = await API_CONFIG.post<IReview[]>(
      `${SERVER_URI}/protected_Review`, body, { headers: { Authorization: `Bearer ${body.token}` } }
    );
    dispatch(reviewsSlice.actions.reviewsFetchingSuccess(res.data));
  } catch (e: any) {
    dispatch(reviewsSlice.actions.reviewsFetchingError(e.message));
  }
};

export const fetchReviewsUserOwn = (body: IRequestSlice & ITokenSub) => async (dispatch: AppDispatch) => {
  try {
    dispatch(reviewsSlice.actions.reviewsFetching());
    const res = await API_CONFIG.post<IReview[]>(
      `${SERVER_URI}/profilePage`, body, { headers: { Authorization: `Bearer ${body.token}` } }
    );
    dispatch(reviewsSlice.actions.reviewsFetchingSuccess(res.data));
  } catch (e: any) {
    dispatch(reviewsSlice.actions.reviewsFetchingError(e.message));
  }
};

export const registerUser = async (body: IUser, token: string) => {
  try {
    const res = await API_CONFIG.post<IUser, AxiosResponse<IResponseRegister>>(
      `${SERVER_URI}/registerUser`,
      { sub: body.sub, given_name: body.given_name, family_name: body.family_name },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return res.data;
  } catch (e) {
    // Do something
  }
};

export async function likeReview (body: ILike, token: string) {
  try {
    const res = await API_CONFIG.post<ILike>(
      `${SERVER_URI}/likeReview`,
      body,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return res.data;
  } catch (e) {
    // Do something
  }
}

export async function giveRating (body: IRate, token: string) {
  try {
    const res = await API_CONFIG.post<IRate>(
      `${SERVER_URI}/giveRating`,
      body,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return res.data;
  } catch (e) {
    // Do something
  }
}

export async function createReview (body: FormData) {
  try {
    const res = await API_CONFIG.post(
      `${SERVER_URI}/createReview`,
      body,
      { headers: { 'Content-type': 'multipart/form-data' } }
    );
    return res.data;
  } catch (e) {
    // Do something
  }
}

// export async function getProtectedMessage (token: string) {
//   let data = { message: '' };
//   try {
//     const response = await fetch(`${SERVER_URI}/1111`, {
//       headers: {
//         // добавляем заголовок авторизации с токеном
//         Authorization: `Bearer ${token}`
//       }
//     });
//     if (!response.ok) throw response;
//     data = await response.json();
//   } catch (e) {
//     // Do something
//   } finally {
//     return data.message;
//   }
// }

// likeReview({ isLike: true, reviewsId: 2 }, localStorage.getItem("reviewApp-token") ?? '')
// .then(r => console.log(r))
// .catch(e => loginWithRedirect())//разобраться с возможными ошибками
