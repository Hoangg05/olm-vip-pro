import styled from "styled-components";

const RenderAllLectures = styled.div`
	padding: 20px;
	border-top: 1px solid #fff;
	display: grid;
	grid-template-columns: repeat(3, 1fr);
	grid-gap: 20px;
`;

const CardLecture = styled.div`
	background: #fff;
	overflow: hidden;
	height: 6rem;
	border-radius: 5px;
	display: flex;
	justify-content: space-between;
	align-items: center;
	position: relative;
	& h4 {
		border-radius: 5px 0 0 5px;
		width: 40%;
		height: 100%;
		background: #0088cc;
		display: grid;
		place-items: center;
		border: 1px solid #fff;
	}
	& a {
		position: absolute;
		bottom: 0;
		right: 0;
		color: #333;
		width: 60%;
		text-align: right;
		background: #fff;
		padding-right: 5px;
	}
`;

const CardSubjects = styled.ul`
	color: #333;
	width: 60%;
	height: 100%;
	padding: 10px;
	padding-bottom: 15px;
	display: flex;
	justify-content: flex-start;
	align-items: flex-start;
	flex-wrap: wrap;
	overflow: auto;
	position: relative;
	&::-webkit-scrollbar {
		width: 0;
	}
`;

const Subject = styled.li`
	padding: 5px;
	border: 1px solid #333;
	width: fit-content;
	border-radius: 5px;
	margin: 5px;
`;

export { RenderAllLectures, CardLecture, CardSubjects, Subject };
