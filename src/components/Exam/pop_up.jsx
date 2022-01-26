import { doc, onSnapshot, updateDoc } from "firebase/firestore";
import React, { useContext, useState } from "react";
import { toast } from "react-toastify";
import { HandleContext } from "../../Context";
import { ButtonTask, PopUpParent } from "../customs/exam.styled";

export default React.memo(function DelAsk({ isDel, itemDel }) {
	const { fs } = useContext(HandleContext);
	const [last_data, setLastData] = useState(null);
	async function handleRemoveExam() {
		const target = doc(fs, "class", itemDel.__idHash);

		await onSnapshot(target, doc => {
			if (!doc) return;
			setLastData(doc.data().all_data);
		});

		if (last_data) {
			await updateDoc(target, {
				all_data: last_data.filter(item => item.__id !== itemDel.__id)
			})
				.then(() => {
					toast.success("Xóa bài thành công!");
					isDel([false, null]);
				})
				.catch(err => {
					toast.error("Đã có lỗi xảy ra! Vui lòng thử lại sau!");
				});
		}
	}

	return (
		<PopUpParent>
			<h1>
				Bạn có chắc là muốn xóa bài "{itemDel.__title}" này không?
			</h1>
			<div>
				<ButtonTask type="blue" w100 onClick={handleRemoveExam}>
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
