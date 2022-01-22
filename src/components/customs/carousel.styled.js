import styled from "styled-components";
const CarouselComponentCustom = styled.div`
	width: 100%;
	height: ${props => props.height || 0}px;
	position: relative;
	overflow: hidden;
	display: flex;
	justify-content: center;
	align-items: center;
	& * {
		list-style-type: none;
	}
`;

const Button = styled.div`
	cursor: pointer;
	position: absolute;
	top: 50%;
	z-index: 200;
	font-size: 5vh;
	transform: translateY(-50%);
	display: flex;
	justify-content: center;
	align-items: center;
	height: 50%;
	background: rgba(0, 0, 0, 0.3);
	${props => props.position}: 20px;
	& svg {
		fill: lightgray;
	}
`;

const Banners = styled.ol`
	position: absolute;
	left: 50%;
	transform: translateX(-50%);
	bottom: 5px;
	display: grid;
	grid-gap: 10px;
	grid-template-columns: repeat(3, 2rem);
	z-index: 10;
`;

const Banner = styled.li`
	width: 100%;
	height: 5px;
	background-color: ${props => (props.isBanner ? "#fff" : "lightgray")};
`;

export { CarouselComponentCustom, Button, Banners, Banner };
