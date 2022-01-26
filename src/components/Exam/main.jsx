import React, { Fragment } from "react";
import { Route, Routes } from "react-router-dom";
import CreateExamComponent from "./create/_create_";
import TableExam from "./table/table";
import E404 from "../404/404";

function MainScreenExam() {
	return (
		<Fragment>
			<Routes>
				<Route path="/" exact element={<TableExam />} />
				<Route path="/create" exact element={<CreateExamComponent />} />
				<Route path="*" element={<E404 />} />
			</Routes>
		</Fragment>
	);
}

export default React.memo(MainScreenExam);
