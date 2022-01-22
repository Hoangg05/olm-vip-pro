import React, { useState, useEffect, Fragment } from "react";
import {
	ChildColumn,
	ClassViewCustom,
	Column,
	TableProperties
} from "../../customs/class.styled";
import { ButtonTask, DropdownTask } from "../../customs/exam.styled";
import { RiArrowDropDownLine } from "react-icons/ri";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import DelAsk from "../pop_up";
import { useNavigate } from "react-router-dom";

function TableExam({ user, fs }) {
	const [dropdown, isDropdown] = useState(false);
	const [[__class, all_data, id_data], setAllData] = useState([
		null,
		null,
		null
	]);
	const [[show_popup, name], isDel] = useState([false, null]);
	const history = useNavigate();

	useEffect(
		() => {
			let c = false;
			if (c) return;
			const q = user
				? query(
						collection(fs, "class"),
						where("__teachers", "array-contains", user.uid)
					)
				: null;
			const getRTD = q
				? onSnapshot(q, doc => {
						if (!doc) return;
						const _d_ = doc.docs.reduce((_, item) => {
							return item.data().all_data;
						}, []);
						const _d_f_ = _d_.filter(
							item => item.__teacher.__id === user.uid
						);
						setAllData([
							doc.docs.reduce((arr, item) => {
								const d = item.data();
								arr.push({
									__k: d.__k,
									__name: d.__name,
									__school: d.__school,
									__type: d.__type,
									__year: d.__year
								});
								return arr;
							}, []),
							_d_f_,
							doc.docs.reduce((arr, item) => {
								arr.push(item.id);
								return arr;
							}, [])
						]);
					})
				: null;
			return () => {
				c = true;
				if (typeof getRTD === "function") {
					getRTD();
				}
			};
		},
		[user, fs, all_data, id_data, __class]
	);

	return (
		<Fragment>
			{!show_popup && user
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
									{all_data &&
										all_data.map((item, index) => {
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
														{
															item.__date.__create
																.__start
														}
													</ChildColumn>
													<ChildColumn>
														{item.__type.__name}
													</ChildColumn>
													<ChildColumn>
														{item.__s}
													</ChildColumn>
													<ChildColumn no_overflow>
														<ButtonTask
															onClick={() =>
																isDropdown(
																	!dropdown
																)}>
															<p>
																Chọn{" "}
																<RiArrowDropDownLine />
															</p>
															{dropdown &&
																<DropdownTask>
																	<ButtonTask
																		w100
																		type="green"
																		onClick={() =>
																			history(
																				`/exam/watch/${item.__id}`
																			)}>
																		Xem, giao
																		bài
																	</ButtonTask>

																	<ButtonTask
																		onClick={() =>
																			history(
																				`/exam/edit/${item.__id}`
																			)}
																		w100
																		type="blue">
																		Sửa đổi
																	</ButtonTask>

																	<ButtonTask
																		w100
																		type="red"
																		onClick={() =>
																			isDel(
																				[
																					!show_popup,
																					item.__title
																				]
																			)}>
																		Xóa
																	</ButtonTask>
																</DropdownTask>}
														</ButtonTask>
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
				: <DelAsk isDel={isDel} name={name} />}
		</Fragment>
	);
}

export default React.memo(TableExam);
