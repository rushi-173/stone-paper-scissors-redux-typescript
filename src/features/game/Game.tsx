import React, { useEffect } from "react";
import Picker from "./Picker";
import Compare from "./Compare";
import { useAppSelector } from "../../app/hooks";
import { Link } from "react-router-dom";
import { useAppDispatch } from "./../../app/hooks";
import { resetGame } from "./gameSlice";
import { addResult } from "../result/resultSlice";

function Game(): JSX.Element {
	const { score, turn, compScore } = useAppSelector((state) => state.game);
	const { loggedInUser } = useAppSelector((state) => state.user);
	const game = useAppSelector((state) => state.game);
	const dispatch = useAppDispatch();

	const getResult = () => {
		if (score > compScore) {
			return <h1>Congratulations! You Won.🎉</h1>;
		} else if (score < compScore) {
			return <h1>You Lost! Better Luck Next Time.</h1>;
		} else {
			return <h1>Match Drawn!</h1>;
		}
	};

	useEffect(() => {
		if (turn > 5) {
			loggedInUser &&
				dispatch(
					addResult({
						score: score,
						compScore: compScore,
						token: loggedInUser.token,
					})
				);
		}
	}, [dispatch, turn, score, compScore, loggedInUser]);
	useEffect(() => {
		return () => {
			dispatch(resetGame());
		};
	}, [dispatch]);
	return (
		<div
			className="container-column"
			style={{ minHeight: "80vh", maxWidth: "800px" }}
		>
			{turn <= 5 ? (
				<>
					<div className="container-space-between">
						<div className="scoreboard">
							<h2>Computer Score</h2>
							<p>{compScore}</p>
						</div>
						<div className="scoreboard">
							<h2>Turn</h2>
							<p>{turn}</p>
						</div>
						<div className="scoreboard">
							<h2>Your Score</h2>
							<p>{score}</p>
						</div>
					</div>
					<main className="container">
						<div className="row">
							{game.handPick.hand === null ? <Picker /> : <Compare />}
						</div>
					</main>
				</>
			) : (
				<div className="Result container-column">
					<h3>Your Score : {score}</h3>
					<h3>Computer's Score : {compScore}</h3>
					{getResult()}
					<Link to="/" className="btn btn-primary">
						Play Again!
					</Link>
				</div>
			)}
		</div>
	);
}

export default Game;
