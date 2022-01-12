import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
	Button,
	Forgot,
	Images,
	Input,
	LoginForm,
	UserInput
} from "../customs/login.styled";
import logo from "../images/logo/logo2.png";
import { BsQuestionCircleFill } from "react-icons/bs";
import { toast } from "react-toastify";
import { signInWithEmailAndPassword } from "firebase/auth";
import * as enc from "crypto-js/enc-utf8";

function LoginComponent(props) {
	const user = JSON.parse(
		props.Base64.decrypt(props.userEncode, "hoangyuri").toString(enc)
	);
	const history = useNavigate();
	const [submit, isSubmit] = useState(false);
	const [[username, password], userInput] = useState([null]);
	useEffect(
		() => {
			let c = false;
			if (user && !c) history("/profile/me");
			return () => {
				c = true;
			};
		},
		[history, user]
	);

	const Login = async e => {
		e.preventDefault();
		isSubmit(true);
		try {
			await signInWithEmailAndPassword(
				props.auth,
				`${username}@gmail.com`,
				password
			);
			isSubmit(true);
		} catch (error) {
			isSubmit(true);
			const code = error.code;
			const mes = error.message;
			if (mes) {
				switch (code) {
					case "auth/user-not-found":
						toast.warn("Sai tên người dùng");
						break;

					case "auth/wrong-password":
						toast.warn("Sai mật khẩu");
						break;

					default:
						toast.warn("Có lỗi không xác định !!");
						break;
				}
				console.clear();
			}
			isSubmit(false);
		}
	};

	return (
		<LoginForm onSubmit={e => Login(e)}>
			<Images src={logo} />
			<div>
				<h1>Đăng nhập</h1>
				<UserInput>
					<Input htmlFor="username">
						<p>Tài khoản</p>
						<input
							required
							type="text"
							id="username"
							autoComplete="off"
							onChange={e =>
								userInput([e.target.value, password])}
						/>
					</Input>
					<Input htmlFor="password">
						<p>Mật khẩu</p>
						<input
							required
							type="password"
							id="password"
							onChange={e =>
								userInput([username, e.target.value])}
						/>
					</Input>
					<Forgot href="/forgot-password">
						<BsQuestionCircleFill />
						Quên mật khẩu
					</Forgot>
					<div>
						<Button
							background="#67e32a 0%, #44b20f 100%"
							type="submit"
							disabled={submit}
							value="Đăng nhập"
						/>
						hoặc
						<Button
							background="#0088cc 0%, #0044cc 100%"
							as="a"
							href="/register">
							Đăng kí
						</Button>
					</div>
				</UserInput>
			</div>
		</LoginForm>
	);
}

export default LoginComponent;
