import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface IUser {
  name: string
  eMail: string
  token: string
}

interface IInitState {
  user: IUser
  isLoading: boolean
  error: string
}

const initialState: IInitState = {
  user: {
    name: '',
    eMail: '',
    token: ''
  },
  isLoading: false,
  error: ''
};

export const userFireBaseSlice = createSlice({
  name: 'User-Auth',
  initialState,
  reducers: {
    userFetching (state) {
      state.isLoading = true;
    },
    userFetchingSuccess (state, action: PayloadAction<IInitState>) {
      state.isLoading = false;
      state.error = '';
      state.user = action.payload.user;
    },
    userFetchingError (state, action: PayloadAction<string>) {
      state.isLoading = false;
      state.error = action.payload;
    }
  }
});

export default userFireBaseSlice.reducer;
