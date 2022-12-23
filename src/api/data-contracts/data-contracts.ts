export interface IReview {
	id: number;
	title: string;
	text: string;
	name_work: string;
	type: string;
	tags: string;
	image: string; //File
	author_rating: number;
	likes: number;
	user_id: number;
	average_rating: string;
}

export interface IUserData {
	name?: string;
	given_name?: string;
	family_name?: string;
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
	sub?: string;
}

export interface IResponseRegister {
	isRegistered: boolean;
	isExist: boolean;
}

export interface ILike {
	reviews_id: number;
	user_id: number;
	isLike: boolean; 
}

export interface IRequestSlice {
	skip: number;
	take: number;
}