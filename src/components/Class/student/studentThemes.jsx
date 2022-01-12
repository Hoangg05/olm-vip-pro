import { query, where, collection, onSnapshot } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { BsFillPeopleFill, BsFillPlayFill } from "react-icons/bs";
import Select from "react-select";
import {
	Button,
	ChildColumn,
	ClassTask,
	ClassViewCustom,
	Column,
	TableProperties
} from "../../customs/class.styled";
import PaginatedItems from "../student/items";

function StudentThemes({
	user,
	history,
	lectures,
	data_user,
	customStyles,
	fs
}) {
	const [filterLectures, setFilterLectures] = useState({
		value: "Tất cả",
		label: "Tất cả"
	});
	const [[__class, __information], setClass] = useState([null, null]);

	useEffect(
		() => {
			let c = false;
			if (!c) {
				if (user && data_user) {
					const q = query(
						collection(fs, "class"),
						where("__students", "array-contains", data_user.uid)
					);
					onSnapshot(q, doc => {
						if (!doc) return false;
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
					});
				}
			}

			return () => {
				c = true;
			};
		},
		[user, data_user, fs, filterLectures]
	);

	return (
		<ClassViewCustom>
			<div>
				<h1>
					Trang học tập của {user.displayName}
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
											info={__information}
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

export default StudentThemes;
