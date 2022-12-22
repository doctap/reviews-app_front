import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface IToken {
	sub: string;
}

const initialState: IToken = {
	sub: '',
}

export const subFromSocialNetwork = createSlice({
	name: 'Sub from social network',
	initialState,
	reducers: {
		setSubject(state, action: PayloadAction<string>) {
			state.sub = action.payload
		}
	}
});

export default subFromSocialNetwork.reducer;