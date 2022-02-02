import React, { memo, useEffect, useState } from "react";
import styled from "styled-components";

function SettingsTable({ settings, returnProtect }) {
	const [
		[lock, random_quest, random_answer, remake, show_point],
		setSettings
	] = useState([false, false, false, false, false]);
	useEffect(
		() => {
			returnProtect({
				lock,
				random_quest,
				random_answer,
				remake,
				show_point
			});
		},
		[lock, random_answer, random_quest, remake, returnProtect, show_point]
	);
	return (
		<SettingTable>
			<tbody>
				<tr>
					<td>Khóa bài</td>
					<td>
						<SwitchButton
							onClick={() =>
								setSettings([
									!lock,
									random_quest,
									random_answer,
									remake,
									show_point
								])}>
							<input checked={lock} type="checkbox" />
							<span />
						</SwitchButton>
					</td>
				</tr>
				<tr>
					<td>Câu hỏi xếp ngẫu nhiên</td>
					<td>
						<SwitchButton
							onClick={() =>
								setSettings([
									lock,
									!random_quest,
									random_answer,
									remake,
									show_point
								])}>
							<input checked={random_quest} type="checkbox" />
							<span />
						</SwitchButton>
					</td>
				</tr>
				<tr>
					<td>Đáp án của câu hỏi xếp ngẫu nhiên</td>
					<td>
						<SwitchButton
							onClick={() =>
								setSettings([
									lock,
									random_quest,
									!random_answer,
									remake,
									show_point
								])}>
							<input checked={random_answer} type="checkbox" />
							<span />
						</SwitchButton>
					</td>
				</tr>
				<tr>
					<td>Cho phép làm lại</td>
					<td>
						<SwitchButton
							onClick={() =>
								setSettings([
									lock,
									random_quest,
									random_answer,
									!remake,
									show_point
								])}>
							<input checked={remake} type="checkbox" />
							<span />
						</SwitchButton>
					</td>
				</tr>
				<tr>
					<td>Cho xem điểm sau khi nộp</td>
					<td>
						<SwitchButton
							onClick={() =>
								setSettings([
									lock,
									random_quest,
									random_answer,
									remake,
									!show_point
								])}>
							<input checked={show_point} type="checkbox" />
							<span />
						</SwitchButton>
					</td>
				</tr>
			</tbody>
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

export default memo(SettingsTable);
