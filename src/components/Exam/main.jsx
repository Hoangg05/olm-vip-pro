import React, { Fragment } from "react";
import { Route, Routes } from "react-router-dom";
import CreateExamComponent from "./create/_create_";
import TableExam from "./table/table";
import E404 from "../404/404";


function MainScreenExam({ user, fs }) {
	return (
		<Fragment>
			<Routes>
				<Route
					path="/"
					exact
					element={<TableExam user={user} fs={fs} />}
				/>
				<Route
					path="/create"
					exact
					element={<CreateExamComponent user={user} fs={fs} />}
				/>
				<Route path="*" element={<E404 />} />
			</Routes>
		</Fragment>
	);
}

export default React.memo(MainScreenExam);
