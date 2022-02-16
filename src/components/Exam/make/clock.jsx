import moment from "moment";
import React, { memo, useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { HandleContext } from "../../../Context";

function ClockComponent({ end, isEnd, currentTime }) {
	const { isHideNav } = useContext(HandleContext);
	const [time, setTime] = useState(null);
	useEffect(
		() => {
			isHideNav(true);
			let interval;
			if (!end) {
				interval = setInterval(() => {
					if (end) {
						clearInterval(interval);
					} else {
						setTime(new Date().getTime());
					}
				}, 1000);
			}
			return () => !end && clearInterval(interval);
		},
		[isHideNav, end]
	);

	useEffect(
		() => {
			if (currentTime !== null && currentTime - time <= 0) {
				isEnd(true);
				isHideNav(false);
			}
		},
		[currentTime, isEnd, isHideNav, time]
	);

	const CalculateTime = () => {
		if (currentTime !== null) {
			const diffTime = currentTime - time;
			let duration = moment.duration(diffTime, "milliseconds");
			return `Thời gian còn lại: ${duration.years() < 10
				? `0${duration.years()}`
				: duration.years()}<sup>năm</sup> : ${duration.months() < 10
				? `0${duration.months()}`
				: duration.months()}<sup>tháng</sup> : ${duration.days() < 10
				? `0${duration.days()}`
				: duration.days()}<sup>ngày</sup> : ${duration.hours() < 10
				? `0${duration.hours()}`
				: duration.hours()}<sup>giờ</sup> : ${duration.minutes() < 10
				? `0${duration.minutes()}`
				: duration.minutes()}<sup>phút</sup> : ${duration.seconds() < 10
				? `0${duration.seconds()}`
				: duration.seconds()}<sup>giây</sup>`;
		} else {
			return "Bài thi không giới hạn thời gian";
		}
	};

	return (
		<ClockStyle>
			<h4 dangerouslySetInnerHTML={{ __html: CalculateTime() }} />
		</ClockStyle>
	);
}

const ClockStyle = styled.div`
	top: 0;
	left: 0;
	width: 100%;
	height: 60px;
	background: lightgoldenrodyellow;
	position: fixed;
	display: flex;
	justify-content: center;
	align-items: center;
`;

export default memo(ClockComponent);
