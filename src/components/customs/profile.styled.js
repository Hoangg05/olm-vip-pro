import styled from "styled-components";

const Profile = styled.div`
	width: 100%;
	height: 100%;
	padding: 20px;
`;

const User = styled.div`
	display: flex;
	width: fit-content;
`;

const Information = styled.div`margin-left: 20px;`;

const Name = styled.p`font-size: 3vw;`;

const ChangeImages = styled.label`
	& input {
		display: none;
	}
	& p {
		padding: 10px;
		margin-top: 10px;
		font-size: 14px;
		line-height: 20px;
		text-align: center;
		vertical-align: middle;
		cursor: pointer;
		color: #333;
		background: #e6e6e6;
		text-shadow: 0 1px 1px rgb(255 255 255 / 75%);
		border-radius: 4px;
		box-shadow: inset 0 1px 0 rgb(255 255 255 / 20%),
			0 1px 3px rgb(0 0 0 / 10%);
		white-space: nowrap;
	}
`;

const TableProperties = styled.div`
	display: grid;
	grid-template-columns: repeat(2, 1fr);
	width: fit-content;
	margin-top: 20px;
`;

export { Profile, User, Information, Name, ChangeImages, TableProperties };
