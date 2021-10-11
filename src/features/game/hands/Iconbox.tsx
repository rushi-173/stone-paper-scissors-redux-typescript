import React from "react";
import { setHandPick } from "../gameSlice";
import { useAppDispatch } from "../../../app/hooks";

const Iconbox = ({ handIcon, bg, name, highlight }) => {
	const dispatch = useAppDispatch();
	return (
		<div
			className={"hand-icon-container "}
			style={{ backgroundColor: bg }}
			onClick={() => dispatch(setHandPick({ hand: name }))}
		>
			<img src={handIcon} alt="hand-icon" />
		</div>
	);
};

export default Iconbox;
