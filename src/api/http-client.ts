import { AxiosResponse } from "axios";
import { API_CONFIG } from "./axiosConfig/axiosConfig";
import { ILike, IRegisterUser, IRequestSlice, IResponseRegister, IReview } from "./data-contracts/data-contracts";

const SERVER_URI = process.env.REACT_APP_SERVER_URI;

export async function getReviews(slice: IRequestSlice) {
	const res = await API_CONFIG.post<IRequestSlice, AxiosResponse<IReview[]>>(`${SERVER_URI}/reviews`, slice);
	return res.data;
}

export async function registerUser(data: IRegisterUser) {
	const res = await API_CONFIG.post<IRegisterUser, AxiosResponse<IResponseRegister>>(
		`${SERVER_URI}/registerUser`,
		{ sub: data.sub, firstName: data.firstName, lastName: data.lastName }
	);
	return res.data;
}

//stopped at task "Likes"

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

export async function likeReview(body: ILike, token: string) {
	try {
		const res = await API_CONFIG.post
			(
				`${SERVER_URI}/likeReview`,
				body,
				{ headers: { Authorization: `Bearer ${token}` } }
			);
		return res.data;
	} catch (error) {
		throw error
	}
}

// likeReview({ isLike: true, reviewsId: 2 }, localStorage.getItem("reviewApp-token") ?? '')
// .then(r => console.log(r))
// .catch(e => loginWithRedirect())//разобраться с возможными ошибками