import React, { useEffect, useState } from "react";
import {
	Filter,
	FilterChild,
	FilterComponentCustom
} from "../../customs/filter.styled";
import { RenderAllLectures } from "../../customs/render.styled";
import RenderLectures from "./render";

function FilterLectures() {
	const data_in_local = JSON.parse(localStorage.getItem("class pick"));
	const [classPick, setClassPick] = useState(
		data_in_local ? data_in_local : []
	);
	const all_class = [...Array(12).keys()].map(item => item + 1); // 12 class //
	useEffect(
		() => {
			localStorage.setItem("class pick", JSON.stringify(classPick));
		},
		[classPick, data_in_local]
	);
	return (
		<FilterComponentCustom>
			<h2>Tìm bài giảng</h2>
			<Filter>
				{all_class.map((item, index) =>
					<FilterChild
						key={index}
						is_active={classPick.find(
							classWasPick => classWasPick === item
						)}>
						<input
							type="checkbox"
							onClick={() =>
								setClassPick(
									prev =>
										!prev.find(c => c === item)
											? [...prev, item]
											: prev.filter(i => i !== item)
								)}
							defaultChecked={classPick.find(
								classWasPick => classWasPick === item
							)}
							id={`lớp ${item}`}
						/>
						<label htmlFor={`lớp ${item}`}>
							Lớp {item}
						</label>
					</FilterChild>
				)}
			</Filter>
			<RenderAllLectures>
				{classPick.length > 0 &&
					classPick
						.sort((a, b) => a - b)
						.map((item, index) =>
							<RenderLectures
								key={index}
								index={index}
								class={item}
							/>
						)}
			</RenderAllLectures>
		</FilterComponentCustom>
	);
}

export default FilterLectures;
