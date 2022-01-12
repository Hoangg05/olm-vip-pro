import React, { useState } from "react";
import {
	BsFillFileEarmarkArrowUpFill,
	BsFillPeopleFill,
	BsFillPlayFill
} from "react-icons/bs";
import Select from "react-select";
import {
	Button,
	ChildColumn,
	ClassTask,
	ClassViewCustom,
	Column,
	TableProperties
} from "../../customs/class.styled";
import PaginatedItems from "./items";

function TeacherThemes({
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
	return (
		<ClassViewCustom>
			<div>
				<h1>
					Trang của {user.displayName}
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
						{data_user.role !== "student" &&
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

								{data_user
									? <PaginatedItems
											fs={fs}
											itemsPerPage={7}
											history={history}
											data_user={data_user}
											filter={filterLectures}
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

export default TeacherThemes;
