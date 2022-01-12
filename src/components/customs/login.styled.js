import styled from "styled-components";

const LoginForm = styled.form`
	border-radius: 10px;
	box-shadow: 0 0 15px #666;
	margin: auto;
	padding: 25px;
	width: 50vw;
	display: grid;
	place-items: center;
	grid-template-columns: 1fr 3fr;
	& h1 {
		text-transform: uppercase;
		text-align: center;
		margin-bottom: 20px;
		font-size: 2.5vw;
	}
`;

const UserInput = styled.div`
	display: flex;
	align-items: ${props => (props.place ? "flex-start" : "center")};
	justify-content: center;
	flex-direction: column;
`;

const Input = styled.label`
	width: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
	margin: 10px;
	& input {
		width: 100%;
		border: none;
		box-shadow: inset 0 0 5px #ccc;
		font-size: 15px;
		padding: 10px;
		border-radius: 5px;
	}
	& p {
		white-space: nowrap;
		margin-right: 10px;
	}
`;

const Forgot = styled.a`
	display: flex;
	justify-content: center;
	align-items: center;
	margin-bottom: 10px;
	& svg {
		margin-right: 5px;
	}
`;

const Images = styled.img`
	width: 100%;
	padding: 15px;
`;

const Button = styled.input`
	border: none;
	padding: 10px 20px;
	font-size: 15px;
	color: #fff;
	font-family: "Mulish", sans-serif;
	font-weight: bold;
	background: linear-gradient(to bottom, ${props => props.background});
	border-radius: 5px;
	margin: 10px;
	white-space: nowrap;
	&:disabled {
		background: #ccc;
	}
`;

export { LoginForm, UserInput, Images, Input, Forgot, Button };
