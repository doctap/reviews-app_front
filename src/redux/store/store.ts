import { configureStore, combineReducers } from '@reduxjs/toolkit';
import reviewsSlice from '../reducers/ReviewsSlice';
import usersSlice from '../reducers/UserSlice';

const rootReducer = combineReducers({
	reviewsSlice,
	usersSlice,
});

export const setupStore = () => {
	return configureStore({
		reducer: rootReducer
	})
}

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];