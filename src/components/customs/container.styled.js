import styled from "styled-components";

const Container = styled.main`
	margin: 20px 0;
	padding-bottom: 20px;
	width: 100%;
	display: grid;
	grid-gap: 20px;
	grid-template-columns: repeat(2, 1fr);
`;

const Card = styled.div`
	width: 100%;
	height: fit-content;
	border-radius: 10px 10px 0 0;
	overflow: hidden;
	& a h4 {
		width: 100%;
		${props => {
			switch (props.color) {
				case "green":
					return `color: #4f8601;
				background: linear-gradient(to top, #99fa09 0% , #efffc7 100%);
				`;

				case "pink":
					return `color: #d10080;
				background: linear-gradient(to top, #FF80D6 0%, #FFE8F6 100%);
				`;
				case "blue":
					return `color: #0077a7;
				background: linear-gradient(to top, #62D5FF 0%,#CDEFFF 100%);
				`;
				default:
					return;
			}
		}};
		${({ custom }) => custom || false};
		text-shadow: 0 1px 1px #fff;
		padding: 20px 0;
		font-size: 3vh;
		text-align: center;
	}
	@media screen and (max-width: 900px) {
		grid-column: 1/3;
	}
`;

const LargeCard = styled(Card)`
	grid-column: 1/3;
`;

const List = styled.ul`
	max-height: 40em;
	overflow: auto;
	display: flex;
	align-items: center;
	justify-content: flex-start;
	flex-direction: column;
	border: 1px solid #ccc;
	padding: 10px;
	&::-webkit-scrollbar {
		width: 5px;
		&-thumb {
			background: #ddd;
		}
	}
	& a {
		color: blue;
	}
`;

const Post = styled.li`
	padding: 0 10px;
	width: 100%;
	margin: 10px 0;
	display: flex;
	${({ hasImageQuestion }) =>
		hasImageQuestion
			? `
	justify-content: center;
	align-items: flex-start;
	`
			: `
	justify-content: center;
	align-items: center;
	`};
	transition: all .5s linear;
	&:hover {
		box-shadow: 5px 5px 10px #ccc;
	}
`;

const Avatar = styled.div`
	min-width: 65px;
	min-height: 65px;
	max-width: 65px;
	max-height: 65px;
	display: flex;
	justify-content: center;
	align-items: center;
	${({ hasImageQuestion, p }) => hasImageQuestion && `margin-top: ${p}px`};
	margin-right: 10px;
	border-radius: 5px;
	box-shadow: inset 0 0 10px #ccc;
	& img {
		width: 100%;
	}
`;

const Question = styled.div`padding: 10px;`;

const Username = styled.h4`
	font-weight: 500;
	font-family: "Poppins", sans-serif;
`;

const Quest = styled.p`
	margin: 5px 0;
	padding: 0 5px;
	color: #888;
	& img {
		width: 10vw;
	}
`;

const Answer = styled.p`
	float: right;
	color: lightgreen;
`;

export {
	Container,
	Card,
	LargeCard,
	List,
	Post,
	Avatar,
	Question,
	Username,
	Quest,
	Answer
};
