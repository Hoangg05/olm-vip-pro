import React from "react";
import styled from "styled-components";
import ContainerComponent from "./Container/main";
import FilterLectures from "./filter lectures by class/filter";
import CarouselComponent from "./carousel/carousel";
import NewInDayComponent from "./NewInDay/_new_";

function HomeComponent() {
	return (
		<CustomHome>
			<CarouselComponent />
			<NewInDayComponent />
			<FilterLectures />
			<ContainerComponent />
		</CustomHome>
	);
}

const CustomHome = styled.main`
	font-weight: bold;
	width: 85%;
	margin: 10px auto;
`;

export default HomeComponent;
