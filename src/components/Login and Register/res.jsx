import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Button, Images, Input, UserInput } from "../customs/login.styled";
import {
	CaptchaForm,
	CaptchaCode,
	CaptchaInput,
	RegisterForm
} from "../customs/res.styled";
import logo from "../images/logo/logo2.png";
import ClientCaptcha from "react-client-captcha";
import { getFirestore, setDoc, doc } from "firebase/firestore";
import {
	createUserWithEmailAndPassword,
	getAuth,
	updateProfile
} from "firebase/auth";
import app from "../../firebase/firebase";

function RegisterComponent(props) {
	const auth = getAuth(app);
	const history = useNavigate();
	const [done, isDone] = useState(false);
	const [captcha, setCaptcha] = useState(null);
	const [[name, username, password, eop, OTP], userInput] = useState([null]);
	const [submit, isSubmit] = useState(false);
	const fs = getFirestore(app);

	useEffect(
		() => {
			if (props.user || done) {
				history("/profile/me");
				window.location.reload();
			}
		},
		[history, props, done]
	);

	const Register = async e => {
		e.preventDefault();
		isSubmit(true);
		const time = new Date().getTime();
		if (OTP === captcha) {
			await createUserWithEmailAndPassword(
				auth,
				`${username}@gmail.com`,
				password
			)
				.then(async () => {
					await updateProfile(auth.currentUser, {
						displayName: name
					})
						.then(async () => {
							await setDoc(
								doc(fs, "users", auth.currentUser.uid),
								{
									displayName: name,
									username,
									avatar: auth.currentUser.photoURL,
									eop,
									timeCreated: time,
									role: "student",
									vip: {
										__value: false,
										__time: {
											__buyAt: null,
											__endAt: null
										},
										__package: {
											__name: null
										}
									},
									uid: auth.currentUser.uid,
									__class: {
										__all: [],
										__has__class: false
									}
								}
							)
								.then(() => {
									isDone(true);
								})
								.catch(e => {
									toast.warn("Lỗi đã xảy ra 🙀");
								});
						})
						.catch(() => {
							isSubmit(false);
						});
					isSubmit(false);
				})
				.catch(err => {
					const code = err.code;
					switch (code) {
						case "auth/email-already-in-use":
							toast.warn("Tài khoản này đã tồn tại.");
							break;
						case "auth/weak-password":
							toast.warn(
								"Mật khẩu quá yếu. Tối thiểu cần độ dài từ 6 trở lên."
							);
							break;
						default:
							toast.warn(
								"Lỗi không xác định. Vui lòng thử lại sau !"
							);
							break;
					}
					isSubmit(false);
				});
		} else {
			toast.warn("Sai mã xác nhận, vui lòng nhập lại !");
			isSubmit(false);
		}
		console.clear();
	};

	return (
		<RegisterForm onSubmit={e => Register(e)}>
			<Images src={logo} />
			<div>
				<h1>Đăng ký</h1>
				<UserInput place="left">
					<Input htmlFor="name">
						<p>Tên của bạn</p>
						<input
							required
							type="text"
							id="name"
							autoComplete="off"
							onChange={e =>
								userInput([
									e.target.value,
									username,
									password,
									eop,
									OTP
								])}
						/>
					</Input>
					<Input htmlFor="username">
						<p>Tài khoản</p>
						<input
							required
							type="text"
							id="username"
							autoComplete="off"
							onChange={e => {
								e.target.value = e.target.value.replace(
									" ",
									""
								);
								userInput([
									name,
									e.target.value,
									password,
									eop,
									OTP
								]);
							}}
						/>
					</Input>
					<Input htmlFor="password">
						<p>Mật khẩu</p>
						<input
							required
							type="password"
							id="password"
							placeholder={"******"}
							onChange={e =>
								userInput([
									name,
									username,
									e.target.value,
									eop,
									OTP
								])}
						/>
					</Input>
					<Input htmlFor="eop">
						<p>Email hoặc SĐT</p>
						<input
							required
							type="text"
							id="eop"
							placeholder={"Nhập bố láo là xóa tài khoản ;)"}
							onChange={e =>
								userInput([
									name,
									username,
									password,
									e.target.value,
									OTP
								])}
						/>
					</Input>
					<CaptchaForm>
						<Input htmlFor="OTP">
							<p>Mã xác nhận</p>
							<CaptchaInput
								required
								id="OTP"
								onChange={e =>
									userInput([
										name,
										username,
										password,
										eop,
										e.target.value
									])}
							/>
						</Input>
						<CaptchaCode>
							<ClientCaptcha
								retry={false}
								captchaCode={code => setCaptcha(code)}
							/>
						</CaptchaCode>
					</CaptchaForm>
					<div>
						<Button
							background="#0088cc 0%, #0044cc 100%"
							type="submit"
							value="Đăng kí"
							disabled={submit}
						/>
						hoặc
						<Button
							background="#67e32a 0%, #44b20f 100%"
							as="a"
							href="/register">
							Đăng nhập
						</Button>
					</div>
				</UserInput>
			</div>
		</RegisterForm>
	);
}

export default RegisterComponent;
