import styled from "styled-components";

const CustomNavbar = styled.ul`
	width: 100%;
	height: 65px;
	padding: 0 5%;
	background-color: #fafafa;
	background-image: linear-gradient(to bottom, #fff5c3, #fff77e);
	background-repeat: repeat-x;
	border: 1px solid #f3ce9c;
	box-shadow: 0 0 3px rgb(0 0 0 / 20%);
	display: flex;
	justify-content: space-between;
	align-items: center;
	position: fixed;
	top: 0;
	left: 0;
	z-index: 100;
	list-style-type: none;
`;

const Part = styled.ul`
	list-style-type: none;
	display: flex;
	align-items: center;
	height: 100%;
	${props => props.icon && "width: 8vw;height: 100%;overflow: hidden;"};
	justify-content: center;
	${props => props.column && "flex-direction: column;width: 100%;"};
	& h4 {
		white-space: nowrap;
	}
	& ul,
	& li {
		height: 100%;
		& a {
			height: 100%;
			display: flex;
			justify-content: center;
			align-items: center;
		}
	}
`;

const PartDropDown = styled.ul`
	position: absolute;
	bottom: 0;
	right: -20px;
	transform: translate(0, 100%);
	display: ${props => (props.isdrop ? "grid" : "none")};
	place-items: center;
	grid-template-columns: repeat(2, 1fr);
	grid-gap: 20px;
	height: fit-content !important;
	padding: 20px;
	border-radius: 4px;
	background-color: #fff;
	border: 1px solid rgba(0, 0, 0, .3);
	border-right-width: 2px;
	border-bottom-width: 2px;
	box-shadow: 0 1px 8px rgb(0 0 0 / 30%);
	& li,
	& a {
		display: inline-block;
		white-space: nowrap;
		padding: 10px 20px;
		width: 100%;
		text-align: center;
		margin: 0;
		&:not(:nth-child(1)) {
			margin-top: 10px;
		}
		&:hover {
			background: #14a76c;
			color: #fff;
		}
	}
	&::before {
		content: "";
		display: inline-block;
		width: 20px;
		height: 10px;
		background: #fff;
		clip-path: polygon(50% 0, 100% 100%, 0 100%);
		position: absolute;
		top: 0;
		right: 20px;
		transform: translate(0, -92%);
	}
`;

const Child = styled.li`
	transition: all .4s linear;
	font-size: ${props => (props.hasIcon ? "3vh" : "16px")};
	margin: 0 10px;
	font-weight: 500;
	white-space: nowrap;
	${props => !props.normal && "text-transform: uppercase"};
	${props =>
		props.hasIcon
			? `
		display: flex;
		justify-content: center;
		align-items: center;
	`
			: false};
	${props =>
		props.isButton &&
		`
			display: inline-block;
			color: #fff;
			font-weight: normal;
			text-transform: none;
			background-repeat: repeat-x;
			width: 98px;
			height: 50px;
			text-align: center;
			cursor: pointer;
			border: 0;
			border-radius: 4px;
			font-size: 16px;
			`};
	background-color: ${props =>
		props.isButton
			? props.role === "login" ? "#5bb75b" : "#006dcc"
			: false};
	background-image: linear-gradient(
		to bottom,
		${props =>
			props.isButton
				? props.role === "login"
					? "#67e32a, #44b20f"
					: "#0088cc,#0044cc"
				: "transparent, transparent"}
	);
	&:hover {
		color: #${props => (props.hasIcon || props.isButton ? "fff" : 900)};
	}
`;

const Icon = styled.img`width: ${props => (props.full ? "100%" : "8vw")};`;

const Avatar = styled.div`
	height: ${props => props.width || "45px"};
	width: ${props => props.height || "45px"};
	border-radius: 5px;
	overflow: hidden;
	display: flex;
	justify-content: center;
	align-items: center;
	background: #fff;
	box-shadow: inset 0 0 5px #555;
`;

const UserConfig = styled.div`
	margin-left: 10px;
	display: flex;
	align-items: center;
	position: relative;
	height: 100%;
	& h4 {
		margin-right: 5px;
	}
`;

export { CustomNavbar, Part, PartDropDown, Child, Icon, Avatar, UserConfig };
