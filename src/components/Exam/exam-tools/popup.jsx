import React, { memo, useState } from "react";
import styled from "styled-components";
import Select from "react-select";

const customStyles = {
	control: styles => ({
		...styles,
		borderRadius: 0,
		margin: "20px 0",
		width: "100%",
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
		border: "1px solid #ccc"
	}),
	menu: styles => ({
		...styles,
		position: "absolute",
		width: "100%",
		borderRadius: 0,
		background: "#fff",
		border: "1px solid #ddd"
	}),
	option: styles => {
		return {
			...styles,
			color: "#333"
		};
	}
};

function POPUPComponent({ returnValue, turnON }) {
	const [[question, answers, type], setValue] = useState([null, [], "once"]);

	function handleCreate(e) {
		e.preventDefault();
		if ((answers && answers.length === 0) || answers.length < 2) return;
		returnValue({ question, answers, type });
		turnON(false);
	}

	function handleCreateAnswers() {
		if (answers && answers.length >= 4) return;
		setValue([
			question,
			[...answers, { correct: false, title: null }],
			type
		]);
	}

	function handleCorrectAnswer(index) {
		const newAnswers = [...answers];

		if (type === "once") {
			newAnswers.forEach((answer, idx) => {
				if (idx === index) {
					answer.correct = !answer.correct;
				} else {
					answer.correct = false;
				}
			});
		} else {
			newAnswers[index].correct = !newAnswers[index].correct;
		}
		setValue([question, newAnswers, type]);
	}

	return (
		<PopupCreate onSubmit={handleCreate}>
			<InputDiv>
				<h2>Câu hỏi</h2>
				<input
					autoComplete="off"
					required
					type="text"
					name="question"
					onChange={e => {
						e.target.value = e.target.value.trimStart();
						setValue([e.target.value, answers, type]);
					}}
				/>
			</InputDiv>
			<InputDiv>
				<div>
					<h2>Các câu trả lời</h2>
					<h2>
						Tổng số câu trả lời: {answers.length}/4
					</h2>
					<CreateAnswerButton onClick={handleCreateAnswers}>
						Tạo câu trả lời +
					</CreateAnswerButton>
				</div>
				<div>
					{answers &&
						answers.map((_, index) => {
							return (
								<AnswerGroup key={index}>
									<div>
										<input
											autoComplete="off"
											type="text"
											onChange={e =>
												setValue([
													question,
													answers.reduce(
														(arr, item, idx) => {
															if (idx === index) {
																item = {
																	correct: false,
																	title:
																		e.target
																			.value
																};
															}
															arr.push(item);
															return arr;
														},
														[]
													),
													type
												])}
											value={_ && _.title ? _.title : ""}
											required
										/>
										<ButtonCustom
											as="h2"
											onClick={() =>
												setValue([
													question,
													answers.filter(
														(__, idx) =>
															idx !== index
													),
													type
												])}>
											Xóa -
										</ButtonCustom>
									</div>
									<div>
										<p>
											Đây là đáp án{" "}
											{_ &&
												{ true: "đúng", false: "sai" }[
													_.correct
												]}
										</p>
										<ButtonCustom
											onClick={() =>
												handleCorrectAnswer(index)}>
											Sửa thành đáp án{" "}
											{_ &&
												{ true: "sai", false: "đúng" }[
													_.correct
												]}
										</ButtonCustom>
									</div>
								</AnswerGroup>
							);
						})}
				</div>
			</InputDiv>
			<InputDiv>
				<h2>Dạng câu hỏi</h2>
				<Select
					options={[
						{ label: "Một đáp án đúng", value: "once" },
						{ label: "Nhiều đáp án đúng", value: "more" }
					]}
					placeholder="Một đáp án đúng"
					isSearchable
					styles={customStyles}
					onChange={value => {
						setValue([
							question,
							answers.map(item => {
								item.correct = false;
								return item;
							}),
							value.value
						]);
						setValue([question, answers, value.value]);
					}}
				/>
			</InputDiv>
			{question &&
				answers &&
				answers.length > 1 &&
				answers.filter(item => item.correct === true).length > 0 &&
				type &&
				<SubmitButton type="submit" value={"Tạo câu hỏi"} />}
			<p>*Lưu ý: Không thể chỉnh câu hỏi, chỉ có thể xóa!*</p>
		</PopupCreate>
	);
}

const PopupCreate = styled.form`
	width: 100%;
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	align-items: center;
	top: 0;
	left: 0;
	background: #2f3136;
	z-index: 200;
	color: #fff;
	padding: 20px;
	& h2 {
		width: fit-content;
		height: fit-content;
		margin: auto;
	}
	& p {
		text-align: center;
	}
`;

const CreateAnswerButton = styled.p`
	width: fit-content;
	height: fit-content;
	margin: 10px auto;
	user-select: none;
	font-size: 15px;
	color: #948bee;
`;

const InputDiv = styled.div`
	display: grid;
	grid-template-columns: repeat(2, 1fr);
	margin-bottom: 20px;
	width: 100%;

	& input {
		width: 100%;
		min-height: 38px;
		padding-left: 10px;
		color: gray;
		border: none;
		outline: none;
	}
`;

const AnswerGroup = styled.div`
	margin-bottom: 20px;
	& div {
		display: flex;
		justify-content: center;
		align-items: center;
	}
`;

const ButtonCustom = styled(CreateAnswerButton)`
	margin: 0 10px !important;
	white-space: nowrap;
`;

const SubmitButton = styled.input`
	padding: 10px 20px;
	border: none;
	outline: none;
	background: #43b581;
	color: #ddd;
	margin: 10px 0;
	border-radius: 5px;
	font-size: 16px;
`;

export default memo(POPUPComponent);
