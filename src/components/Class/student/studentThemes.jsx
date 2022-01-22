import {
	query,
	where,
	collection,
	onSnapshot,
	updateDoc,
	doc
} from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import { BsFillPeopleFill, BsFillPlayFill } from "react-icons/bs";
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
import PaginatedItems from "../student/items";

function StudentThemes({ history, customStyles }) {
	const { user_data_login, user_data_store, fs } = useContext(HandleContext);

	const [filterLectures, setFilterLectures] = useState({
		value: "Tất cả",
		label: "Tất cả"
	});
	const [[__class, __information], setClass] = useState([null, null]);
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
								"__students",
								"array-contains",
								user_data_store.uid
							)
						)
					: null;
			const getRTD = q
				? onSnapshot(q, doc => {
						if (!doc) return;
						const _d_ = doc.docs[0].data();
						const _d_f_ = _d_.all_data.filter(
							item =>
								filterLectures.value !== "Tất cả"
									? item.__s === filterLectures.value
									: item
						);
						setClass([
							_d_f_,
							{
								__name: _d_.__name,
								__type: _d_.__type,
								__school: _d_.__school,
								__k: _d_.__k,
								__year: _d_.__year
							}
						]);
						setAllData([_d_.all_data, doc.docs[0].id]);
					})
				: null;

			if (__class && id_data) {
				__class
					.filter(item => item.__date.__lock === false)
					.forEach(async item => {
						const end_time = item.__date.__open.__end;
						if (end_time) {
							const _e_ = end_time.seconds * 1000;
							if (_n_ >= _e_) {
								console.log("Loaded!!!");
								item.__date.__lock = true;
								await updateDoc(doc(fs, "class", id_data), {
									all_data
								});
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
			__class,
			all_data,
			id_data,
			_n_
		]
	);

	return (
		<ClassViewCustom>
			<div>
				<h1>
					Trang học tập của {user_data_login.displayName}
				</h1>
				<ClassTask>
					{__information &&
						<h2>
							Lớp {__information.__name}, Trường{" "}
							{
								{ 1: "Tiểu học", 2: "Trung học", 3: "THPT" }[
									__information.__type
								]
							}{" "}
							{__information.__school}
						</h2>}
					<ClassTask flex>
						<Button>
							<BsFillPeopleFill />
							<p>Điểm danh</p>
						</Button>
						<Button onClick={() => history("/")}>
							<BsFillPlayFill />
							<p>Vào Zoom</p>
						</Button>
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
									<ChildColumn as="th">Giáo viên</ChildColumn>
									<ChildColumn as="th">
										Ngày giao bài
									</ChildColumn>
									<ChildColumn as="th">
										Ngày hết hạn
									</ChildColumn>
								</Column>
								{__class
									? <PaginatedItems
											itemsPerPage={7}
											items={__class}
											history={history}
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

export default React.memo(StudentThemes);
