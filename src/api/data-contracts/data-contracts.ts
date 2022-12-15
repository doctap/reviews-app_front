export interface IReviews {
	id: number;
	title: string;
	text: string;
	name_work: string;
	type: string;
	tags: string;
	image: string; //File
	author_rating: number;
	likes: number;
	userId: number;
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