import React from "react";

import IconRock from "../../../assets/images/icon-rock.svg";
import Iconbox from "./Iconbox";

interface Props {
	highlight?: boolean;
}

const Rock: React.FC<Props> = ({ highlight }) => {
	return (
		<Iconbox
			handIcon={IconRock}
			bg="#18FFFF"
			name="rock"
			highlight={highlight}
		/>
	);
};

export default Rock;
