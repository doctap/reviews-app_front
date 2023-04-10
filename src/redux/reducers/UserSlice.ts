import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { type IUser } from '../../api/data-contracts/data-contracts';

export interface IUserData {
  admin?: boolean
  token: string
  dataUser: IUser
  isAuthenticated: boolean
}

const initialState: IUserData = {
  admin: false,
  token: '',
  dataUser: {
    sub: '',
    given_name: '',
    family_name: ''
  },
  isAuthenticated: false
};

export const userSlice = createSlice({
  name: 'userData',
  initialState,
  reducers: {
    userRecognize (state, action: PayloadAction<IUserData>) {
      state.token = action.payload.token;
      state.admin = action.payload.admin;
      state.dataUser = action.payload.dataUser;
      state.isAuthenticated = action.payload.isAuthenticated;
    }
  }
});

export default userSlice.reducer;
