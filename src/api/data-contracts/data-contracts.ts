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

export interface IRegisterUser {
	token?: string;
	firstName?: string;
	lastName?: string;
	sub?: string;
	id?: number;
}

export interface IResponseRegister {
	isRegistered: boolean;
	isExist: boolean;
}

export interface ILike {
	reviewsId: number;
	userId?: number;
	isLike: boolean; 
}

export interface IRequestSlice {
	skip: number;
	take: number;
}