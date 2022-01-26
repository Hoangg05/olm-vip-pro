import React, { useEffect, useContext } from "react";
import { CreateCustomComponent } from "../../customs/exam.styled";
import ConfigurationExam from "./config_exam";
import { HandleContext } from "../../../Context";

function CreateExamComponent() {
	const { user_data_login, filterDataTables, ClassData } = useContext(
		HandleContext
	);

	useEffect(
		() => {
			filterDataTables({
				path: "class",
				callback: "__teachers",
				type: "array-contains",
				value: user_data_login.uid
			});
		},
		[filterDataTables, user_data_login]
	);
	return (
		<CreateCustomComponent>
			<ConfigurationExam Class={ClassData} />
		</CreateCustomComponent>
	);
}

export default React.memo(CreateExamComponent);
