import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import userReducer from "./../features/user/userSlice";
import gameReducer from "./../features/game/gameSlice";
import resultReducer from "./../features/result/resultSlice";
export const store = configureStore({
	reducer: {
		user: userReducer,
		game: gameReducer,
		result: resultReducer,
	},
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
	ReturnType,
	RootState,
	unknown,
	Action<string>
>;
