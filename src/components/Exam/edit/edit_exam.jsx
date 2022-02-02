import { doc, updateDoc } from "firebase/firestore";
import React, { memo, useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import styled from "styled-components";
import { HandleContext } from "../../../Context";
import EditTools from "../exam-tools/index";
import SettingsTable from "./settings";

function EditExamComponent() {
	const { idExam } = useParams();
	const history = useNavigate();
	const [__data__exam, setDataExamProject] = useState(null);
	const [dataExam, setDataExam] = useState(null);
	const [protect, setProtect] = useState(null);
	const {
		all_data__tables,
		filterDataTables,
		user_data_login,
		fs
	} = useContext(HandleContext);

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

	useEffect(
		() => {
			if (all_data__tables) {
				setDataExam(all_data__tables);
			}

			if (dataExam && !__data__exam) {
				setDataExamProject(
					dataExam.filter(exam => exam.__id === idExam)[0]
						.__data__exam
				);
			}
		},
		[all_data__tables, idExam, dataExam, __data__exam]
	);

	async function handleSaveExam() {
		const newData = dataExam.map(item => {
			if (item.__id === idExam) item.__data__exam = __data__exam;
			return item;
		});
		if (newData && newData.length > 0) {
			try {
				await newData.forEach(async classUpdate => {
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
	}

	if (dataExam && dataExam.length > 0)
		return (
			<ExamForm>
				<h1>
					{dataExam.filter(exam => exam.__id === idExam)[0] &&
						dataExam.filter(exam => exam.__id === idExam)[0]
							.__title}
				</h1>
				<SettingsTable
					settings={
						(dataExam.filter(
							exam => exam.__id === idExam
						)[0].__protection["__lock"] = dataExam.filter(
							exam => exam.__id === idExam
						)[0].__date.__lock)
					}
					returnProtect={setProtect}
					protect={protect}
				/>
				<EditTools
					updateCharacters={setDataExamProject}
					characters={__data__exam}
				/>
				<ButtonGroup>
					<Button color="#43b581" onClick={handleSaveExam}>
						Lưu
					</Button>
					<Button
						color="#faa61a"
						onClick={() => history(`exam/edit/${idExam}/preview`)}>
						Xem trước
					</Button>
				</ButtonGroup>
			</ExamForm>
		);
	return <div>Loading...</div>;
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
