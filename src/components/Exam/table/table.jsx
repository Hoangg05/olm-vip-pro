import React, { useState, Fragment, useContext, useEffect } from "react";
import {
	ChildColumn,
	ClassViewCustom,
	Column,
	TableProperties
} from "../../customs/class.styled";
import { ButtonTask, DropdownTask } from "../../customs/exam.styled";
import { RiArrowDropDownLine } from "react-icons/ri";
import DelAsk from "../pop_up";
import { useNavigate } from "react-router-dom";
import { HandleContext } from "../../../Context";

function TableExam() {
	const { all_data__tables, user_data_login, filterDataTables } = useContext(
		HandleContext
	);
	const [[show_popup, itemDel], isDel] = useState([false, null]);
	const history = useNavigate();

	useEffect(
		() => {
			filterDataTables({
				path: "class",
				callback: "__teachers",
				type: "array-contains",
				value: user_data_login.uid
			});
		},
		[filterDataTables, user_data_login.uid]
	);

	return (
		<Fragment>
			{!show_popup && user_data_login
				? <ClassViewCustom>
						<h1>Trang giao bài tập</h1>
						<div>
							<div>
								<ButtonTask
									type="green"
									onClick={() => history("/exam/create")}>
									Tạo bài tập
								</ButtonTask>
								<ButtonTask
									type="blue"
									onClick={() => history("/exam/form-share")}>
									Mẫu bài tập được chia sẻ
								</ButtonTask>
								<ButtonTask
									type="red"
									onClick={() => history("/exam/remove")}>
									Bài tập đã xóa
								</ButtonTask>
								<ButtonTask
									onClick={() => history("/exam/your-class")}>
									Các lớp học
								</ButtonTask>
								<ButtonTask
									onClick={() => history("exam/add-student")}>
									Thêm học sinh vào lớp
								</ButtonTask>
							</div>
							<TableProperties>
								<tbody>
									<Column c={7}>
										<ChildColumn as="th">STT</ChildColumn>
										<ChildColumn as="th">
											Tên bài tập
										</ChildColumn>
										<ChildColumn as="th">
											Ngày tạo
										</ChildColumn>
										<ChildColumn as="th">
											Thể loại
										</ChildColumn>
										<ChildColumn as="th">Môn học</ChildColumn>
										<ChildColumn as="th">
											Hành động
										</ChildColumn>
										<ChildColumn as="th">
											Trạng thái
										</ChildColumn>
									</Column>
									{all_data__tables &&
										all_data__tables.map((item, index) => {
											const time = new Date().getTime();
											return (
												<Column
													c={7}
													no_hover
													key={index}>
													<ChildColumn>
														{index + 1}
													</ChildColumn>
													<ChildColumn>
														{item.__title}
													</ChildColumn>
													<ChildColumn>
														{new Date(
															item.__date.__create
														).toDateString()}
													</ChildColumn>
													<ChildColumn>
														{item.__s.label}
													</ChildColumn>
													<ChildColumn>
														{item.__s.label}
													</ChildColumn>
													<ChildColumn no_overflow>
														<TaskManager
															history={history}
															isDel={isDel}
															item={item}
															show_popup={
																show_popup
															}
														/>
													</ChildColumn>
													<ChildColumn>
														{time >=
															item.__date.__open
																.__start.seconds *
																1000 ||
														item.__date.__lock
															? "Đã hết thời gian"
															: "Trong thời gian làm bài"}
													</ChildColumn>
												</Column>
											);
										})}
								</tbody>
							</TableProperties>
						</div>
					</ClassViewCustom>
				: <DelAsk isDel={isDel} itemDel={itemDel} />}
		</Fragment>
	);
}

function TaskManager({ history, isDel, item, show_popup }) {
	const [dropdown, isDropdown] = useState(false);
	return (
		<ButtonTask onClick={() => isDropdown(!dropdown)}>
			<p>
				Chọn <RiArrowDropDownLine />
			</p>
			{dropdown &&
				<DropdownTask>
					<ButtonTask
						w100
						type="green"
						onClick={() => history(`/exam/watch/${item.__id}`)}>
						Xem, giao bài
					</ButtonTask>

					<ButtonTask
						onClick={() => history(`/exam/edit/${item.__id}`)}
						w100
						type="blue">
						Sửa đổi
					</ButtonTask>

					<ButtonTask
						w100
						type="red"
						onClick={() => isDel([!show_popup, item])}>
						Xóa
					</ButtonTask>
				</DropdownTask>}
		</ButtonTask>
	);
}

export default React.memo(TableExam);
