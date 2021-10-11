import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosResponse } from "axios";
import { API_URL } from "../../config";
import { saveUserDataToLocalStorage } from "./utils";

interface UserCredentials {
	email: string;
	password: string;
}

interface UserData {
	loggedInUser: null | FetchedUserData;
	status: "idle" | "loading" | "error";
	error: any;
}
interface User {
	userId: string;
	email: string;
	username: string;
}
interface FetchedUserData {
	user: User;
	token: "string";
}

export const login = createAsyncThunk(
	"user/login",
	async (userCredentials: UserCredentials) => {
		const response = await axios.post<
			UserCredentials,
			AxiosResponse<FetchedUserData>
		>(`${API_URL}/login`, userCredentials);
		if (response.data) {
			saveUserDataToLocalStorage(response.data.user, response.data.token);
		}
		return response.data;
	}
);

export const fetchUserData = createAsyncThunk(
	"user/fetchUserData",
	async (token: string) => {
		const response = await axios.get<never, AxiosResponse<FetchedUserData>>(
			`${API_URL}/users`,
			{
				headers: {
					Authorization: token,
				},
			}
		);
		return response.data;
	}
);

const initialState: UserData = {
	loggedInUser: null,
	status: "idle",
	error: null,
};

const userSlice = createSlice({
	name: "user",
	initialState,
	reducers: {
		logout: (state) => {
			state.loggedInUser = null;
			state.status = "idle";
			state.error = null;
		},
		updateUser: (state, action) => {
			const userUpdates = action.payload;
			Object.keys(userUpdates).forEach((key) => {
				if (state.loggedInUser && key in state.loggedInUser) {
					state.loggedInUser[key] = userUpdates[key];
				}
			});
		},
	},
	extraReducers: (builder) => {
		builder.addCase(login.pending, (state, action) => {
			state.status = "loading";
		});
		builder.addCase(login.fulfilled, (state, action) => {
			state.loggedInUser = action.payload;
			state.status = "idle";
		});
		builder.addCase(login.rejected, (state, action) => {
			state.status = "error";
			state.error = action.error.message;
		});
		builder.addCase(fetchUserData.pending, (state, action) => {
			state.status = "loading";
		});
		builder.addCase(fetchUserData.fulfilled, (state, action) => {
			state.loggedInUser = action.payload;
			state.status = "idle";
		});
		builder.addCase(fetchUserData.rejected, (state, action) => {
			state.status = "error";
			state.error = action.error.message;
		});
	},
});

export const { logout, updateUser } = userSlice.actions;
export default userSlice.reducer;
