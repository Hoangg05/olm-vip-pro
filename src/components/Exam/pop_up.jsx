import React from "react";
import { ButtonTask, PopUpParent } from "../customs/exam.styled";

export default React.memo(function DelAsk({ isDel, name }) {
	return (
		<PopUpParent>
			<h1>
				Bạn có chắc là muốn xóa bài "{name}" này không?
			</h1>
			<div>
				<ButtonTask type="blue" w100>
					Có
				</ButtonTask>
				<ButtonTask
					type="red"
					w100
					onClick={() => isDel([false, null])}>
					Không
				</ButtonTask>
			</div>
		</PopUpParent>
	);
});
