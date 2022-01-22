import {
	collection,
	doc,
	onSnapshot,
	query,
	updateDoc,
	where
} from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import {
	BsFillFileEarmarkArrowUpFill,
	BsFillPeopleFill,
	BsFillPlayFill
} from "react-icons/bs";
import Select from "react-select";
import { HandleContext } from "../../../Context";
import {
	Button,
	ChildColumn,
	ClassTask,
	ClassViewCustom,
	Column,
	TableProperties
} from "../../customs/class.styled";
import { lectures } from "../../__data__.module";
import PaginatedItems from "./items";

function TeacherThemes({ history, customStyles }) {
	const { user_data_login, user_data_store, fs } = useContext(HandleContext);

	const [filterLectures, setFilterLectures] = useState({
		value: "Tất cả",
		label: "Tất cả"
	});

	const [[all_data, id_data], setAllData] = useState([null, null]);
	let _n_ = new Date().getTime();

	useEffect(
		() => {
			let c = false;
			if (c) return;
			const q =
				user_data_login && user_data_store
					? query(
							collection(fs, "class"),
							where(
								"__teachers",
								"array-contains",
								user_data_login.uid
							)
						)
					: null;
			const getRTD = q
				? onSnapshot(q, doc => {
						if (!doc) return;
						const d = doc.docs.reduce((_, item) => {
							if (item.data()) {
								const d_ = item.data();
								if (
									d_.__name &&
									d_.__type &&
									d_.__school &&
									d_.__k &&
									d_.__year
								)
									_.push({
										__name: d_.__name,
										__type: d_.__type,
										__school: d_.__school,
										__k: d_.__k,
										__year: d_.__year
									});
							}
							return _;
						}, []);

						const _d_ = doc.docs
							.reduce((_, item) => {
								if (
									item.data().all_data &&
									item.data().all_data.length > 0
								) {
									_.push(item.data().all_data);
								}
								return _;
							}, [])
							.reduce((arr, item) => {
								item.forEach(i => arr.push(i));
								return arr;
							});

						const _d_f_ = _d_
							.filter(
								item =>
									filterLectures.value !== "Tất cả"
										? item.__s === filterLectures.value
										: item
							)
							.filter(item => item.__teacher)
							.filter(item => {
								return (
									item.__teacher.__id === user_data_login.uid
								);
							})
							.map((item, index) => {
								item.__name = d[index].__name;
								item.__type = d[index].__type;
								item.__school = d[index].__school;
								item.__k = d[index].__k;
								item.__year = d[index].__year;
								return item;
							});

						setAllData([
							_d_f_,
							doc.docs.reduce((arr, item) => {
								arr.push(item.id);
								return arr;
							}, [])
						]);
					})
				: null;

			if (id_data && all_data) {
				all_data
					.filter(item => item.__date.__lock === false)
					.forEach(async (item, index) => {
						const end_time = item.__date.__open.__end;
						if (end_time) {
							const _e_ = end_time.seconds * 1000;
							if (_n_ >= _e_) {
								item.__date.__lock = true;
								await updateDoc(
									doc(fs, "class", id_data[index]),
									{
										all_data
									}
								);
							}
						}
					});
			}

			return () => {
				c = true;
				getRTD();
			};
		},
		[
			user_data_login,
			user_data_store,
			fs,
			filterLectures,
			all_data,
			id_data,
			_n_
		]
	);

	return (
		<ClassViewCustom>
			<div>
				<h1>
					Trang của {user_data_login.displayName}
				</h1>
				<ClassTask>
					<ClassTask flex>
						<Button>
							<BsFillPeopleFill />
							<p>Danh sách học sinh</p>
						</Button>
						<Button onClick={() => history("/")}>
							<BsFillPlayFill />
							<p>Vào Zoom</p>
						</Button>
						{user_data_store.role !== "student" &&
							<Button onClick={() => history("/exam/create")}>
								<BsFillFileEarmarkArrowUpFill />
								<p>Giao bài</p>
							</Button>}
					</ClassTask>
				</ClassTask>
				<div>
					<h2>Bài được giao</h2>
					<div>
						<Select
							options={lectures}
							placeholder={"Chọn môn"}
							isSearchable
							onChange={setFilterLectures}
							styles={customStyles}
						/>
						<TableProperties>
							<tbody>
								<Column>
									<ChildColumn as="th">Tiêu đề</ChildColumn>
									<ChildColumn as="th">Môn học</ChildColumn>
									<ChildColumn as="th">
										Bài của lớp
									</ChildColumn>
									<ChildColumn as="th">
										Ngày giao bài
									</ChildColumn>
									<ChildColumn as="th">
										Ngày hết hạn
									</ChildColumn>
								</Column>

								{user_data_store
									? <PaginatedItems
											fs={fs}
											itemsPerPage={7}
											history={history}
											filter={filterLectures}
											items={all_data}
										/>
									: <tr>
											<ChildColumn>
												Chưa có bài nào...
											</ChildColumn>
										</tr>}
							</tbody>
						</TableProperties>
					</div>
				</div>
			</div>
		</ClassViewCustom>
	);
}

export default React.memo(TeacherThemes);
