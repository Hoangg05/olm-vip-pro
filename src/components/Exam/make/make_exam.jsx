import React, {
	Fragment,
	memo,
	useContext,
	useEffect,
	useLayoutEffect,
	useState
} from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { HandleContext } from "../../../Context";
import E404 from "../../../components/404/404";
import LoadingScreen from "../../../loading_screen";
import styled from "styled-components";
import { doc, updateDoc } from "firebase/firestore";
import ClockComponent from "./clock";

function MakeExamComponent() {
	const { idExam } = useParams();
	const history = useNavigate();
	const {
		user_data_login,
		user_data_store,
		all_data__tables,
		filterDataTables,
		fs
	} = useContext(HandleContext);
	const [dataExam, setDataExam] = useState(null);
	const [loading, isLoading] = useState(true);
	const [can_make, isCanMake] = useState(false);
	const [answers, setAnswers] = useState(null);
	const [outTime, isOutTime] = useState(false);

	useEffect(
		() => {
			if (can_make) {
				document.addEventListener("oncontextmenu", e =>
					e.preventDefault()
				);
				document.addEventListener("ondblclick", e =>
					e.preventDefault()
				);
				document.addEventListener("visibilitychange", _event => {
					if (document.visibilityState === "visible") {
						console.log("tab is active");
					} else {
						console.log("tab is inactive");
					}
				});
				document.onblur = () => {
					console.log("Blur");
				};
				// disableDevtool({
				// 	url:
				// 		"http://fdvn.vn/gian-lan-trong-thi-cu-bi-phat-nhu-the-nao/#:~:text=Hành%20vi%20gian%20lận%20trong,người%20học%20không%20được%20làm.&text=Phạt%20tiền%20từ%202.000.000,chấm%20thi%2C%20phục%20vụ%20thi."
				// });
				document.onbeforeunload = function() {
					return "Đừng có load lại trang nếu không muốn bị đánh dấu bài :)";
				};
			}
		},
		[can_make]
	);

	useEffect(
		() => {
			filterDataTables({
				path: "class",
				callback: "__students",
				type: "array-contains",
				value: user_data_login.uid
			});
		},
		[filterDataTables, user_data_login]
	);

	useEffect(
		() => {
			if (user_data_store && user_data_store.role !== "student")
				history(`/exam/edit/${idExam}`);
		},
		[history, idExam, user_data_store]
	);

	useEffect(
		() => {
			if (dataExam) {
				const array = dataExam.__results;
				if (array) {
					const val = array.find(
						item => item.id_student === user_data_login.uid
					);
					if (val) {
						setAnswers(val.answers);
					}
				}
			}
		},
		[dataExam, user_data_login]
	);

	useLayoutEffect(
		() => {
			if (all_data__tables && all_data__tables.length > 0 && !dataExam) {
				const value = all_data__tables
					.filter(exam => exam.__id === idExam)
					.reduce((obj, exam) => {
						if (!exam) return obj;
						if (exam.__who_make.includes(user_data_login.uid)) {
							isCanMake(true);
							if (exam.__protection.__random__quest) {
								exam.__data__exam.sort(() => {
									return 0.5 - Math.random();
								});
							}
							if (exam.__protection.__random__answer) {
								exam.__data__exam.map(question => {
									question.answers.sort(() => {
										return 0.5 - Math.random();
									});
									return question;
								});
							}
							obj = { ...exam };
						}
						return obj;
					}, {});

				setDataExam(value);
			}

			isLoading(false);
		},
		[all_data__tables, idExam, user_data_login, dataExam]
	);

	function handleChooseAnswer(id_quest, id_answer, type) {
		const newValue = answers ? [...answers] : [];
		if (newValue) {
			const has = newValue.find(ans => ans.id_quest === id_quest);
			if (type === "once") {
				if (has) {
					newValue.reduce((array, item) => {
						if (item.id_quest === id_quest) {
							item.id_answer = id_answer;
						}
						array.push(item);
						return array;
					}, []);
				} else {
					newValue.push({
						id_quest,
						id_answer
					});
				}
			} else {
				if (has) {
					newValue.reduce((array, item) => {
						if (item.id_quest === id_quest) {
							if (!item.id_answer.includes(id_answer)) {
								item.id_answer.push(id_answer);
							} else {
								item.id_answer.splice(
									item.id_answer.indexOf(id_answer),
									1
								);
							}
						}
						array.push(item);
						return array;
					}, []);
				} else {
					newValue.push({
						id_quest,
						id_answer: [id_answer]
					});
				}
			}
		}
		setAnswers(newValue);
		saveAnswers(newValue);
	}

	function saveAnswers(answersNew, outTime = false) {
		const _data = { ...dataExam };
		const _old = [...all_data__tables];
		if (outTime) _data.__protection.__lock = true;
		const has = _data["__results"].find(
			std => std.id_student === user_data_login.uid
		);
		if (has) {
			_data["__results"].reduce((array, item) => {
				if (item.id_student === user_data_login.uid) {
					item.answers = answersNew;
				}
				array.push(item);
				return array;
			}, []);
		} else {
			_data["__results"].push({
				id_student: user_data_login.uid,
				answers: answersNew,
				submit: false
			});
		}
		const newArr = _old.reduce((array, item) => {
			if (item.__id === _data.__id) array.push(_data);
			else array.push(item);
			return array;
		}, []);
		newArr.forEach(async _class => {
			if (_class && _class.__idHash) {
				await updateDoc(doc(fs, "class", _class.__idHash), {
					all_data: newArr
						.filter(exam => exam.__idHash === _class.__idHash)
						.reduce((array, item) => {
							delete item.__idHash;
							array.push(item);
							return array;
						}, [])
				});
			}
		});
	}

	const isChoice = (id1, id2, type) => {
		if (answers) {
			const has = answers.find(ans => ans.id_quest === id1);
			if (has) {
				if (type === "once") {
					return has.id_answer === id2;
				} else {
					return has.id_answer.includes(id2);
				}
			}
		}
	};

	if (outTime) {
		saveAnswers(answers, outTime);
	}

	return (
		<Fragment>
			{loading && <LoadingScreen p />}
			{!loading &&
				can_make &&
				<Fragment>
					{dataExam &&
						dataExam.__data__exam.length > 0 &&
						!dataExam.__protection.__lock &&
						<ExamStyles>
							<Title>
								{dataExam.__title}
							</Title>
							<ExamBody>
								<Column>
									{dataExam.__data__exam.map((quest, idx) => {
										return (
											<QuestBlock
												key={idx}
												data-id-quest={quest.id__quest}>
												<h3>
													Câu {idx + 1}:{" "}
													{quest.question}
												</h3>
												<div>
													{quest.answers.map(
														(ans, inx) => {
															return (
																<h4
																	key={inx}
																	data-id-answer={
																		ans.id
																	}>
																	{{ 0: "A", 1: "B", 2: "C", 3: "D" }[inx]}.{" "}
																	{ans.title}
																</h4>
															);
														}
													)}
												</div>
											</QuestBlock>
										);
									})}
								</Column>
								<Column border_left>
									{dataExam.__data__exam.map((quest, idx) => {
										return (
											<AnswerBlock key={idx}>
												<h3>
													{idx + 1}.
												</h3>
												<div>
													{quest.answers.map(
														(ans, inx) => {
															const str = String.fromCharCode(
																inx + 65
															);
															return (
																<AnsButton
																	key={inx}
																	type={
																		quest.type
																	}
																	data-answer-id={
																		ans.id
																	}
																	onClick={() => {
																		handleChooseAnswer(
																			quest.id__quest,
																			ans.id,
																			quest.type
																		);
																	}}
																	select={() => {
																		return isChoice(
																			quest.id__quest,
																			ans.id,
																			quest.type
																		);
																	}}>
																	<h4>
																		{str}
																	</h4>
																</AnsButton>
															);
														}
													)}
												</div>
											</AnswerBlock>
										);
									})}
								</Column>
							</ExamBody>
							{!dataExam.__protection.__lock &&
								dataExam.__date.__open.__end &&
								!outTime &&
								<ClockComponent
									currentTime={dataExam.__date.__open.__end}
									isEnd={isOutTime}
									end={outTime}
								/>}
						</ExamStyles>}
					{!dataExam && <E404 />}
					{dataExam &&
						dataExam.__data__exam.length === 0 &&
						dataExam.__protection &&
						!dataExam.__protection.__lock &&
						<h1 style={{ textAlign: "center", margin: "auto" }}>
							Giáo viên đã xóa hết câu hỏi rồi :(
						</h1>}
					{dataExam.__protection.__lock &&
						<h1 style={{ textAlign: "center", margin: "auto" }}>
							Bài đã bị khóa bài rồi :(
						</h1>}
				</Fragment>}
			{!loading &&
				!can_make &&
				<E404>
					<h1>Từ chối truy cập</h1>
					<p>
						Có vẻ như bạn chưa được giáo viên cho phép làm bài thi
						này !
					</p>
				</E404>}
		</Fragment>
	);
}

const ExamStyles = styled.div`
	width: 90%;
	height: 80vh;
	max-height: 80vh;
	margin: 0 auto;
	border: 1px solid #ddd;
	border-radius: 10px;
	user-select: none;
`;

const Title = styled.h1`
	text-align: center;
	margin: 10px 0;
	font-style: italic;
`;

const ExamBody = styled.div`
	display: grid;
	grid-template-columns: 1fr auto;
	width: 100%;
	height: 100%;
`;

const Column = styled.div`
	width: 100%;
	height: 100%;
	overflow-y: auto;
	border-top: 1px solid #ddd;
	${props => props.border_left && `border-left: 1px solid #ddd;`};
	padding: 20px;
`;

const QuestBlock = styled.div`
	width: 80%;
	margin-bottom: 20px;
	& div {
		display: flex;
		flex-wrap: wrap;
		justify-content: space-around;
		align-items: center;
		margin-top: 10px;
	}
`;

const AnswerBlock = styled.div`
	margin-bottom: 20px;
	display: grid;
	grid-template-columns: auto 1fr;
	align-items: center;
	& div {
		display: flex;
		justify-content: space-around;
		align-items: center;
	}
`;

const AnsButton = styled.button`
	width: 30px;
	height: 30px;
	margin-left: 10px;
	display: flex;
	justify-content: center;
	align-items: center;
	background: ${props => (props.select() ? "#14a76c" : "transparent")};
	color: ${props => (props.select() ? "#fff" : "#000")};
	border: 1px solid #ccc;
	border-radius: ${props => {
		switch (props.type) {
			case "once":
				return "50%";
			case "more":
				return "5px";
			default:
				return "0px";
		}
	}};
`;

export default memo(MakeExamComponent);
