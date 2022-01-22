import React from "react";
import {
	CardLecture,
	CardSubjects,
	Subject
} from "../../customs/render.styled";

function RenderLectures(props) {
	return (
		<CardLecture index={props.index}>
			<h4>
				Lớp {props.class}
			</h4>
			<CardSubjects>
				<Subject
					onClick={() =>
						(window.location.href = `/lectures/${props.class}/math`)}>
					Toán
				</Subject>
			</CardSubjects>
			<a href={`/lectures/${props.class}`}>Xem tất cả</a>
		</CardLecture>
	);
}

export default React.memo(RenderLectures);
