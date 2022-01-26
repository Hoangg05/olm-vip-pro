import React, { Fragment, useContext, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import styled from "styled-components";
import HomeComponent from "./components/HomeScreen/_home_";
import Navbar from "./components/Navbar/nav";
import LoginComponent from "./components/Login and Register/login";
import E404 from "./components/404/404";
import { ToastContainer } from "react-toastify";
import LoadingScreen from "./loading_screen";
import RegisterComponent from "./components/Login and Register/res";
import ProfileComponent from "./components/Profile/profile";
import FooterComponent from "./components/Footer/footer";
import ClassComponent from "./components/Class/class";
import MainScreenExam from "./components/Exam/main";
import { motion, AnimatePresence } from "framer-motion";
import { HandleContext } from "./Context";
// import disableDevtool from "disable-devtool";

const transitionRouter = {
	in: {
		opacity: 1,
		x: 0
	},
	out: {
		opacity: 0,
		x: "-100%"
	}
};

const transitionStyles = {
	type: "easeIn",
	case: "anticipate",
	duration: 3
};

function MainComponent() {
	const [h, _h_] = useState(0);
	const [dropdown, isDrop] = useState(false);

	// disableDevtool({
	// 	url:
	// 		"http://fdvn.vn/gian-lan-trong-thi-cu-bi-phat-nhu-the-nao/#:~:text=Hành%20vi%20gian%20lận%20trong,người%20học%20không%20được%20làm.&text=Phạt%20tiền%20từ%202.000.000,chấm%20thi%2C%20phục%20vụ%20thi."
	// });

	const { user_data_login, load } = useContext(HandleContext);
	return (
		<BODY
			h={h}
			onClick={() => {
				if (dropdown) isDrop(false);
			}}>
			<ToastContainer />
			{!load
				? <Fragment>
						<BrowserRouter>
							<AnimatePresence>
								<Navbar
									key={0}
									isDrop={isDrop}
									dropdown={dropdown}
								/>
								<Routes>
									<Route
										path="/"
										exact
										element={
											<Fragment>
												<motion.div
													transition={transitionStyles}
													className="chi_don_gian_la_animation_element._."
													initial="out"
													animate="in"
													exit="out"
													variants={transitionRouter}>
													<HomeComponent />
												</motion.div>
											</Fragment>
										}
									/>
									<Route
										path="/login"
										exact
										element={
											<Fragment>
												<motion.div
													transition={transitionStyles}
													className="chi_don_gian_la_animation_element._."
													initial="out"
													animate="in"
													exit="out"
													variants={transitionRouter}>
													<LoginComponent />
												</motion.div>
											</Fragment>
										}
									/>
									<Route
										path="/register"
										exact
										element={
											<Fragment>
												<motion.div
													transition={transitionStyles}
													className="chi_don_gian_la_animation_element._."
													initial="out"
													animate="in"
													exit="out"
													variants={transitionRouter}>
													<RegisterComponent />
												</motion.div>
											</Fragment>
										}
									/>
									<Route
										path="/profile/:id"
										exact
										element={
											<Fragment>
												{user_data_login
													? <motion.div
															transition={
																transitionStyles
															}
															className="chi_don_gian_la_animation_element._."
															initial="out"
															animate="in"
															exit="out"
															variants={
																transitionRouter
															}>
															<ProfileComponent />
														</motion.div>
													: <E404 />}
											</Fragment>
										}
									/>
									<Route
										path="/my-class"
										exact
										element={
											<Fragment>
												{user_data_login
													? <motion.div
															transition={
																transitionStyles
															}
															className="chi_don_gian_la_animation_element._."
															initial="out"
															animate="in"
															exit="out"
															variants={
																transitionRouter
															}>
															<ClassComponent />
														</motion.div>
													: <E404 />}
											</Fragment>
										}
									/>
									<Route
										path="/exam/*"
										exact
										element={
											<Fragment>
												{user_data_login
													? <motion.div
															transition={
																transitionStyles
															}
															className="chi_don_gian_la_animation_element._."
															initial="out"
															animate="in"
															exit="out"
															variants={
																transitionRouter
															}>
															<MainScreenExam />
														</motion.div>
													: <E404 />}
											</Fragment>
										}
									/>
									<Route path="*" exact element={<E404 />} />
								</Routes>
							</AnimatePresence>
						</BrowserRouter>
						<FooterComponent heightReturn={_h_} />
					</Fragment>
				: <LoadingScreen />}
		</BODY>
	);
}

const BODY = styled.div`
	padding-top: 4vh;
	background: ${props => props.background || "#fff"};
	width: 100%;
	min-height: 92vh;
	display: grid;
	align-items: baseline;
	grid-template-rows: 1fr auto;
`;

export default React.memo(MainComponent);
