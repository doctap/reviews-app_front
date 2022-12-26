import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IUser } from '../../api/data-contracts/data-contracts';

export interface IUserData {
	admin?: boolean;
	token: string;
	data_user?: IUser;
	isAuthenticated?: boolean;
}

const initialState: IUserData = {
	admin: false,
	token: '',
	data_user: {},
	isAuthenticated: false,
}

export const userSlice = createSlice({
	name: 'userData',
	initialState,
	reducers: {
		userRecognition(state, action: PayloadAction<IUserData>) {
			state.token = action.payload.token;
			state.admin = action.payload.admin;
			state.data_user = action.payload.data_user;
			state.isAuthenticated = action.payload.isAuthenticated;
		}
	}
});

export default userSlice.reducer;