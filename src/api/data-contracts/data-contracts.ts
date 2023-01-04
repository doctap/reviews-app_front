export interface IReview {
	id: number;
	title: string;
	text: string;
	name_work: string;
	type: typeReview;
	tags: string;
	image: string;
	author_rating: number;
	likes: number;
	user_id: string;
	date: Date;
	average_rating?: string;
	user_likes_it?: boolean;
	user_rating?: number;
}

export interface IItems<T> {
	items: T[];
	isLoading: boolean;
	error: string;
}

export interface IComment {
	user_id: string;
	last_name: string;
	first_name: string;
	text: string;
	date: Date;
}

export interface IAddPropsReview {
	isReviewOpen: boolean;
	viewComments: boolean;
}

type typeReview = 'book' | 'film' | 'game';

export interface IReviewId {
	review_id: number;
}

export interface ITokenSub {
	token: string;
	sub: string;
}

export interface IUser {
	name?: string;
	given_name: string;
	family_name: string;
	middle_name?: string;
	nickname?: string;
	preferred_username?: string;
	profile?: string;
	picture?: string;
	website?: string;
	email?: string;
	email_verified?: boolean;
	gender?: string;
	birthdate?: string;
	zoneinfo?: string;
	locale?: string;
	phone_number?: string;
	phone_number_verified?: boolean;
	address?: string;
	updated_at?: string;
	sub: string;
}

export interface IResponseRegister {
	isRegistered: boolean;
	isExist: boolean;
}

export interface IRate {
	review_id: number;
	sub?: string;
	user_rating: number;
}

export interface ILike {
	review_id: number;
	sub?: string;
	user_likes_it: boolean; 
}

export interface IRequestSlice {
	skip: number;
	take: number | string;
}