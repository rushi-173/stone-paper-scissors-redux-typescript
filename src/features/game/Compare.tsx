import React, { useState, useEffect } from "react";
import Rock from "./hands/Rock";
import Paper from "./hands/Paper";
import Scissors from "./hands/Scissors";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { nextTurn, loseTurn, winTurn } from "./gameSlice";

const Compare: React.FC = () => {
	const game = useAppSelector((state) => state.game);
	const dispatch = useAppDispatch();
	const playerHand = game.handPick.hand;
	const [house, setHouse] = useState<string | null>(null);
	const [turnResult, setTurnResult] = useState<string | null>(null);

	useEffect(() => {
		// Set comp hand
		const randomHand = Math.floor(Math.random() * 3) + 1;
		if (randomHand === 1) {
			setHouse("rock");
			if (playerHand === "rock") {
				setDraw();
			} else if (playerHand === "scissors") {
				setLose();
			} else {
				setWin();
			}
		} else if (randomHand === 2) {
			setHouse("paper");
			if (playerHand === "paper") {
				setDraw();
			} else if (playerHand === "rock") {
				setLose();
			} else {
				setWin();
			}
		} else {
			setHouse("scissors");
			if (playerHand === "scissors") {
				setDraw();
			} else if (playerHand === "paper") {
				setLose();
			} else {
				setWin();
			}
		}

		function setDraw() {
			setTurnResult("Draw");
		}

		function setLose() {
			setTurnResult("You Lose");

			dispatch(loseTurn());
			dispatch(winTurn());
		}

		function setWin() {
			setTurnResult("You Win");
			dispatch(winTurn());
		}
	}, [dispatch, playerHand]);

	return (
		<div className="compare-container">
			<div>
				<h2>You Picked</h2>
				{(() => {
					if (playerHand === "rock") {
						return <Rock highlight={turnResult === "You Win" && true} />;
					} else if (playerHand === "paper") {
						return <Paper highlight={turnResult === "You Win" && true} />;
					} else {
						return <Scissors highlight={turnResult === "You Win" && true} />;
					}
				})()}
			</div>
			<div>
				<h1>{turnResult}</h1>
				<button
					type="button"
					className="btn btn-outline-primary"
					onClick={() => {
						dispatch(nextTurn());
					}}
				>
					{game.turn >= 5 ? "View Result" : "Next Turn"}
				</button>
			</div>
			<div>
				<h2>Computer picked</h2>
				{(() => {
					if (house === "rock") {
						return <Rock highlight={turnResult === "You Lose" && true} />;
					} else if (house === "paper") {
						return <Paper highlight={turnResult === "You Lose" && true} />;
					} else {
						return <Scissors highlight={turnResult === "You Lose" && true} />;
					}
				})()}
			</div>
		</div>
	);
};

export default Compare;
