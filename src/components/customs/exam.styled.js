import styled from "styled-components";

const ButtonTask = styled.li`
	font-family: "Mulish", sans-serif;
	font-weight: 500;
	font-size: 15px;
	display: inline-block;
	padding: 8px 12px;
	line-height: 20px;
	text-align: center;
	vertical-align: middle;
	cursor: pointer;
	border: 1px solid #ccc;
	border-bottom-color: #b3b3b3;
	border-radius: 4px;
	box-shadow: inset 0 1px 0 rgb(255 255 255 / 20%), 0 1px 3px rgb(0 0 0 / 10%);
	white-space: nowrap;
	color: #555;
	position: relative;
	${props =>
		!props.m0 &&
		`
	margin: 10px;
	`} ${props => {
		if (props.type) {
			switch (props.type) {
				case "blue":
					return `
					background: linear-gradient(to bottom,#0088cc,#0044cc);
					color: #fff;`;
				case "red":
					return `
					background: linear-gradient(to bottom,#ff6646,#eb0000);
					color: #fff;`;
				case "green":
					return `
					background: linear-gradient(to bottom,#67e32a,#44b20f);
					color: #fff;`;
				default:
					return false;
			}
		} else {
			return "background: linear-gradient(to bottom, #ffffff, #e6e6e6);";
		}
	}};

	& p {
		display: flex;
		justify-content: center;
		align-items: center;

		& svg {
			font-size: 24px;
		}
	}

	${props => props.w100 && "width: 100%;"};
`;

const DropdownTask = styled.ul`
	position: absolute;
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;
	left: 50%;
	bottom: -10px;
	transform: translate(-50%, 100%);
	padding: 20px;
	border-radius: 5px;
	z-index: 1000;
	background-color: #fff;
	border: 1px solid #c3c3c3;
	box-shadow: 0 1px 8px rgb(0 0 0 / 30%);
	& button {
		margin: 5px 0;
		width: 100%;
	}
`;

const PopUpParent = styled.div`
	margin: auto;
	width: 100%;
	height: 100%;
	padding: 15px;
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;
	& * {
		text-align: center;
	}
`;

const CreateCustomComponent = styled.div`
	display: block;
	width: 100%;
	height: 100%;
`;

const CreateFormExam = styled(CreateCustomComponent)`
	padding: 0 38px;
	& * {
		margin: 8px 0;
	}
	& input {
		transition: 1s linear;
		width: 100%;
		align-items: center;
		border-radius: 4px;
		background-color: hsl(0, 0%, 100%);
		border: 1px solid hsl(0, 0%, 80%);
		min-height: 45px;
		position: relative;
		padding: 2px 8px;
		font-size: 16px;
		&[type="submit"]:hover {
			background-color: #7289da;
			color: #fff;
		}
	}
`;

const MakeExam = styled.div`
	position: relative;
	display: block;
`;

export {
	ButtonTask,
	DropdownTask,
	PopUpParent,
	CreateCustomComponent,
	CreateFormExam,
	MakeExam
};
