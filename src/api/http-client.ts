import { AxiosResponse } from "axios";
import { reviewsSlice } from "../redux/reducers/ReviewsSlice";
import { AppDispatch } from "../redux/store/store";
import { API_CONFIG } from "./axiosConfig/axiosConfig";
import { ILike, IUserData, IRequestSlice, IResponseRegister, IReview } from "./data-contracts/data-contracts";

const SERVER_URI = process.env.REACT_APP_SERVER_URI;

export const fetchReviews = (slice: IRequestSlice) => async (dispatch: AppDispatch) => {
	try {
		dispatch(reviewsSlice.actions.reviewsFetching());
		const res = await API_CONFIG.post<IRequestSlice, AxiosResponse<IReview[]>>(`${SERVER_URI}/reviews`, slice);
		dispatch(reviewsSlice.actions.reviewsFetchingSuccess(res.data));
	} catch (e: any) {
		dispatch(reviewsSlice.actions.reviewsFetchingError(e.message))
	}
}

export async function registerUser(body: IUserData, token: string) {
	const res = await API_CONFIG.post<IUserData, AxiosResponse<IResponseRegister>>(
		`${SERVER_URI}/registerUser`,
		body,
		{ headers: { Authorization: `Bearer ${token}` } }
	);
	return res.data;
}

export async function likeReview(body: ILike, token: string) {
	try {
		const res = await API_CONFIG.post(
			`${SERVER_URI}/likeReview`,
			body,
			{ headers: { Authorization: `Bearer ${token}` } }
		);
		return res.data;
	} catch (e) {
		throw e
	}
}

export async function getProtectedMessage(token: string) {
	let data = { message: '' }
	try {
		const response = await fetch(`${SERVER_URI}/1111`, {
			headers: {
				// добавляем заголовок авторизации с токеном
				Authorization: `Bearer ${token}`
			}
		})
		if (!response.ok) throw response
		data = await response.json()
	} catch (e) {
		throw e
	} finally {
		return data.message
	}
}



// likeReview({ isLike: true, reviewsId: 2 }, localStorage.getItem("reviewApp-token") ?? '')
// .then(r => console.log(r))
// .catch(e => loginWithRedirect())//разобраться с возможными ошибками