import React, { useState, useMemo, Fragment } from "react";
import Select from "react-select";
import { typeExam } from "../../__data__.module";
import { query, onSnapshot, where, collection } from "firebase/firestore";
import LoadingScreen from "../../../loading_screen";

function ConfigurationExam({ isCreate, Class, fs }) {
	const [
		[
			__title,
			__type,
			__who__make,
			__id,
			__protection,
			__date,
			__data__exam,
			__result,
			__teacher,
			__s
		],
		setDataExamToCreate
	] = useState([null, null, null, null, null, null, null, null, null, null]);
	// data
	const [class_arr, setClassArr] = useState(null);
	const [student_arr, setStudentArr] = useState(null);

	const [submit, isSubmit] = useState(false);

	function handleSubmit(e) {
		e.preventDefault();
		console.log(
			__title,
			__type,
			__who__make,
			__id,
			__protection,
			__date,
			__data__exam,
			__result,
			__teacher,
			__s
		);
		isSubmit(true);
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
							students: item[item.__name]
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
			if (__who__make && !submit) {
				const q = query(
					collection(fs, "users"),
					where("uid", "in", __who__make.__class.students)
				);
				if (q) {
					onSnapshot(q, docs => {
						if (!docs) return;
						const d = docs.docs.reduce((arr, item) => {
							const data = item.data();
							arr.push({
								value: data.uid,
								label: data.username
							});
							return arr;
						}, []);
						setStudentArr([
							{ value: __who__make.__student, label: "Tất cả" },
							...d
						]);
					});
				}
			}
		},
		[fs, __who__make, submit]
	);

	return (
		<Fragment>
			{!submit
				? <form onSubmit={handleSubmit}>
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
										__who__make,
										__id,
										__protection,
										__date,
										__data__exam,
										__result,
										__teacher,
										__s
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
										__who__make,
										__id,
										__protection,
										__date,
										__data__exam,
										__result,
										__teacher,
										__s
									])}
								required
							/>
							<Select
								required
								placeholder="Chọn lớp giao bài"
								options={class_arr}
								onChange={val =>
									setDataExamToCreate([
										__title,
										__type,
										{
											__class: val,
											__student: __who__make
												? __who__make.__student
												: null
										},
										__id,
										__protection,
										__date,
										__data__exam,
										__result,
										__teacher,
										__s
									])}
							/>
							{__who__make &&
								__who__make.__class &&
								<Select
									placeholder="Chọn đối tượng giao bài"
									options={student_arr}
									onChange={val =>
										setDataExamToCreate([
											__title,
											__type,
											{
												__class: __who__make
													? __who__make.__class
													: null,
												__student: val
											},
											__id,
											__protection,
											__date,
											__data__exam,
											__result,
											__teacher,
											__s
										])}
								/>}
						</div>
						{__type &&
							__title &&
							__who__make &&
							<input type="submit" placeholder="Xác nhận" />}
					</form>
				: <LoadingScreen />}
		</Fragment>
	);
}

export default ConfigurationExam;
