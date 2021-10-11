import React from "react";
import Paper from "./hands/Paper";
import Rock from "./hands/Rock";
import Scissors from "./hands/Scissors";

const Picker = () => {
	return (
		<div className="picker-container">
			<h2>Pick Your Choice</h2>
			<Paper />
			<Rock />
			<Scissors />
		</div>
	);
};

export default Picker;
