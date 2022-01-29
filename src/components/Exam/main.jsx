import React, { Fragment } from "react";
import { Route, Routes } from "react-router-dom";
import CreateExamComponent from "./create/_create_";
import TableExam from "./table/table";
import E404 from "../404/404";
import EditExamComponent from "./edit/edit_exam";
import MakeExamComponent from "./make/make_exam";

function MainScreenExam() {
	return (
		<Fragment>
			<Routes>
				<Route path="/" exact element={<TableExam />} />
				<Route path="/create" exact element={<CreateExamComponent />} />
				<Route
					path="/edit/:idExam"
					exact
					element={<EditExamComponent />}
				/>
				<Route
					path="/make/:idExam"
					exact
					element={<MakeExamComponent />}
				/>
				<Route path="*" element={<E404 />} />
			</Routes>
		</Fragment>
	);
}

export default React.memo(MainScreenExam);
