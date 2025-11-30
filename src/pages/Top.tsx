import type { FC } from "react";
import { BoxRotate } from "../components/BoxRotate";

export const Top: FC = () => {
	return (
		<div
			style={{
				position: "relative",
				width: "100%",
				height: "50vh",
				background: "#0b142cff",
			}}
		>
			<BoxRotate />
		</div>
	);
};
