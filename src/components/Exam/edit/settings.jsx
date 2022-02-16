import React, { memo, useEffect, useState } from "react";
import styled from "styled-components";
import { toast } from "react-toastify";

function SettingsTable({ settings, returnProtect }) {
	const [
		[
			lock,
			random_quest,
			random_answer,
			remake,
			show_point,
			resize,
			exit,
			time_close,
			can_error,
			max_error_accept
		],
		setSettings
	] = useState([null, null, null, null, null, null, null, null, null, null]);
	const [newTime, setNewTime] = useState(null);

	const [hasSet, isSet] = useState(false);

	useEffect(
		() => {
			if (settings && !hasSet) {
				setSettings([
					settings.__lock,
					settings.__random__quest,
					settings.__random__answer,
					settings.__remake,
					settings.__show_point,
					settings.__resize,
					settings.__exit,
					settings.time_close ? true : false,
					settings.__can_error,
					settings.__max_error_accept
				]);
				setNewTime(settings.time_close);
				isSet(true);
			}
			returnProtect({
				lock,
				random_quest,
				random_answer,
				remake,
				show_point,
				exit,
				resize,
				time_close,
				newTime,
				can_error,
				max_error_accept:
					max_error_accept === null ||
					max_error_accept === "" ||
					max_error_accept === undefined
						? 3
						: parseInt(max_error_accept)
			});
		},
		[
			exit,
			hasSet,
			lock,
			random_answer,
			random_quest,
			remake,
			resize,
			returnProtect,
			settings,
			show_point,
			time_close,
			newTime,
			can_error,
			max_error_accept
		]
	);

	function handleTimePick(e) {
		const timeGet = new Date(e.target.value).getTime();
		setNewTime(timeGet);
	}

	function TimeHasPickBefore() {
		const __date = settings.time_close
			? new Date(settings.time_close)
			: new Date();
		const __year = __date.getFullYear();
		const __month = __date.getMonth() + 1;
		const __day = __date.getDate();
		const __hour = __date.getHours();
		const __min = __date.getMinutes();
		const __date_start = `${__year}-${__month < 10
			? "0" + __month
			: __month}-${__day < 10 ? "0" + __day : __day}T${__hour < 10
			? "0" + __hour
			: __hour}:${__min < 10 ? "0" + __min : __min}`;
		return __date_start;
	}

	function TimePickConvert() {
		const __date = newTime ? new Date(newTime) : new Date();
		const __year = __date.getFullYear();
		const __month = __date.getMonth() + 1;
		const __day = __date.getDate();
		const __hour = __date.getHours();
		const __min = __date.getMinutes();
		const __date_start = `${__year}-${__month < 10
			? "0" + __month
			: __month}-${__day < 10 ? "0" + __day : __day}T${__hour < 10
			? "0" + __hour
			: __hour}:${__min < 10 ? "0" + __min : __min}`;
		return __date_start;
	}

	return (
		<SettingTable>
			{hasSet &&
				<tbody>
					<tr>
						<td>Khóa bài</td>
						<td>
							<SwitchButton>
								<input
									checked={lock || false}
									onChange={() =>
										setSettings([
											!lock,
											random_quest,
											random_answer,
											remake,
											show_point,
											resize,
											exit,
											time_close,
											can_error,
											max_error_accept
										])}
									type="checkbox"
								/>
								<span />
							</SwitchButton>
						</td>
					</tr>
					<tr>
						<td>Câu hỏi xếp ngẫu nhiên</td>
						<td>
							<SwitchButton>
								<input
									onChange={() =>
										setSettings([
											lock,
											!random_quest,
											random_answer,
											remake,
											show_point,
											resize,
											exit,
											time_close,
											can_error,
											max_error_accept
										])}
									checked={random_quest || false}
									type="checkbox"
								/>
								<span />
							</SwitchButton>
						</td>
					</tr>
					<tr>
						<td>Đáp án của câu hỏi xếp ngẫu nhiên</td>
						<td>
							<SwitchButton>
								<input
									onChange={() =>
										setSettings([
											lock,
											random_quest,
											!random_answer,
											remake,
											show_point,
											resize,
											exit,
											time_close,
											can_error,
											max_error_accept
										])}
									checked={random_answer || false}
									type="checkbox"
								/>
								<span />
							</SwitchButton>
						</td>
					</tr>
					<tr>
						<td>Cho phép làm lại</td>
						<td>
							<SwitchButton>
								<input
									onChange={() =>
										setSettings([
											lock,
											random_quest,
											random_answer,
											!remake,
											show_point,
											resize,
											exit,
											time_close,
											can_error,
											max_error_accept
										])}
									checked={remake || false}
									type="checkbox"
								/>
								<span />
							</SwitchButton>
						</td>
					</tr>
					<tr>
						<td>Cho xem điểm sau khi nộp</td>
						<td>
							<SwitchButton>
								<input
									onChange={() =>
										setSettings([
											lock,
											random_quest,
											random_answer,
											remake,
											!show_point,
											resize,
											exit,
											time_close,
											can_error,
											max_error_accept
										])}
									checked={show_point || false}
									type="checkbox"
								/>
								<span />
							</SwitchButton>
						</td>
					</tr>
					<tr>
						<td>Cho phép thay đổi kích thước màn hình</td>
						<td>
							<SwitchButton>
								<input
									onChange={() =>
										setSettings([
											lock,
											random_quest,
											random_answer,
											remake,
											show_point,
											!resize,
											exit,
											time_close,
											can_error,
											max_error_accept
										])}
									checked={resize || false}
									type="checkbox"
								/>
								<span />
							</SwitchButton>
						</td>
					</tr>
					<tr>
						<td>Cho phép thoát khỏi màn hình làm bài</td>
						<td>
							<SwitchButton>
								<input
									onChange={() =>
										setSettings([
											lock,
											random_quest,
											random_answer,
											remake,
											show_point,
											resize,
											!exit,
											time_close,
											can_error,
											max_error_accept
										])}
									checked={exit || false}
									type="checkbox"
								/>
								<span />
							</SwitchButton>
						</td>
					</tr>
					<tr>
						<td>Giới hạn thời gian làm bài</td>
						<td>
							<SwitchButton>
								<input
									onChange={() =>
										setSettings([
											lock,
											random_quest,
											random_answer,
											remake,
											show_point,
											resize,
											exit,
											!time_close,
											can_error,
											max_error_accept
										])}
									checked={time_close || false}
									type="checkbox"
								/>
								<span />
							</SwitchButton>
						</td>
					</tr>
					{time_close &&
						<tr>
							<td>Thời gian giới hạn làm bài</td>
							<td>
								<InputCustom
									onChange={handleTimePick}
									min={TimeHasPickBefore()}
									value={TimePickConvert()}
									type="datetime-local"
								/>
							</td>
						</tr>}

					<tr>
						<td>Vi phạm lỗi đủ số lần thoát bài</td>
						<td>
							<SwitchButton>
								<input
									onChange={() =>
										setSettings([
											lock,
											random_quest,
											random_answer,
											remake,
											show_point,
											resize,
											exit,
											time_close,
											!can_error,
											max_error_accept
										])}
									checked={can_error || false}
									type="checkbox"
								/>
								<span />
							</SwitchButton>
						</td>
					</tr>
					{can_error &&
						<tr>
							<td>Số lần vi phạm lỗi cho phép</td>
							<td>
								<InputCustom
									type="number"
									min="3"
									value={max_error_accept}
									onChange={e => {
										const re = /^[0-9\b]+$/;
										if (
											e.target.value === "" ||
											re.test(e.target.value)
										) {
											if (parseInt(e.target.value) < 3)
												toast.warn(
													"Khuyến cáo nên để tối thiểu là 3."
												);
											setSettings([
												lock,
												random_quest,
												random_answer,
												remake,
												show_point,
												resize,
												exit,
												time_close,
												can_error,
												e.target.value
											]);
										}
									}}
								/>
							</td>
						</tr>}
				</tbody>}
		</SettingTable>
	);
}

const SettingTable = styled.table`
	border-collapse: collapse;
	border-spacing: 0;
	width: 100%;
	border: 1px solid #ddd;
	margin-bottom: 20px;
	& td {
		padding: 10px;
		border: 1px solid #ddd;
		&:nth-child(2) {
			display: grid;
			place-items: center;
		}
	}
`;

const SwitchButton = styled.label`
	position: relative;
	display: inline-block;
	width: 60px;
	height: 34px;

	& input {
		opacity: 0;
		width: 0;
		height: 0;
		&:checked + span {
			background-color: #2196f3;
			&:before {
				transform: translateX(26px);
			}
		}
		&:focus + span {
			box-shadow: 0 0 1px #2196f3;
		}
	}
	& span {
		position: absolute;
		cursor: pointer;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background-color: #ccc;
		transition: 0.4s;
		border-radius: 34px;
		&:before {
			position: absolute;
			content: "";
			height: 26px;
			width: 26px;
			left: 4px;
			bottom: 4px;
			background-color: white;
			transition: 0.4s;
			border-radius: 50%;
		}
	}
`;

const InputCustom = styled.input`
	width: 100%;
	height: 34px;
	border: 1px solid #ddd;
	border-radius: 4px;
	padding: 0 10px;
	&:focus {
		outline: none;
	}
`;

export default memo(SettingsTable);
