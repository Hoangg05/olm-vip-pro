import React, { useState, useEffect, Fragment, useContext, memo } from "react";
import Select from "react-select";
import { lecturesCreateExam, typeExam } from "../../__data__.module";
import {
	query,
	onSnapshot,
	where,
	collection,
	doc,
	updateDoc,
	arrayUnion
} from "firebase/firestore";
import LoadingScreen from "../../../loading_screen";
import { HandleContext } from "../../../Context";
import encode from "../../../encode";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { CreateFormExam } from "../../customs/exam.styled";
import styled from "styled-components";

function ConfigurationExam({ Class }) {
	const { fs, user_data_login } = useContext(HandleContext);

	const history = useNavigate();

	const [
		[
			__title,
			__type,
			__who_make,
			__id,
			__protection,
			__date,
			__data__exam,
			__results,
			__teacher,
			__s,
			__year
		],
		setDataExamToCreate
	] = useState([
		null,
		null,
		null,
		null,
		{
			__exit: false,
			__can_error: false,
			__max_error_accept: 3,
			__resize: false,
			__random__quest: true,
			__random__answer: true,
			__remake: true,
			__show_point: false,
			__lock: true
		},
		{
			__create: null,
			__open: {
				__start: null,
				__end: null
			}
		},
		[],
		[],
		{
			__id: user_data_login.uid,
			__name: user_data_login.displayName
		},
		null,
		null
	]);

	// data
	const [class_arr, setClassArr] = useState(null);
	const [student_arr, setStudentArr] = useState(null);

	const [openSelect, isOpenSelect] = useState(false);
	const [openTimeClose, setOpenTimeClose] = useState(false);

	const [submit, isSubmit] = useState(false);

	function handleSubmit(e) {
		e.preventDefault();
		isSubmit(true);
		toast.warn("Đang tạo bài kiểm tra...");
		if (user_data_login) {
			const id_exam = encode(
				`bài tập môn ${__s.value} tên ${__title} của giáo viên ${__teacher.__name} - ${new Date().getTime()}`,
				"hoangyuri"
			);
			const timeGet = new Date().getTime();
			const timeObj = __date;
			timeObj.__create = timeGet;
			timeObj.__open.__start = timeGet;
			__who_make.forEach(async item => {
				const exam_data_add = {
					__title,
					__type,
					__who_make: item.student_lst.value.reduce(
						(arr_combine, id) => {
							const id_student = id.value;
							if (typeof id_student === "object")
								arr_combine.push(...id_student);
							else arr_combine.push(id_student);
							return [...new Set(arr_combine)];
						},
						[]
					),
					__id: id_exam,
					__protection,
					__date: timeObj,
					__results,
					__data__exam,
					__teacher,
					__s,
					__year
				};
				await handleCreateExamForm(exam_data_add, item.class.value);
			});
			toast.info(
				"Đã tạo xong! Vui lòng chờ chút, đang chuyển sang trang chỉnh sửa bài kiểm tra"
			);
			setTimeout(() => {
				history(`/exam/edit/${id_exam}`);
			}, 3 * 1000);
		}
	}

	async function handleCreateExamForm(dataForm, pathStore) {
		if (__who_make) {
			await updateDoc(doc(fs, "class", pathStore), {
				all_data: arrayUnion(dataForm)
			}).catch(async error => {
				await updateDoc(doc(fs, "class", pathStore), {
					all_data: [dataForm]
				});
			});
		}
	}

	function handleMinDatetimeLocal() {
		const __date = new Date();
		const __year = __date.getFullYear();
		const __month = __date.getMonth() + 1;
		const __day = __date.getDate();
		const __hour = __date.getHours();
		const __min = __date.getMinutes();
		const __date_start = `${__year}-${__month}-${__day}T${__hour}:${__min}:00`;
		return __date_start;
	}

	function handleTimePick(e) {
		const timeGet = new Date(e.target.value).getTime();
		const timeObj = __date;
		timeObj.__open.__end = timeGet;
		setDataExamToCreate([
			__title,
			__type,
			__who_make,
			__id,
			__protection,
			timeObj,
			__data__exam,
			__results,
			__teacher,
			__s,
			__year
		]);
	}

	useEffect(
		() => {
			if (Class && !submit) {
				setClassArr(
					Class.reduce((arr, item) => {
						arr.push({
							value: item.__idHash,
							label: `Lớp ${item.__name} khóa ${item.__k} trường ${{
								0: "Mầm non",
								1: "Tiểu học",
								2: "THCS",
								3: "THPT"
							}[
								item.__type
							]} ${item.__school} năm ${item.__year}`,
							students: item[item.__name],
							__k: item.__k,
							__name: item.__name,
							__school: item.__school
						});
						return arr;
					}, [])
				);
			}
		},
		[Class, submit]
	);

	useEffect(
		() => {
			const q =
				__who_make &&
				!submit &&
				__who_make.length > 0 &&
				query(
					collection(fs, "users"),
					where(
						"uid",
						"in",
						__who_make.reduce((_, item) => {
							_.push(...new Set(item.class.students));
							return _;
						}, [])
					)
				);

			const unsubscribe =
				q &&
				onSnapshot(q, doc => {
					if (!doc) return;
					if (__who_make.length > 0 && !openSelect) {
						setStudentArr([
							...new Map(
								__who_make
									.reduce((_, item, index) => {
										_.push(
											...new Set([
												{
													label: `Tất cả học sinh ( ${item
														.class.label} )`,
													value: item.class.students,
													id_class: item.class.value
												}
											]),
											...doc.docs.reduce((a, i) => {
												const data = i.data();
												a.push(
													...class_arr.reduce(
														(arr, child_arr) => {
															if (
																child_arr.students.indexOf(
																	data.uid
																) >= 0
															) {
																arr.push({
																	value:
																		data.uid,
																	label:
																		data.username,
																	id_class:
																		child_arr.value
																});
															}
															return arr;
														},
														[]
													)
												);
												return a;
											}, [])
										);
										return _;
									}, [])
									.map(x => [JSON.stringify(x.value), x])
							).values()
						]);
					}
				});
			return () => {
				unsubscribe && unsubscribe();
			};
		},
		[__who_make, submit, fs, Class, class_arr, openSelect]
	);

	return (
		<Fragment>
			{!submit
				? <CreateFormExam as="form" onSubmit={e => handleSubmit(e)}>
						<input
							placeholder="Tên bài"
							required
							onChange={e => {
								e.target.value = e.target.value.replace(
									/^ +/gm,
									""
								);
								setDataExamToCreate([
									e.target.value,
									__type,
									__who_make,
									__id,
									__protection,
									__date,
									__data__exam,
									__results,
									__teacher,
									__s,
									__year
								]);
							}}
						/>
						<Select
							onMenuOpen={() => isOpenSelect(true)}
							onMenuClose={() => isOpenSelect(false)}
							placeholder="Chọn kiểu câu hỏi"
							options={typeExam}
							onChange={val => {
								setDataExamToCreate([
									__title,
									val,
									__who_make,
									__id,
									__protection,
									__date,
									__data__exam,
									__results,
									__teacher,
									__s,
									__year
								]);
							}}
							required
						/>
						<Select
							onMenuOpen={() => isOpenSelect(true)}
							onMenuClose={() => isOpenSelect(false)}
							placeholder="Chọn môn học"
							options={lecturesCreateExam}
							onChange={val =>
								setDataExamToCreate([
									__title,
									__type,
									__who_make,
									__id,
									__protection,
									__date,
									__data__exam,
									__results,
									__teacher,
									val,
									__year
								])}
							required
						/>
						{class_arr &&
							<Select
								onMenuOpen={() => {
									isOpenSelect(true);
								}}
								onMenuClose={() => {
									isOpenSelect(false);
								}}
								required
								placeholder="Chọn lớp giao bài"
								options={class_arr}
								isMulti
								onChange={val => {
									setDataExamToCreate([
										__title,
										__type,
										val.reduce((array, item) => {
											array.push({
												class: item,
												student_lst: {}
											});
											return array;
										}, []),
										__id,
										__protection,
										__date,
										__data__exam,
										__results,
										__teacher,
										__s,
										__year
									]);
								}}
							/>}
						{__who_make &&
							__who_make.length > 0 &&
							student_arr &&
							<Select
								onMenuOpen={() => isOpenSelect(true)}
								onMenuClose={() => isOpenSelect(false)}
								required
								placeholder="Chọn đối tượng giao bài"
								isMulti
								options={student_arr}
								onChange={val => {
									setDataExamToCreate([
										__title,
										__type,
										__who_make.reduce((_, item) => {
											_.push({
												class: item.class,
												student_lst: {
													value: val.filter(
														student =>
															student.id_class ===
															item.class.value
													),
													id_class: item.class.value
												}
											});
											return _;
										}, []),
										__id,
										__protection,
										__date,
										__data__exam,
										__results,
										__teacher,
										__s,
										__year
									]);
								}}
							/>}
						<PickTime>
							<div>
								<p>Mở giới hạn thời gian làm bài</p>
								<SwitchButton>
									<input
										type="checkbox"
										onClick={() =>
											setOpenTimeClose(!openTimeClose)}
									/>
									<span />
								</SwitchButton>
							</div>
							{openTimeClose &&
								<div>
									<p>Thời gian đóng bài</p>
									<input
										type="datetime-local"
										name="time_close"
										min={handleMinDatetimeLocal()}
										onChange={handleTimePick}
										required
									/>
								</div>}
						</PickTime>
						{__type &&
							__title &&
							__who_make &&
							__who_make.length > 0 &&
							__who_make
								.reduce((array, item) => {
									if (
										item.student_lst &&
										item.student_lst.value &&
										item.student_lst.value.length > 0
									) {
										array.push(true);
									} else {
										array.push(false);
									}
									return array;
								}, [])
								.indexOf(false) === -1 &&
							openTimeClose &&
							__date.__open.__end &&
							<input type="submit" value="Xác nhận" />}
						{__type &&
							__title &&
							__who_make &&
							__who_make.length > 0 &&
							__who_make
								.reduce((array, item) => {
									if (
										item.student_lst &&
										item.student_lst.value &&
										item.student_lst.value.length > 0
									) {
										array.push(true);
									} else {
										array.push(false);
									}
									return array;
								}, [])
								.indexOf(false) === -1 &&
							<input type="submit" value="Xác nhận" />}
						<p
							style={{
								textAlign: "center",
								width: "85%",
								margin: "20px auto"
							}}>
							Lưu ý: Đôi lúc, ở phần đối tượng giao bài sẽ hiển thị
							một vài lựa chọn ảo. Lựa chọn ảo này xuất hiện khi bạn
							xóa một lớp nào đó nhưng không xóa các lựa chọn thuộc
							lớp đó.
						</p>
					</CreateFormExam>
				: <LoadingScreen />}
		</Fragment>
	);
}

const SwitchButton = styled.label`
	position: relative;
	display: inline-block;
	width: 60px;
	height: 34px;

	& input {
		opacity: 0;
		width: 0;
		height: 0;
		&:checked + span {
			background-color: #2196f3;
			&:before {
				transform: translateX(26px);
			}
		}
		&:focus + span {
			box-shadow: 0 0 1px #2196f3;
		}
	}

	& span {
		position: absolute;
		cursor: pointer;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		height: 100%;
		background-color: #ccc;
		transition: 0.4s;
		border-radius: 34px;
		&:before {
			position: absolute;
			content: "";
			height: 26px;
			width: 26px;
			left: 4px;
			bottom: 4px;
			background-color: white;
			transition: 0.4s;
			border-radius: 50%;
		}
	}
`;

const PickTime = styled.div`
	& div {
		display: grid;
		grid-template-columns: 1fr 1fr;
		& label,
		& input[type="timedate-local"] {
			margin-left: auto;
		}
	}
`;

export default memo(ConfigurationExam);
