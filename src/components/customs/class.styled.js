import styled from "styled-components";

const ClassViewCustom = styled.main`
	width: 100%;
	height: 100%;
	padding: 40px;
`;

const TableProperties = styled.table`
	width: 100%;
	height: 100%;
	border-collapse: collapse;
	& tbody {
		width: 100%;
		height: 100%;
	}
`;

const Column = styled.tr`
	display: grid;
	grid-template-columns: repeat(${({ c }) => c || 5}, 1fr);
	transition: all 1s linear;
	&:hover {
		background-color: #2fa2ff;
		& * {
			color: #fff;
		}
	}
	&:nth-child(1) th {
		color: #ffffff;
		border: none;
		&:nth-child(even) {
			background: #4fc3a1;
		}
		&:nth-child(odd) {
			background: #324960;
		}
	}
`;

const ChildColumn = styled.td`
	text-align: center;
	padding: 8px;
	border: 1px solid #999;
	border-top: none;
	white-space: nowrap;
	max-width: 100%;
	overflow: hidden;
	text-overflow: ellipsis;
`;

const Paginate = styled.tr`
	margin-top: 10px;
	& td {
		width: 100%;
		& ul {
			width: fit-content;
			display: flex;
			justify-content: center;
			align-items: center;
			margin: 0 auto;
			& li {
				padding: 5px 10px;
				width: 100%;
				border: 1px solid #ddd;
			}
		}
	}
`;

const ClassTask = styled.div`
	width: fit-content;
	height: fit-content;
	padding: 15px;
	${({ flex }) =>
		flex
			? `
    display: flex;
    justify-content: center;
    align-items: center;
    `
			: `
	border: 1px solid #ccc;
	border-radius: 10px;
	box-shadow: 5px 5px 10px #999;
    margin: 20px;
    `};
`;

const Button = styled.button`
	padding: 20px;
	border: none;
	white-space: nowrap;
	display: flex;
	justify-content: center;
	align-items: center;
	margin: 0 10px;
	border-radius: 10px;
	font-size: 14px;
	font-weight: bold;
	font-family: "Mulish", sans-serif;
	& svg {
		margin-right: 5px;
	}
`;

export {
	ClassViewCustom,
	TableProperties,
	Column,
	Paginate,
	ChildColumn,
	ClassTask,
	Button
};
