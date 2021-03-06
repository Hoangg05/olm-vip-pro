import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
	Button,
	Images,
	Input,
	UserInput,
	InputGroup
} from "../customs/login.styled";
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
									photoURL: auth.currentUser.photoURL,
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
									toast.warn("L???i ???? x???y ra ????");
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
							toast.warn("T??i kho???n n??y ???? t???n t???i.");
							break;
						case "auth/weak-password":
							toast.warn(
								"M???t kh???u qu?? y???u. T???i thi???u c???n ????? d??i t??? 6 tr??? l??n."
							);
							break;
						default:
							toast.warn(
								"L???i kh??ng x??c ?????nh. Vui l??ng th??? l???i sau !"
							);
							break;
					}
					isSubmit(false);
				});
		} else {
			toast.warn("Sai m?? x??c nh???n, vui l??ng nh???p l???i !");
			isSubmit(false);
		}
		console.clear();
	};

	return (
		<RegisterForm onSubmit={e => Register(e)}>
			<Images src={logo} />
			<div>
				<h1>????ng k??</h1>
				<UserInput>
					<Input htmlFor="name">
						<InputGroup>
							<p>T??n c???a b???n</p>
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
						</InputGroup>
					</Input>
					<Input htmlFor="username">
						<InputGroup>
							<p>T??i kho???n</p>
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
						</InputGroup>
					</Input>
					<Input htmlFor="password">
						<InputGroup>
							<p>M???t kh???u</p>
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
						</InputGroup>
					</Input>

					<Input htmlFor="eop">
						<InputGroup>
							<p>Email ho???c S??T</p>
							<input
								required
								type="text"
								id="eop"
								placeholder={"Nh???p b??? l??o l?? x??a t??i kho???n ;)"}
								onChange={e =>
									userInput([
										name,
										username,
										password,
										e.target.value,
										OTP
									])}
							/>
						</InputGroup>
					</Input>

					<CaptchaForm>
						<Input htmlFor="OTP" m0>
							<InputGroup>
								<p>M?? x??c nh???n</p>
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
							</InputGroup>
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
							value="????ng k??"
							disabled={submit}
						/>
						ho???c
						<Button
							background="#67e32a 0%, #44b20f 100%"
							as="a"
							href="/register">
							????ng nh???p
						</Button>
					</div>
				</UserInput>
			</div>
		</RegisterForm>
	);
}

export default React.memo(RegisterComponent);
