import { updateDoc, doc } from "firebase/firestore";
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
import PaginatedItems from "../PaginatedItems";

function StudentThemes({ history, customStyles }) {
	const {
		user_data_login,
		user_data_store,
		fs,
		all_data__tables,
		filterDataTables
	} = useContext(HandleContext);

	const [filterLectures, setFilterLectures] = useState({
		value: "Tất cả",
		label: "Tất cả"
	});
	let _n_ = new Date().getTime();

	useEffect(
		() => {
			if (!all_data__tables && user_data_login && user_data_store) {
				filterDataTables({
					path: "class",
					callback: "__students",
					type: "array-contains",
					value: user_data_login.uid
				});
			}
		},
		[all_data__tables, filterDataTables, user_data_login, user_data_store]
	);

	useEffect(
		() => {
			if (all_data__tables) {
				const data_can_update = all_data__tables.filter(
					item => item.__date.__lock === false
				);
				if (data_can_update) {
					data_can_update.forEach(async (item, index) => {
						const end_time = item.__date.__open.__end;
						if (end_time) {
							if (_n_ >= end_time) {
								item.__date.__lock = true;
								await updateDoc(
									doc(fs, "class", item.__idHash),
									{
										all_data: all_data__tables.filter(
											exam =>
												exam.__idHash === item.__idHash
										)
									}
								);
							}
						}
					});
				}
			}
		},
		[_n_, all_data__tables, fs]
	);

	return (
		<ClassViewCustom>
			<div>
				<h1>
					Trang học tập của {user_data_login.displayName}
				</h1>
				<ClassTask>
					{/* {__information && <h2>
							Lớp {__information.__name}, Trường {{ 1: "Tiểu học", 2: "Trung học", 3: "THPT" }[__information.__type]} {__information.__school}
						</h2>} */}
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
								{all_data__tables && all_data__tables.length > 0
									? <PaginatedItems
											itemsPerPage={5}
											role={user_data_store.role}
											items={all_data__tables
												.sort(
													(exam1, exam2) =>
														exam2.__date.__open
															.__start -
														exam1.__date.__open
															.__start
												)
												.filter(
													item =>
														filterLectures.value !==
														"Tất cả"
															? item.__s.value ===
																filterLectures.value
															: item
												)}
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
