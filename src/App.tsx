import type React from "react";
import { Route, Routes } from "react-router-dom";
import { Top } from "./pages/Top";

export const App: React.FC = () => {
	return (
		<div>
			<Routes>
				<Route path="/" element={<Top />} />

				<Route
					path="/about"
					element={<div className="bg-red-200 min-h-[100vh]" />}
				/>
			</Routes>
		</div>
	);
};
