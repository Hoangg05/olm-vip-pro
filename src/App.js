import React, { Fragment, useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import styled from "styled-components";
import HomeComponent from "./components/HomeScreen/_home_";
import app from "./firebase/firebase";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import Navbar from "./components/Navbar/nav";
import LoginComponent from "./components/Login and Register/login";
import E404 from "./components/404/404";
import { ToastContainer } from "react-toastify";
import LoadingScreen from "./loading_screen";
import RegisterComponent from "./components/Login and Register/res";
import ProfileComponent from "./components/profile/profile";
import * as Base64 from "crypto-js/aes";
import * as enc from "crypto-js/enc-utf8";
import FooterComponent from "./components/Footer/footer";
import ClassComponent from "./components/Class/class";
import {
	collection,
	query,
	where,
	onSnapshot,
	getFirestore
} from "firebase/firestore";
import MainScreenExam from "./components/Exam/main";

function MainComponent() {
	const auth = getAuth(app);
	const fs = getFirestore(app);
	const [h, _h_] = useState(0);
	const [[user, data], setUser] = useState([null, null]);
	const [dropdown, isDrop] = useState(false);
	const [id, setID] = useState(null);
	// const [[exit, resize], cheat] = useState([false, false]);
	const [load, isLoad] = useState(true);
	useEffect(
		() => {
			let c = false;
			if (!c && !data) {
				onAuthStateChanged(auth, u => {
					if (u) setUser([u, data]);
					else setUser([null, data]);
					isLoad(false);
				});

				if (user && id) {
					const q = query(
						collection(fs, "users"),
						where("uid", "==", id)
					);
					if (q) {
						onSnapshot(q, d => {
							setUser([user, d.docs[0].data()]);
						});
					}
				}
			}

			return () => (c = true);

			// window.addEventListener("visibilitychange", () => {
			// 	cheat([document.visibilityState === "hidden", resize]);
			// });

			// window.addEventListener(
			// 	"resize",
			// 	() => {
			// 		cheat([exit, true]);
			// 	},
			// 	true
			// );
		},
		[auth, user, data, fs, id]
	);

	return (
		<BODY
			h={h}
			onClick={() => {
				if (dropdown) isDrop(false);
			}}>
			<ToastContainer />
			{!load
				? <Fragment>
						<Navbar
							userEncode={Base64.encrypt(
								JSON.stringify(user),
								"hoangyuri"
							).toString()}
							isDrop={isDrop}
							dropdown={dropdown}
							Base64={Base64}
							enc={enc}
						/>
						<BrowserRouter>
							<Routes>
								<Route
									path="/"
									exact
									element={<HomeComponent />}
								/>
								<Route
									path="/login"
									exact
									element={
										<LoginComponent
											Base64={Base64}
											userEncode={Base64.encrypt(
												JSON.stringify(user),
												"hoangyuri"
											).toString()}
											auth={auth}
										/>
									}
								/>
								<Route
									path="/register"
									exact
									element={
										<RegisterComponent
											Base64={Base64}
											userEncode={Base64.encrypt(
												JSON.stringify(user),
												"hoangyuri"
											).toString()}
										/>
									}
								/>
								<Route
									path="/profile/:id"
									exact
									element={
										<Fragment>
											{user
												? <ProfileComponent
														Base64={Base64}
														userEncode={Base64.encrypt(
															JSON.stringify(
																user.uid
															),
															"hoangyuri"
														).toString()}
														dataUserEncode={Base64.encrypt(
															JSON.stringify(data),
															"hoangyuri"
														).toString()}
														setID={setID}
													/>
												: <E404 />}
										</Fragment>
									}
								/>
								<Route
									path="/my-class"
									exact
									element={
										<Fragment>
											{user
												? <ClassComponent
														Base64={Base64}
														userEncode={Base64.encrypt(
															JSON.stringify(user),
															"hoangyuri"
														).toString()}
														dataUserEncode={Base64.encrypt(
															JSON.stringify(data),
															"hoangyuri"
														).toString()}
														setID={setID}
													/>
												: <E404 />}
										</Fragment>
									}
								/>
								<Route
									path="/exam/*"
									exact
									element={user ? <MainScreenExam /> : <E404 />}
								/>
								<Route path="/*" element={<E404 />} />
							</Routes>
						</BrowserRouter>
						<FooterComponent heightReturn={_h_} />
					</Fragment>
				: <LoadingScreen />}
		</BODY>
	);
}

const BODY = styled.div`
	background: ${props => props.background || "#fff"};
	width: 100%;
	height: 92vh;
	display: grid;
	align-items: baseline;
	grid-template-rows: 1fr auto;
`;

export default MainComponent;
