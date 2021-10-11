import React from "react";
import IconPaper from "../../../assets/images/icon-paper.svg";
import Iconbox from "./Iconbox";
interface Props {
	highlight?: boolean;
}

const Paper: React.FC<Props> = ({ highlight }) => {
	return (
		<Iconbox
			handIcon={IconPaper}
			bg="#E040FB"
			name="paper"
			highlight={highlight}
		/>
	);
};

export default Paper;
