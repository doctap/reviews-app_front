import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IReview } from "../../api/data-contracts/data-contracts";

export interface IItems {
	reviews: IReview[];
	isLoading: boolean;
	error: string;
}

const initialState: IItems = {
	reviews: [],
	error: '',
	isLoading: false,
}

export const reviewsSlice = createSlice({
	name: 'reviews',
	initialState,
	reducers: {
		reviewsFetching(state) {
			state.isLoading = true;
		},
		reviewsFetchingSuccess(state, action: PayloadAction<IReview[]>) {
			state.isLoading = false;
			state.error = '';
			state.reviews = action.payload;
		},
		reviewsFetchingError(state, action: PayloadAction<string>) {
			state.isLoading = false;
			state.error = action.payload;
		}
	}
});

export default reviewsSlice.reducer;