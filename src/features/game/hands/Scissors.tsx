import React from "react";
import IconScissors from "../../../assets/images/icon-scissors.svg";
import Iconbox from "./Iconbox";

interface Props {
	highlight?: boolean;
}

const Scissors: React.FC<Props> = ({ highlight }) => {
	return (
		<Iconbox
			handIcon={IconScissors}
			bg="#FFFF00"
			name="scissors"
			highlight={highlight}
		/>
	);
};

export default Scissors;
