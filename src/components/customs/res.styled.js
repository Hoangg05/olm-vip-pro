import styled from "styled-components";
import { LoginForm } from "./login.styled";

const RegisterForm = styled(LoginForm)`
    	min-width: 900px;
    	max-width: 900px;
	margin: 50px auto;
`;
const CaptchaForm = styled.div`width: 100%;`;
const CaptchaCode = styled.div`width: 100%;`;
const CaptchaInput = styled.input`
	width: 100%;
	border: none;
	box-shadow: inset 0 0 5px #ccc;
	font-size: 15px;
	padding: 10px;
	border-radius: 5px;
`;
const ReqD = styled.h1`grid-column: 1/3;`;
export { RegisterForm, CaptchaForm, CaptchaCode, CaptchaInput, ReqD };
