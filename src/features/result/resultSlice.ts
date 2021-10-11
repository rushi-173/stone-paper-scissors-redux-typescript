import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios, { AxiosResponse } from "axios";
import { API_URL } from "../../config";

export const fetchResultsData = createAsyncThunk(
	"result/fetchResultsData",
	async (token: string) => {
		const response = await axios.get<
			never,
			AxiosResponse<{ results: Result[] }>
		>(`${API_URL}/result`, {
			headers: {
				Authorization: token,
			},
		});
		console.log(response);
		return response.data.results;
	}
);

export const addResult = createAsyncThunk(
	"result/addResult",
	async (data: { score: number; compScore: number; token: string }) => {
		const response = await axios.post<
			{ score: number; compScore: number },
			AxiosResponse<{ result: Result }>
		>(`${API_URL}/result`, data, {
			headers: {
				Authorization: data.token,
			},
		});
		console.log(response);
		return response.data.result;
	}
);

type Result = {
	user: string;
	score: number;
	compScore: number;
};
type InitialState = {
	results: Result[];
	status: string;
	error: null | string | undefined;
};
const initialState: InitialState = {
	results: [],
	status: "idle",
	error: null,
};

const resultSlice = createSlice({
	name: "result",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(fetchResultsData.pending, (state, action) => {
			state.status = "loading";
		});
		builder.addCase(
			fetchResultsData.fulfilled,
			(state, action: PayloadAction<Result[]>) => {
				console.log(action.payload);
				state.results = action.payload;
				state.status = "idle";
			}
		);
		builder.addCase(fetchResultsData.rejected, (state, action) => {
			state.status = "error";
			state.error = action.error.message;
		});
		builder.addCase(addResult.pending, (state, action) => {
			state.status = "loading";
		});
		builder.addCase(
			addResult.fulfilled,
			(state, action: PayloadAction<Result>) => {
				state.results = [...state.results, action.payload];
				state.status = "idle";
			}
		);
		builder.addCase(addResult.rejected, (state, action) => {
			state.status = "error";
			state.error = action.error.message;
		});
	},
});

export default resultSlice.reducer;
