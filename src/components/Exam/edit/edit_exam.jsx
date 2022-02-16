import { doc, updateDoc } from "firebase/firestore";
import React, { memo, useContext, useEffect, useState } from "react";
import { useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import styled from "styled-components";
import { HandleContext } from "../../../Context";
import EditTools from "../exam-tools/index";
import SettingsTable from "./settings";

function EditExamComponent() {
	const { idExam } = useParams();
	const {
		all_data__tables,
		filterDataTables,
		user_data_login,
		user_data_store,
		fs
	} = useContext(HandleContext);
	const history = useNavigate();

	const [__data__exam, setDataExamProject] = useState(null);
	const [dataExam, setDataExam] = useState(null);
	const [protect, setProtect] = useState(null);
	const [update, isUpdate] = useState(false);
	const [settings, setSettings] = useState(null);

	useEffect(
		() => {
			if (user_data_store && user_data_store.role === "student")
				history(`/exam/make/${idExam}`);
			else history(`/exam/edit/${idExam}`);
		},
		[history, idExam, user_data_store]
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

	useMemo(
		() => {
			if (!update && dataExam && idExam) {
				const value = dataExam
					.filter(exam => exam.__id === idExam)
					.reduce((arr, item) => {
						arr.push({
							...item.__protection,
							time_close: item.__date.__open.__end
						});
						return arr;
					}, [])[0];
				if (value) setSettings(value);
			}
		},
		[dataExam, idExam, update]
	);

	useEffect(
		() => {
			if (all_data__tables) {
				setDataExam(all_data__tables);
			}

			if (
				dataExam &&
				!__data__exam &&
				dataExam.filter(exam => exam.__id === idExam)[0]
			) {
				setDataExamProject(
					dataExam.filter(exam => exam.__id === idExam)[0]
						.__data__exam
				);
			}
		},
		[all_data__tables, idExam, dataExam, __data__exam]
	);

	async function handleSaveExam() {
		isUpdate(true);
		const newData = dataExam.map(item => {
			if (item.__id === idExam) item.__data__exam = __data__exam;
			return item;
		});
		if (newData && newData.length > 0) {
			try {
				newData.forEach(async classUpdate => {
					if (classUpdate && classUpdate.__idHash) {
						await updateDoc(
							doc(fs, "class", classUpdate.__idHash),
							{
								all_data: newData
									.filter(
										exam =>
											exam.__idHash ===
											classUpdate.__idHash
									)
									.reduce((array, item) => {
										if (item.__id === idExam) {
											item["__protection"] = {
												__exit: protect.exit,
												__resize: protect.resize,
												__random__quest:
													protect.random_quest,
												__random__answer:
													protect.random_answer,
												__remake: protect.remake,
												__show_point:
													protect.show_point,
												__lock: protect.lock,
												__can_error: protect.can_error,
												__max_error_accept: protect.can_error
													? protect.max_error_accept
													: null
											};
											item.__date.__open.__end = protect.time_close
												? protect.newTime
												: null;
										}
										delete item.__idHash;
										array.push(item);
										return array;
									}, [])
							}
						);
					}
				});
				toast.success("Đã lưu thành công!");
			} catch (error) {
				toast.error("Đã có lỗi xảy ra, vui lòng thử lại!");
				toast.error("Error: " + error);
			}
		}
		isUpdate(false);
	}

	if (dataExam && dataExam.length > 0 && !update && __data__exam)
		return (
			<ExamForm>
				<h1>
					{dataExam.filter(exam => exam.__id === idExam)[0] &&
						dataExam.filter(exam => exam.__id === idExam)[0]
							.__title}
				</h1>
				<SettingsTable settings={settings} returnProtect={setProtect} />
				<EditTools
					updateCharacters={setDataExamProject}
					characters={__data__exam}
				/>
				<ButtonGroup>
					{protect &&
						(!protect.can_error
							? <Button color="#43b581" onClick={handleSaveExam}>
									Lưu
								</Button>
							: protect.max_error_accept
								? <Button
										color="#43b581"
										onClick={handleSaveExam}>
										Lưu
									</Button>
								: false)}
					<Button
						color="#faa61a"
						onClick={() => history(`exam/edit/${idExam}/preview`)}>
						Xem trước
					</Button>
				</ButtonGroup>
			</ExamForm>
		);
	return (
		<div style={{ margin: "auto", width: "85%", textAlign: "center" }}>
			Đang tìm kiếm bài, nếu sau 5 phút vẫn chưa tìm thấy, tức là bài của
			bạn đã bị lỗi hoặc đường truyền Internet của bạn yếu.
		</div>
	);
}

const ExamForm = styled.div`
	width: 95%;
	margin: 0 auto;
`;

const ButtonGroup = styled.div`
	display: flex;
	justify-content: space-around;
	align-items: center;
	width: 100%;
	margin-top: 20px;
`;

const Button = styled.button`
	border: none;
	background: ${props => props.color || "transparent"};
	padding: 12px;
	border-radius: 10px;
	font-size: 20px;
	width: fit-content;
	color: #fff;
`;

export default memo(EditExamComponent);
