import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface IToken {
	token: string;
}

const initialState: IToken = {
	token: localStorage.getItem("reviewApp-token") ?? '',
}

export const token = createSlice({
	name: 'ErrorModalWindow',
	initialState,
	reducers: {
		set(state, action: PayloadAction<string>) {
			state.token = action.payload
			localStorage.setItem("reviewApp-token", action.payload)
		}
	}
});

export default token.reducer;