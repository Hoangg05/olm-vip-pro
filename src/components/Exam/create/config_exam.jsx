import React, { useState, useMemo, Fragment, useContext } from "react";
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

function ConfigurationExam({ Class }) {
	const { fs, user_data_login } = useContext(HandleContext);
	const time = new Date();
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
			__error: {
				__exit: 0,
				__resize: 0
			},
			__exam: {
				__random__quest: true,
				__remake: true,
				__show_point: false
			}
		},
		{
			__create: time.getTime(),
			__lock: true,
			__open: {
				__start: time.getTime(),
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
		time.getFullYear()
	]);

	// data
	const [class_arr, setClassArr] = useState(null);
	const [student_arr, setStudentArr] = useState(null);

	const [submit, isSubmit] = useState(false);

	function handleSubmit(e) {
		e.preventDefault();
		isSubmit(true);
		toast.warn("Đang tạo bài kiểm tra...");
		if (user_data_login) {
			const id_exam = encode(
				`bài tập môn ${__s.value} tên ${__title} của giáo viên ${__teacher.__name} - ${time.getTime()}`,
				"hoangyuri"
			);
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
					__date,
					__results,
					__data__exam,
					__teacher,
					__s,
					__year
				};
				await handleCreateExamForm(exam_data_add, item.class.value);
			});
			toast.info(
				"Đã tạo xong! Vui lòng chờ chút, sẽ chuyển sang trang chỉnh sửa sau 10s"
			);
			setTimeout(() => {
				history(`/exam/edit/${id_exam}`);
			}, 10 * 1000);
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

	useMemo(
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

	useMemo(
		() => {
			if (__who_make && !submit && __who_make.length > 0) {
				const q = query(
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
				if (q) {
					onSnapshot(q, doc => {
						if (!doc) return;
						if (__who_make.length > 0) {
							setStudentArr([
								...new Map(
									__who_make
										.reduce((_, item, index) => {
											_.push(
												...new Set([
													{
														label: `Tất cả học sinh lớp ${item
															.class
															.__name} khóa ${item
															.class
															.__k} trường ${{
															0: "Mầm non",
															1: "Tiểu học",
															2: "THCS",
															3: "THPT"
														}[
															Class[index].__type
														]} ${item.class
															.__school} năm ${Class[
															index
														].__year}`,
														value:
															item.class.students,
														id_class:
															item.class.value
													}
												]),
												...doc.docs.reduce((a, i) => {
													const data = i.data();
													a.push(
														...class_arr.reduce(
															(
																arr,
																child_arr
															) => {
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
				}
			} else {
				setStudentArr(null);
			}
		},
		[__who_make, submit, fs, Class, class_arr]
	);

	return (
		<Fragment>
			{!submit
				? <form onSubmit={e => handleSubmit(e)}>
						<div>
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
								placeholder="Chọn kiểu câu hỏi"
								options={typeExam}
								onChange={val =>
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
									])}
								required
							/>
							<Select
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
									required
									placeholder="Chọn lớp giao bài"
									options={class_arr}
									isMulti
									onChange={val =>
										setDataExamToCreate([
											__title,
											__type,
											val.reduce((arr, item) => {
												arr.push({
													class: item,
													student_lst: null
												});
												return arr;
											}, []),
											__id,
											__protection,
											__date,
											__data__exam,
											__results,
											__teacher,
											__s,
											__year
										])}
								/>}
							{__who_make &&
								__who_make.length > 0 &&
								<Select
									required
									placeholder="Chọn đối tượng giao bài"
									isMulti
									options={student_arr}
									onChange={val =>
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
										])}
								/>}
						</div>
						{__type &&
							__title &&
							__who_make &&
							__who_make.length > 0 &&
							__who_make[0].student_lst &&
							<input type="submit" placeholder="Xác nhận" />}
					</form>
				: <LoadingScreen />}
		</Fragment>
	);
}

export default ConfigurationExam;
