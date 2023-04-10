import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { type IComment, type IItems } from '../../api/data-contracts/data-contracts';

const initialState: IItems<IComment> = {
  items: [],
  error: '',
  isLoading: false
};

export const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    commentsFetching (state) {
      state.isLoading = true;
    },
    commentsFetchingSuccess (state, action: PayloadAction<IComment[]>) {
      state.isLoading = false;
      state.error = '';
      state.items = action.payload;
    },
    commentsFetchingError (state, action: PayloadAction<string>) {
      state.isLoading = false;
      state.error = action.payload;
    }
  }
});

export default commentsSlice.reducer;
