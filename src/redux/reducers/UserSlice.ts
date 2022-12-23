import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IUserData } from '../../api/data-contracts/data-contracts';

export interface IUser {
	admin?: boolean;
	token: string;
	data_user?: IUserData
}

const initialState: IUser = {
	admin: false,
	token: '',
	data_user: {},
}

export const usersSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		userRecognition(state, action: PayloadAction<IUser>) {
			state.token = action.payload.token;
			state.admin = action.payload.admin;
			state.data_user = action.payload.data_user;
		}
	}
});

export default usersSlice.reducer;