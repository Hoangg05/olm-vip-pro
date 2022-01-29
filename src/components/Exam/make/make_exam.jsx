import React, { useEffect } from "react";
import disableDevtool from "disable-devtool";
import { useParams } from "react-router-dom";

function MakeExamComponent() {
	const { idExam } = useParams();
	useEffect(() => {
		disableDevtool({
			url:
				"http://fdvn.vn/gian-lan-trong-thi-cu-bi-phat-nhu-the-nao/#:~:text=Hành%20vi%20gian%20lận%20trong,người%20học%20không%20được%20làm.&text=Phạt%20tiền%20từ%202.000.000,chấm%20thi%2C%20phục%20vụ%20thi."
		});
	}, []);
	return (
		<div>
			make exam id {idExam} !
		</div>
	);
}

export default MakeExamComponent;
