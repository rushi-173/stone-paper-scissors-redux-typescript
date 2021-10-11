import React, { useEffect } from "react";
import { Route, Routes, useNavigate, Navigate } from "react-router-dom";
import SignIn from "./features/user/SignIn";
import SignUp from "./features/user/SignUp";
import { setupAuthExceptionHandler } from "./features/user/utils";
import { fetchUserData, logout } from "./features/user/userSlice";
import Navbar from "./componets/Navbar";
import Home from "./features/home/Home";
import "./styles/App.css";
import { useToasts } from "react-toast-notifications";
import { useAppDispatch, useAppSelector } from "./app/hooks";
import Game from "./features/game/Game";
import PageNotFound from "./componets/PageNotFound";
import Result from "./features/result/Results";

function App() {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const { addToast } = useToasts();

	const user = useAppSelector((state) => state.user);

	useEffect(() => {
		(async function () {
			const userDataFromLocalStorageData: any = JSON.parse(
				localStorage.getItem("spsUser") || ""
			);
			if (userDataFromLocalStorageData.token) {
				setupAuthExceptionHandler(dispatch, logout, navigate, addToast);
				await dispatch(fetchUserData(userDataFromLocalStorageData.token));
			} else {
				navigate("signin");
			}
		})();
	}, [dispatch]);

	const PrivateRoute = ({ path, element }) => {
		if (user.loggedInUser) {
			return element;
		} else {
			return <Navigate to="/signin" state={{ from: path }} />;
		}
	};

	return (
		<div className="App div-sm-parent">
			<Navbar />
			<Routes>
				<PrivateRoute path="/" element={<Home />} />
				<PrivateRoute path="/scoreboard" element={<Result />} />
				<PrivateRoute path="/game" element={<Game />} />
				<Route path="/signin" element={<SignIn />} />
				<Route path="/signup" element={<SignUp />} />
				<Route path="*" element={<PageNotFound />} />
			</Routes>
		</div>
	);
}

export default App;
