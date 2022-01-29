import React from "react";
import { useParams } from "react-router-dom";

function EditExamComponent() {
	const { idExam } = useParams();

	return (
		<div>
			edit exam id {idExam} !
		</div>
	);
}

export default EditExamComponent;
