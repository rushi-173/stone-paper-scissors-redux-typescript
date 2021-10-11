import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "../../config";

export const endGame = createAsyncThunk(
	"result/endGame",
	async (data: { score: number; compScore: number }) => {
		const response = await axios.post(`${API_URL}/result`, data);
		console.log(response);
		return response.data;
	}
);

const gameSlice = createSlice({
	name: "game",
	initialState: {
		score: 0,
		compScore: 0,
		handPick: { hand: null },
		turn: 1,
		status: "idle",
	},
	reducers: {
		loseTurn: (state) => {
			state.score = state.score - 3;
			state.compScore = state.compScore + 5;
		},
		winTurn: (state) => {
			state.score = state.score + 5;
			state.compScore = state.compScore - 3;
		},
		resetGame: (state) => {
			state.score = 0;
			state.compScore = 0;
			state.turn = 1;
			state.handPick = { hand: null };
		},
		setTurn: (state, action) => {
			state.turn = action.payload;
		},
		nextTurn: (state) => {
			state.turn = state.turn + 1;
			state.handPick = { hand: null };
		},
		setHandPick: (state, action) => {
			state.handPick = action.payload;
		},
	},
	extraReducers: () => {},
});

export const { winTurn, loseTurn, setHandPick, setTurn, nextTurn, resetGame } =
	gameSlice.actions;
export default gameSlice.reducer;
