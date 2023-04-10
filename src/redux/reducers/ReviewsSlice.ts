import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { type IItems, type IReview } from '../../api/data-contracts/data-contracts';

const initialState: IItems<IReview> = {
  items: [],
  error: '',
  isLoading: false
};

export const reviewsSlice = createSlice({
  name: 'reviews',
  initialState,
  reducers: {
    reviewsFetching (state) {
      state.isLoading = true;
    },
    reviewsFetchingSuccess (state, action: PayloadAction<IReview[]>) {
      state.isLoading = false;
      state.error = '';
      state.items = action.payload;
    },
    reviewsFetchingError (state, action: PayloadAction<string>) {
      state.isLoading = false;
      state.error = action.payload;
    },
    sortReviews (state, action: PayloadAction<IReview[]>) {
      state.items = action.payload;
    }
  }
});

export default reviewsSlice.reducer;
