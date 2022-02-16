import { doc, updateDoc } from "firebase/firestore";
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
import PaginatedItems from "../PaginatedItems";

function TeacherThemes({ history, customStyles }) {
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
			filterDataTables({
				path: "class",
				callback: "__teachers",
				type: "array-contains",
				value: user_data_login.uid
			});
		},
		[user_data_login, user_data_store, all_data__tables, filterDataTables]
	);

	useEffect(
		() => {
			if (all_data__tables) {
				const data_can_update = all_data__tables.filter(
					item => item.__protection.__lock === false
				);
				if (data_can_update) {
					data_can_update.forEach(async item => {
						const end_time = item.__date.__open.__end;
						if (end_time) {
							if (_n_ >= end_time) {
								item.__protection.__lock = true;
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
						<Button onClick={() => history("/exam/create")}>
							<BsFillFileEarmarkArrowUpFill />
							<p>Giao bài</p>
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
								<Column c={4}>
									<ChildColumn as="th">Tiêu đề</ChildColumn>
									<ChildColumn as="th">Môn học</ChildColumn>
									<ChildColumn as="th">
										Ngày giao bài
									</ChildColumn>
									<ChildColumn as="th">
										Ngày hết hạn
									</ChildColumn>
								</Column>

								{all_data__tables && all_data__tables.length > 0
									? <PaginatedItems
											fs={fs}
											role={user_data_store.role}
											itemsPerPage={5}
											history={history}
											filter={filterLectures}
											items={Array.from(
												new Set(
													all_data__tables
														.sort(
															(exam1, exam2) =>
																exam2.__date
																	.__open
																	.__start -
																exam1.__date
																	.__open
																	.__start
														)
														.map(a => a.__id)
												)
											)
												.map(id => {
													return all_data__tables.find(
														a => a.__id === id
													);
												})
												.filter(
													item =>
														filterLectures.value !==
														"Tất cả"
															? item.__s.value ===
																filterLectures.value
															: item
												)}
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
