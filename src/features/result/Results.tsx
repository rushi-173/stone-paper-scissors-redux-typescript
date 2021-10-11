import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { fetchResultsData } from "./resultSlice";

function Result() {
	const dispatch = useAppDispatch();
	const { loggedInUser } = useAppSelector((state) => state.user);
	useEffect(() => {
		loggedInUser && dispatch(fetchResultsData(loggedInUser.token));
	}, [dispatch, loggedInUser]);
	const result = useAppSelector((state) => state.result);
	console.log(result);
	return (
		<div className="Home container-column">
			<div>
				<h2>PREVIOUS RESULTS</h2>
				<table>
					<tr>
						<th>Your Score</th>
						<th>Computer SCore</th>
						<th>Result</th>
					</tr>
					{result.results.map((res, idx) => {
						return (
							<tr>
								<td>{res.score}</td>
								<td>{res.compScore}</td>
								<td>
									{res.score === res.compScore
										? "Draw"
										: res.score > res.compScore
										? "Win"
										: "Lose"}
								</td>
							</tr>
						);
					})}
				</table>
			</div>
		</div>
	);
}

export default Result;
